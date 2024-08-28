-- Inserção de Instituições
INSERT INTO
    institution (
        id,
        name,
        email,
        address,
        city,
        state,
        postalcode,
        phone,
        created_at
    )
VALUES
    (
        gen_random_uuid (),
        'Instituição Educacional Alfa',
        'alpha@eduprime.chat',
        'Rua Principal, 123',
        'Cidade Alfa',
        'PE',
        '12345-678',
        '(11) 1234-5678',
        NOW ()
    );

-- Inserção de Escolas
INSERT INTO
    school (
        id,
        name,
        address,
        city,
        state,
        postalcode,
        phone,
        institution_id,
        created_at
    )
VALUES
    (
        gen_random_uuid (),
        'Escola Fundamental Alfa',
        'Avenida Secundária, 456',
        'Cidade Alfa',
        'PE',
        '12345-678',
        '(11) 8765-4321',
        (
            SELECT
                id
            FROM
                institution
            WHERE
                name = 'Instituição Educacional Alfa'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Colégio Beta',
        'Rua Terciária, 789',
        'Cidade Beta',
        'RJ',
        '98765-432',
        '(21) 2345-6789',
        (
            SELECT
                id
            FROM
                institution
            WHERE
                name = 'Instituição Educacional Alfa'
        ),
        NOW ()
    );

-- Inserção de Cursos
INSERT INTO
    course (id, name, school_id, created_at)
VALUES
    (
        gen_random_uuid (),
        'Ensino Fundamental I',
        (
            SELECT
                id
            FROM
                school
            WHERE
                name = 'Escola Fundamental Alfa'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Ensino Médio',
        (
            SELECT
                id
            FROM
                school
            WHERE
                name = 'Colégio Beta'
        ),
        NOW ()
    );

-- Inserção de Séries
INSERT INTO
    series (id, name, course_id, created_at)
VALUES
    (
        gen_random_uuid (),
        '1º Ano',
        (
            SELECT
                id
            FROM
                course
            WHERE
                name = 'Ensino Fundamental I'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        '2º Ano',
        (
            SELECT
                id
            FROM
                course
            WHERE
                name = 'Ensino Médio'
        ),
        NOW ()
    );

-- Inserção de Turmas
INSERT INTO
    classroom (id, name, period, series_id, created_at)
VALUES
    (
        gen_random_uuid (),
        'Turma A',
        'MORNING',
        (
            SELECT
                id
            FROM
                series
            WHERE
                name = '1º Ano'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Turma B',
        'AFTERNOON',
        (
            SELECT
                id
            FROM
                series
            WHERE
                name = '1º Ano'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Turma C',
        'EVENING',
        (
            SELECT
                id
            FROM
                series
            WHERE
                name = '2º Ano'
        ),
        NOW ()
    );

-- Inserção de Estudantes
-- Inserção de Estudantes
INSERT INTO
    student (
        id,
        name,
        email,
        classroom_id,
        birthdate,
        created_at
    )
VALUES
    (
        gen_random_uuid (),
        'Ana Silva',
        'ana.silva@example.com',
        (
            SELECT
                id
            FROM
                classroom
            WHERE
                name = 'Turma A'
        ),
        '2005-03-10',
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Bruno Souza',
        'bruno.souza@example.com',
        (
            SELECT
                id
            FROM
                classroom
            WHERE
                name = 'Turma A'
        ),
        '2004-07-22',
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Carla Mendes',
        'carla.mendes@example.com',
        (
            SELECT
                id
            FROM
                classroom
            WHERE
                name = 'Turma B'
        ),
        '2006-01-15',
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Daniel Oliveira',
        'daniel.oliveira@example.com',
        (
            SELECT
                id
            FROM
                classroom
            WHERE
                name = 'Turma B'
        ),
        '2003-05-30',
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Elaine Costa',
        'elaine.costa@example.com',
        (
            SELECT
                id
            FROM
                classroom
            WHERE
                name = 'Turma C'
        ),
        '2002-11-09',
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Felipe Lima',
        'felipe.lima@example.com',
        (
            SELECT
                id
            FROM
                classroom
            WHERE
                name = 'Turma C'
        ),
        '2001-02-28',
        NOW ()
    );

-- Inserção de Professores
-- Inserção de Professores com novos campos
INSERT INTO teacher (
    id, 
    name, 
    birthdate, 
    email, 
    phone, 
    address, 
    specializations, 
    school_id, 
    created_at
)
VALUES
    (
        gen_random_uuid(),
        'Prof. João Pereira',
        '1980-03-15',
        'joao.pereira@example.com',
        '1234567890',
        'Rua das Flores, 123, Bairro Central',
        '{"subjects": ["Matemática", "Física"], "degree": "Mestrado em Educação"}',
        (
            SELECT id
            FROM school
            WHERE name = 'Escola Fundamental Alfa'
        ),
        NOW()
    ),
    (
        gen_random_uuid(),
        'Profª. Maria Fernandes',
        '1975-07-22',
        'maria.fernandes@example.com',
        '0987654321',
        'Avenida dos Professores, 456, Bairro Novo',
        '{"subjects": ["Português", "Literatura"], "degree": "Doutorado em Letras"}',
        (
            SELECT id
            FROM school
            WHERE name = 'Escola Fundamental Alfa'
        ),
        NOW()
    ),
    (
        gen_random_uuid(),
        'Prof. Paulo Santos',
        '1990-11-30',
        'paulo.santos@example.com',
        '1122334455',
        'Praça da Liberdade, 789, Centro',
        '{"subjects": ["História", "Geografia"], "degree": "Licenciatura em História"}',
        (
            SELECT id
            FROM school
            WHERE name = 'Colégio Beta'
        ),
        NOW()
    ),
    (
        gen_random_uuid(),
        'Profª. Rita Oliveira',
        '1982-05-12',
        'rita.oliveira@example.com',
        '5566778899',
        'Estrada Velha, 1010, Bairro Antigo',
        '{"subjects": ["Ciências", "Biologia"], "degree": "Mestrado em Ciências Biológicas"}',
        (
            SELECT id
            FROM school
            WHERE name = 'Colégio Beta'
        ),
        NOW()
    );

-- Inserção de Disciplinas
INSERT INTO
    discipline (id, name, teacher_id, created_at)
VALUES
    (
        gen_random_uuid (),
        'Matemática',
        (
            SELECT
                id
            FROM
                teacher
            WHERE
                name = 'Prof. João Pereira'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Ciências',
        (
            SELECT
                id
            FROM
                teacher
            WHERE
                name = 'Profª. Maria Fernandes'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'História',
        (
            SELECT
                id
            FROM
                teacher
            WHERE
                name = 'Prof. Paulo Santos'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Geografia',
        (
            SELECT
                id
            FROM
                teacher
            WHERE
                name = 'Profª. Rita Oliveira'
        ),
        NOW ()
    );

-- Inserção de Horários
INSERT INTO
    timetable (id, name, classroom_id, created_at)
VALUES
    (
        gen_random_uuid (),
        'Horário da Turma A',
        (
            SELECT
                id
            FROM
                classroom
            WHERE
                name = 'Turma A'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Horário da Turma B',
        (
            SELECT
                id
            FROM
                classroom
            WHERE
                name = 'Turma B'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'Horário da Turma C',
        (
            SELECT
                id
            FROM
                classroom
            WHERE
                name = 'Turma C'
        ),
        NOW ()
    );

-- Inserção de Sessões de Aula
INSERT INTO
    class_session (
        id,
        day_of_week,
        start_time,
        end_time,
        discipline_id,
        timetable_id,
        created_at
    )
VALUES
    (
        gen_random_uuid (),
        'MONDAY',
        '08:00',
        '09:00',
        (
            SELECT
                id
            FROM
                discipline
            WHERE
                name = 'Matemática'
        ),
        (
            SELECT
                id
            FROM
                timetable
            WHERE
                name = 'Horário da Turma A'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'TUESDAY',
        '09:00',
        '10:00',
        (
            SELECT
                id
            FROM
                discipline
            WHERE
                name = 'Ciências'
        ),
        (
            SELECT
                id
            FROM
                timetable
            WHERE
                name = 'Horário da Turma A'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'WEDNESDAY',
        '08:00',
        '09:00',
        (
            SELECT
                id
            FROM
                discipline
            WHERE
                name = 'Matemática'
        ),
        (
            SELECT
                id
            FROM
                timetable
            WHERE
                name = 'Horário da Turma B'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'THURSDAY',
        '09:00',
        '10:00',
        (
            SELECT
                id
            FROM
                discipline
            WHERE
                name = 'Ciências'
        ),
        (
            SELECT
                id
            FROM
                timetable
            WHERE
                name = 'Horário da Turma B'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'MONDAY',
        '10:00',
        '11:00',
        (
            SELECT
                id
            FROM
                discipline
            WHERE
                name = 'História'
        ),
        (
            SELECT
                id
            FROM
                timetable
            WHERE
                name = 'Horário da Turma C'
        ),
        NOW ()
    ),
    (
        gen_random_uuid (),
        'TUESDAY',
        '11:00',
        '12:00',
        (
            SELECT
                id
            FROM
                discipline
            WHERE
                name = 'Geografia'
        ),
        (
            SELECT
                id
            FROM
                timetable
            WHERE
                name = 'Horário da Turma C'
        ),
        NOW ()
    );

-- Inserção de Horários de Escola
-- Inserção de Horários de Escola
INSERT INTO
    timetable_school (timetable_id, school_id, created_at)
VALUES
    (
        (
            SELECT
                id
            FROM
                timetable
            WHERE
                name = 'Horário da Turma A'
        ),
        (
            SELECT
                id
            FROM
                school
            WHERE
                name = 'Escola Fundamental Alfa'
        ),
        NOW ()
    ),
    (
        (
            SELECT
                id
            FROM
                timetable
            WHERE
                name = 'Horário da Turma B'
        ),
        (
            SELECT
                id
            FROM
                school
            WHERE
                name = 'Escola Fundamental Alfa'
        ),
        NOW ()
    ),
    (
        (
            SELECT
                id
            FROM
                timetable
            WHERE
                name = 'Horário da Turma C'
        ),
        (
            SELECT
                id
            FROM
                school
            WHERE
                name = 'Colégio Beta'
        ),
        NOW ()
    );