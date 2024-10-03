ALTER TABLE teacher
ADD COLUMN telegram_id BIGINT;

CREATE OR REPLACE FUNCTION check_class_schedule(input_time TIME, id_professor UUID)
RETURNS TEXT AS $$
DECLARE
    current_day day_of_week;
    time_start TIME;
    time_end TIME;
    id_discipline UUID;
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
        RETURN 'pré-aula';  -- Retornar 'pré-aula' se nenhum professor correspondente for encontrado
    END IF;

    -- Selecionar o horário de início e fim da disciplina no dia atual
    SELECT start_time, end_time
    INTO time_start, time_end
    FROM class_session
    WHERE discipline_id = id_discipline
      AND day_of_week = current_day;  -- Certificar que o valor na tabela também está em maiúsculas

    -- Se encontrou a disciplina no dia atual
    IF FOUND THEN
        -- Verificar se o horário está no intervalo da aula
        IF input_time >= time_start AND input_time <= time_end THEN
            RETURN 'em aula';
        -- Verificar se o horário é após o término da aula
        ELSIF input_time > time_end THEN
            RETURN 'pós-aula';
        ELSE
            -- Horário antes da aula
            RETURN 'pré-aula';
        END IF;
    ELSE
        -- Caso o dia da semana não corresponda
        RETURN 'pré-aula';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_classrooms_by_professor(professor_id UUID)
RETURNS TABLE(sala_nome VARCHAR(100)) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT classroom.name
    FROM discipline
    JOIN class_session ON class_session.discipline_id = discipline.id
    JOIN timetable ON class_session.timetable_id = timetable.id
    JOIN classroom ON timetable.classroom_id = classroom.id
    WHERE discipline.teacher_id = professor_id;
END;
$$ LANGUAGE plpgsql;
