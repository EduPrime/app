ALTER TABLE teacher
ADD COLUMN telegram_id BIGINT;

ALTER TABLE attendance
ADD COLUMN class_session_id UUID,
ADD COLUMN discipline_id UUID,
ADD CONSTRAINT fk_class_session
FOREIGN KEY (class_session_id) REFERENCES class_session(id)
ON DELETE CASCADE,
ADD CONSTRAINT fk_discipline
FOREIGN KEY (discipline_id) REFERENCES discipline(id)
ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION check_class_schedule(input_time TIME, id_professor UUID)
RETURNS TEXT[] AS $$
DECLARE
    current_day day_of_week;
    time_start TIME;
    time_end TIME;
    id_discipline UUID;
    classroom_name TEXT;
BEGIN
    -- Obter o dia da semana atual em letras maiúsculas
    current_day := UPPER(to_char(NOW(), 'FMDay'))::day_of_week; 

    -- Selecionar o id da disciplina correspondente ao professor
    SELECT id
    INTO id_discipline
    FROM discipline
    WHERE teacher_id = id_professor
    LIMIT 1;  -- Limitar a 1 para garantir que estamos pegando apenas um id

    -- Verificar se a disciplina foi encontrada
    IF NOT FOUND THEN
        RETURN ARRAY['pré-aula'];  -- Retornar 'pré-aula' se nenhum professor correspondente for encontrado
    END IF;

    -- Selecionar o horário de início e fim da disciplina no dia atual
    SELECT cs.start_time, cs.end_time, cr.name
    INTO time_start, time_end, classroom_name
    FROM class_session cs
    JOIN timetable t ON cs.timetable_id = t.id
    JOIN classroom cr ON t.classroom_id = cr.id
    WHERE cs.discipline_id = id_discipline
      AND cs.day_of_week = current_day;  -- Certificar que o valor na tabela também está em maiúsculas

    -- Se encontrou a disciplina no dia atual
    IF FOUND THEN
        -- Verificar se o horário está no intervalo da aula
        IF input_time >= time_start AND input_time <= time_end THEN
            RETURN ARRAY['em aula', classroom_name];  -- Retornar status 'em aula' e nome da sala
        -- Verificar se o horário é após o término da aula
        ELSIF input_time > time_end THEN
            RETURN ARRAY['pós-aula'];
        ELSE
            -- Horário antes da aula
            RETURN ARRAY['pré-aula'];
        END IF;
    ELSE
        -- Caso o dia da semana não corresponda
        RETURN ARRAY['pré-aula'];
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_classrooms_by_professor(professor_id UUID)
RETURNS TABLE(id_classroom UUID, sala_nome VARCHAR(100)) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT classroom.id, classroom.name
    FROM discipline
    JOIN class_session ON class_session.discipline_id = discipline.id
    JOIN timetable ON class_session.timetable_id = timetable.id
    JOIN classroom ON timetable.classroom_id = classroom.id
    WHERE discipline.teacher_id = professor_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_students_by_classroom(turma TEXT)
RETURNS TEXT[] AS $$
DECLARE
    class_id UUID;
    student_names TEXT[];
BEGIN
    -- Buscar o classroom_id baseado no nome da sala de aula
    SELECT id
    INTO class_id
    FROM classroom
    WHERE name = turma;

    -- Verificar se a sala de aula foi encontrada
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Sala de aula % não encontrada', turma;
    END IF;

    -- Buscar os nomes dos estudantes com o classroom_id correspondente
    SELECT ARRAY_AGG(s.name)
    INTO student_names
    FROM student s
    WHERE s.classroom_id = class_id;

    -- Retornar a lista de nomes de estudantes
    RETURN student_names;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION mark_attendance(student_names TEXT[], class_id UUID, id_discipline UUID)
RETURNS VOID AS $$
DECLARE
    session_id UUID;
BEGIN
    -- Obter o class_session_id baseado no class_id (classroom_id) e id_discipline
    SELECT cs.id
    INTO session_id
    FROM class_session cs
    JOIN timetable t ON cs.timetable_id = t.id
    WHERE t.classroom_id = class_id
    AND cs.discipline_id = id_discipline
    LIMIT 1;

    -- Verificar se o class_session_id foi encontrado
    IF session_id IS NULL THEN
        RAISE EXCEPTION 'Class session not found for class_id % and discipline_id %', class_id, id_discipline;
    END IF;

    -- Verifica se há registros de presença nos últimos 7 dias para essa turma
    IF EXISTS (
        SELECT 1
        FROM attendance a
        WHERE a.class_session_id = session_id
        AND a.date >= (CURRENT_TIMESTAMP - INTERVAL '7 days')
    ) THEN
        -- Se existirem, fazer update nos registros
        IF student_names IS NULL OR ARRAY_LENGTH(student_names, 1) = 0 THEN
            -- Atualiza todos os alunos para status PRESENT
            UPDATE attendance
            SET status = 'PRESENT'::attendance_status, date = CURRENT_TIMESTAMP
            WHERE class_session_id = session_id
            AND date >= (CURRENT_TIMESTAMP - INTERVAL '7 days');
        ELSE
            -- Atualiza os alunos da lista para status ABSENT
            UPDATE attendance
            SET status = 'ABSENT'::attendance_status, date = CURRENT_TIMESTAMP
            WHERE student_id IN (
                SELECT s.id
                FROM student s
                WHERE s.name = ANY(student_names)
                AND s.classroom_id = class_id
            )
            AND class_session_id = session_id
            AND date >= (CURRENT_TIMESTAMP - INTERVAL '7 days');
            
            -- Atualiza os outros alunos para status PRESENT
            UPDATE attendance
            SET status = 'PRESENT'::attendance_status, date = CURRENT_TIMESTAMP
            WHERE student_id NOT IN (
                SELECT s.id
                FROM student s
                WHERE s.name = ANY(student_names)
                AND s.classroom_id = class_id
            )
            AND class_session_id = session_id
            AND date >= (CURRENT_TIMESTAMP - INTERVAL '7 days');
        END IF;
    ELSE
        -- Se não houver registros nos últimos 7 dias, fazer insert
        IF student_names IS NULL OR ARRAY_LENGTH(student_names, 1) = 0 THEN
            -- Inserir todos os alunos da turma como PRESENT
            INSERT INTO attendance (school_id, student_id, status, discipline_id, class_session_id, date)
            SELECT s.school_id, s.id, 'PRESENT'::attendance_status, id_discipline, session_id, CURRENT_TIMESTAMP
            FROM student s
            WHERE s.classroom_id = class_id;
        ELSE
            -- Inserir presença para os alunos da lista com status ABSENT
            INSERT INTO attendance (school_id, student_id, status, discipline_id, class_session_id, date)
            SELECT s.school_id, s.id, 'ABSENT'::attendance_status, id_discipline, session_id, CURRENT_TIMESTAMP
            FROM student s
            WHERE s.name = ANY(student_names)
            AND s.classroom_id = class_id;

            -- Inserir presença para os outros alunos da classe com status PRESENT
            INSERT INTO attendance (school_id, student_id, status, discipline_id, class_session_id, date)
            SELECT s.school_id, s.id, 'PRESENT'::attendance_status, id_discipline, session_id, CURRENT_TIMESTAMP
            FROM student s
            WHERE s.name NOT IN (SELECT unnest(student_names))
            AND s.classroom_id = class_id;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;
