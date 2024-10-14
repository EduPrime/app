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
        school_zone,
        phone,
        email,
        website,
        social_network,
        institution_id,
        active,
        abbreviation,
        logourl,
        created_at,
        updated_at,
        deleted_at
    )
VALUES
    (
        gen_random_uuid(),
        'Escola Fundamental Alfa',
        'Avenida Secundária, 456',
        'Cidade Alfa',
        'PE',
        '12345-678',
        'Rural', -- Exemplo de valor para school_zone
        '(11) 8765-4321',
        'contato@escolafundamentalalfa.edu.br', -- Exemplo de e-mail
        'http://escolafundamentalalfa.edu.br', -- Exemplo de website
        'https://www.facebook.com/escolafundamentalalfa', -- Exemplo de rede social
        (
            SELECT
                id
            FROM
                institution
            WHERE
                name = 'Instituição Educacional Alfa'
        ),
        true, -- Ativo
        'EFA', -- Abreviação
        'http://escolafundamentalalfa.edu.br/logo.png', -- URL do logo
        NOW(),
        NOW(), -- Atualizado na inserção
        NULL -- Não excluído
    ),
    (
        gen_random_uuid(),
        'Colégio Beta',
        'Rua Terciária, 789',
        'Cidade Beta',
        'RJ',
        '98765-432',
        'Urbana', -- Exemplo de valor para school_zone
        '(21) 2345-6789',
        'contato@colegiobeta.edu.br', -- Exemplo de e-mail
        'http://colegiobeta.edu.br', -- Exemplo de website
        'https://www.instagram.com/colegiobeta', -- Exemplo de rede social
        (
            SELECT
                id
            FROM
                institution
            WHERE
                name = 'Instituição Educacional Alfa'
        ),
        true, -- Ativo
        'CB', -- Abreviação
        'http://colegiobeta.edu.br/logo.png', -- URL do logo
        NOW(),
        NOW(), -- Atualizado na inserção
        NULL -- Não excluído
    );

-- Inserção de Cursos
INSERT INTO
    course (id, name, school_id, status, created_at)
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
        'Ativo',
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
        'Ativo',
        NOW ()
    );

-- Inserção de Séries
INSERT INTO
    series (id, school_id, course_id, institution_id, timetable_id, name, course_stage, graduate, workload, school_days, metadata, user_created, created_at)
VALUES
    (
        gen_random_uuid(),
        (
            SELECT id 
            FROM school 
            WHERE name = 'Escola Fundamental Alfa'  -- Nome atualizado da escola
        ),
        (
            SELECT id 
            FROM course 
            WHERE name = 'Ensino Fundamental I'
        ),
        (
            SELECT id 
            FROM institution 
            WHERE name = 'Instituição Educacional Alfa'
        ),
        NULL,  -- Supondo que você não tenha um timetable_id a ser referenciado, caso contrário, substitua por um UUID correspondente.
        '1º Ano',
        'Etapa 1',  -- Altere de acordo com o seu enum `course_stage_type`
        'Sim',  -- Ou 'NÃO', dependendo do status de graduação
        '40',  -- Substitua pelo valor correto da carga horária
        'Sexta',  -- Substitua pelos dias da escola
        '{}'::JSONB,  -- Pode incluir um objeto JSON se necessário
        auth.uid(),  -- Se você tem uma função de autenticação configurada que retorna o ID do usuário
        NOW()
    ),
    (
        gen_random_uuid(),
        (
            SELECT id 
            FROM school 
            WHERE name = 'Colégio Beta'  -- Nome atualizado da escola
        ),
        (
            SELECT id 
            FROM course 
            WHERE name = 'Ensino Médio'
        ),
        (
            SELECT id 
            FROM institution 
            WHERE name = 'Instituição Educacional Alfa'
        ),
        NULL,  -- Novamente, se você não tiver um timetable_id
        '2º Ano',
        'Etapa 2',  -- Altere de acordo com o seu enum `course_stage_type`
        'Sim',  -- Ou 'NÃO', dependendo do status de graduação
        '40',  -- Substitua pelo valor correto da carga horária
        'Segunda',  -- Substitua pelos dias da escola
        '{}'::JSONB,  -- Pode incluir um objeto JSON se necessário
        auth.uid(),  -- Se você tem uma função de autenticação configurada
        NOW()
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
    qualifications, 
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
        '[
            {"start": "2015-03-01", "end": "2017-12-15", "course": "Mestrado em Educação Inovadora", "institution": "Universidade Nova Esperança"},
            {"start": "2012-01-10", "end": "2014-12-10", "course": "Licenciatura em Matemática", "institution": "Faculdade de Ciências Exatas"}
        ]',
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
        '[
            {"start": "2000-09-01", "end": "2004-06-15", "course": "Doutorado em Literatura Brasileira", "institution": "Universidade dos Escritores"},
            {"start": "1995-02-20", "end": "1999-11-20", "course": "Licenciatura em Letras", "institution": "Instituto Superior de Letras"}
        ]',
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
        '[
            {"start": "2018-09-03", "end": "2022-09-03", "course": "Licenciatura em História", "institution": "Universidade de História e Cultura"},
            {"start": "2015-01-05", "end": "2017-12-15", "course": "Curso de Especialização em Ensino de Geografia", "institution": "Faculdade do Saber"}
        ]',
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
        '[
            {"start": "2010-08-01", "end": "2013-05-30", "course": "Mestrado em Ciências Biológicas", "institution": "Instituto de Pesquisa Biológica"},
            {"start": "2007-03-20", "end": "2009-12-20", "course": "Bacharelado em Biologia", "institution": "Universidade da Vida"}
        ]',
        (
            SELECT id
            FROM school
            WHERE name = 'Colégio Beta'
        ),
        NOW()
    );

-- Inserção de Turmas (com novos campos)
-- Adicionando corretamente as turmas
INSERT INTO classroom (
    id,
    school_id,
    series_id,
    institution_id,
    course_id,
    teacher_id,
    maxStudents,
    startTime,
    startTimeInterval,
    endTimeInterval,
    endTime,
    day_of_week,
    name,
    period,
    year,
    metadata,
    created_at
) VALUES
(
    gen_random_uuid(),
    (
        SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'
    ),
    (
        SELECT id FROM series WHERE name = '1º Ano'
    ),
    (
        SELECT id FROM institution WHERE name = 'Instituição Educacional Alfa'
    ),
    (
        SELECT id FROM course WHERE name = 'Ensino Fundamental I'
    ),
    (
        SELECT id FROM teacher WHERE name = 'Prof. João Pereira'
    ),
    30, -- Exemplo de número máximo de alunos
    '08:00:00', -- Hora de início
    '08:10:00', -- Intervalo de hora de início
    '11:50:00', -- Intervalo de hora de término
    '12:00:00', -- Hora de término
    'Segunda', -- Dia da semana
    'Turma A',
    'Manhã',
    2024, -- Ano
    '{}'::JSONB, -- Metadados
    NOW()
),
(
    gen_random_uuid(),
    (
        SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'
    ),
    (
        SELECT id FROM series WHERE name = '2º Ano'
    ),
    (
        SELECT id FROM institution WHERE name = 'Instituição Educacional Alfa'
    ),
    (
        SELECT id FROM course WHERE name = 'Ensino Fundamental I'
    ),
    (
        SELECT id FROM teacher WHERE name = 'Prof. João Pereira'
    ),
    30,
    '08:00:00',
    '08:10:00',
    '11:50:00',
    '12:00:00',
    'Terça',
    'Turma B',
    'Manhã',
    2024,
    '{}'::JSONB,
    NOW()
),
(
    gen_random_uuid(),
    (
        SELECT id FROM school WHERE name = 'Colégio Beta'
    ),
    (
        SELECT id FROM series WHERE name = '2º Ano'
    ),
    (
        SELECT id FROM institution WHERE name = 'Instituição Educacional Alfa'
    ),
    (
        SELECT id FROM course WHERE name = 'Ensino Médio'
    ),
    (
        SELECT id FROM teacher WHERE name = 'Prof. Paulo Santos'
    ),
    30,
    '08:00:00',
    '08:10:00',
    '11:50:00',
    '12:00:00',
    'Quarta',
    'Turma C',
    'Tarde',
    2024,
    '{}'::JSONB,
    NOW()
);

-- Inserção de Estudantes
-- Adicionando corretamente os estudantes
INSERT INTO student (
    id,
    school_id,
    classroom_id,
    name,
    birthdate,
    gender,
    place_of_birth,
    postalcode,
    residence_zone,
    number_address,
    cpf,
    neighborhood,
    city,
    complement,
    father_name,
    father_email,
    father_cpf,
    father_phone,
    mother_name,
    mother_email,
    mother_cpf,
    mother_phone,
    rg_number,
    rg_state,
    rg_issue_date,
    rg_issuer,
    new_birth_cert_number,
    old_birth_cert_term,
    old_birth_cert_book,
    old_birth_cert_sheet,
    docsType,
    old_birth_cert_date_issue,
    old_birth_cert_state,
    responsibleType,
    series_id,
    email,
    phone,
    address,
    status,
    photo,
    metadata,
    user_created,
    created_at,
    updated_at
) VALUES
    (
        gen_random_uuid(),
        (
            SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'
        ),
        (
            SELECT id FROM classroom WHERE name = 'Turma A'
        ),
        'Ana Silva',
        '2005-03-10',
        'Feminino',
        'São Paulo',
        '01000-000',
        'Urbana',
        '123',
        '12345678901',
        'Centro',
        'São Paulo',
        '',
        'Carlos Silva',
        'carlos.silva@example.com',
        '12345678900',
        '(11) 91234-5678',
        'Maria Silva',
        'maria.silva@example.com',
        '09876543210',
        '(11) 98765-4321',
        NULL,           -- rg_number
        NULL,           -- rg_state
        NULL,           -- rg_issue_date
        NULL,           -- rg_issuer
        NULL,           -- new_birth_cert_number
        NULL,           -- old_birth_cert_term
        NULL,           -- old_birth_cert_book
        NULL,           -- old_birth_cert_sheet
        NULL,           -- docsType
        NULL,           -- old_birth_cert_date_issue
        NULL,           -- old_birth_cert_state
        'Pai',
        (
            SELECT id FROM series WHERE name = '1º Ano'
        ),
        'ana.silva@example.com',
        '(11) 99876-5432',
        'Rua Exemplo, 123',
        'Ativo',
        NULL,
        '{}'::JSONB,
        auth.uid(),
        NOW(),
        NOW()
    ),
    (
        gen_random_uuid(),
        (
            SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'
        ),
        (
            SELECT id FROM classroom WHERE name = 'Turma B'
        ),
        'Bruno Souza',
        '2004-07-22',
        'Masculino',
        'Rio de Janeiro',
        '02000-000',
        'Urbana',
        '456',
        '23456789012',
        'Botafogo',
        'Rio de Janeiro',
        '',
        'Ricardo Souza',
        'ricardo.souza@example.com',
        '23456789001',
        '(21) 91234-5678',
        'Laura Souza',
        'laura.souza@example.com',
        '34567890123',
        '(21) 98765-4321',
        NULL,           -- rg_number
        NULL,           -- rg_state
        NULL,           -- rg_issue_date
        NULL,           -- rg_issuer
        NULL,           -- new_birth_cert_number
        NULL,           -- old_birth_cert_term
        NULL,           -- old_birth_cert_book
        NULL,           -- old_birth_cert_sheet
        NULL,           -- docsType
        NULL,           -- old_birth_cert_date_issue
        NULL,           -- old_birth_cert_state
        'Pai',
        (
            SELECT id FROM series WHERE name = '2º Ano'
        ),
        'bruno.souza@example.com',
        '(21) 99876-5432',
        'Avenida Exemplo, 456',
        'Ativo',
        NULL,
        '{}'::JSONB,
        auth.uid(),
        NOW(),
        NOW()
    );


-- Inserção de Disciplinas (com correção de school_id)
INSERT INTO
    discipline (id, name, teacher_id, school_id, created_at)
VALUES
    (
        gen_random_uuid(),
        'Matemática',
        (
            SELECT id FROM teacher WHERE name = 'Prof. João Pereira'
        ),
        (
            SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'
        ),
        NOW()
    ),
    (
        gen_random_uuid(),
        'Ciências',
        (
            SELECT id FROM teacher WHERE name = 'Profª. Maria Fernandes'
        ),
        (
            SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'
        ),
        NOW()
    ),
    (
        gen_random_uuid(),
        'História',
        (
            SELECT id FROM teacher WHERE name = 'Prof. Paulo Santos'
        ),
        (
            SELECT id FROM school WHERE name = 'Colégio Beta'
        ),
        NOW()
    ),
    (
        gen_random_uuid(),
        'Geografia',
        (
            SELECT id FROM teacher WHERE name = 'Profª. Rita Oliveira'
        ),
        (
            SELECT id FROM school WHERE name = 'Colégio Beta'
        ),
        NOW()
    );


-- Inserção de Horários (com correção para school_id)
INSERT INTO
    timetable (id, name, classroom_id, school_id, created_at)
VALUES
    (
        gen_random_uuid(),
        'Horário da Turma A',
        (
            SELECT id FROM classroom WHERE name = 'Turma A'
        ),
        (
            SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'
        ),
        NOW()
    ),
    (
        gen_random_uuid(),
        'Horário da Turma B',
        (
            SELECT id FROM classroom WHERE name = 'Turma B'
        ),
        (
            SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'
        ),
        NOW()
    ),
    (
        gen_random_uuid(),
        'Horário da Turma C',
        (
            SELECT id FROM classroom WHERE name = 'Turma C'
        ),
        (
            SELECT id FROM school WHERE name = 'Colégio Beta'
        ),
        NOW()
    );


-- Inserção de Sessões de Aula (com correção para school_id)
INSERT INTO
    class_session (
        id,
        school_id,  -- Adicionando o campo school_id
        timetable_id,
        discipline_id,
        day_of_week,
        start_time,
        end_time,
        created_at
    )
VALUES
    (
        gen_random_uuid(),
        (
            SELECT school_id 
            FROM timetable 
            WHERE name = 'Horário da Turma A'
        ), -- Pegando o school_id da tabela timetable
        (
            SELECT id
            FROM timetable
            WHERE name = 'Horário da Turma A'
        ),
        (
            SELECT id
            FROM discipline
            WHERE name = 'Matemática'
        ),
        'Segunda',
        '08:00',
        '09:00',
        NOW()
    ),
    (
        gen_random_uuid(),
        (
            SELECT school_id 
            FROM timetable 
            WHERE name = 'Horário da Turma A'
        ),
        (
            SELECT id
            FROM timetable
            WHERE name = 'Horário da Turma A'
        ),
        (
            SELECT id
            FROM discipline
            WHERE name = 'Ciências'
        ),
        'Terça',
        '09:00',
        '10:00',
        NOW()
    ),
    (
        gen_random_uuid(),
        (
            SELECT school_id 
            FROM timetable 
            WHERE name = 'Horário da Turma B'
        ),
        (
            SELECT id
            FROM timetable
            WHERE name = 'Horário da Turma B'
        ),
        (
            SELECT id
            FROM discipline
            WHERE name = 'Matemática'
        ),
        'Quarta',
        '08:00',
        '09:00',
        NOW()
    ),
    (
        gen_random_uuid(),
        (
            SELECT school_id 
            FROM timetable 
            WHERE name = 'Horário da Turma B'
        ),
        (
            SELECT id
            FROM timetable
            WHERE name = 'Horário da Turma B'
        ),
        (
            SELECT id
            FROM discipline
            WHERE name = 'Ciências'
        ),
        'Quinta',
        '09:00',
        '10:00',
        NOW()
    ),
    (
        gen_random_uuid(),
        (
            SELECT school_id 
            FROM timetable 
            WHERE name = 'Horário da Turma C'
        ),
        (
            SELECT id
            FROM timetable
            WHERE name = 'Horário da Turma C'
        ),
        (
            SELECT id
            FROM discipline
            WHERE name = 'História'
        ),
        'Sexta',
        '10:00',
        '11:00',
        NOW()
    ),
    (
        gen_random_uuid(),
        (
            SELECT school_id 
            FROM timetable 
            WHERE name = 'Horário da Turma C'
        ),
        (
            SELECT id
            FROM timetable
            WHERE name = 'Horário da Turma C'
        ),
        (
            SELECT id
            FROM discipline
            WHERE name = 'Geografia'
        ),
        'Sábado',
        '11:00',
        '12:00',
        NOW()
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

-- Inserção de papéis (roles) com school_id dinâmico
INSERT INTO public.role (id, school_id, name)
VALUES 
(
    '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'Professor'
),
(
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'Gestor'
);


-- Inserção de user_roles com school_id correto
INSERT INTO public.user_role (school_id, role_id, user_id)
VALUES 
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid, -- ID do role Professor
    '2ff53f52-cdd9-4b04-80c4-02d146b653e7'::uuid  -- ID do usuário professor
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid, -- ID do role Gestor
    '905096b1-ad84-46c2-a309-29a0501470f7'::uuid  -- ID do usuário gestor
);


-- Inserção de permissões para Professor com school_id dinâmico
INSERT INTO public.role_permission (school_id, role_id, can_select, can_insert, can_update, can_delete, "table")
VALUES 
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,  -- ID do role Professor
    true, false, false, false, 'student'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
    true, true, true, false, 'attendance'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
    true, true, true, false, 'grade'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
    true, false, false, false, 'classroom'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
    true, false, false, false, 'discipline'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
    true, false, false, false, 'class_session'
);

-- Inserção de permissões para Gestor com school_id dinâmico
INSERT INTO public.role_permission (school_id, role_id, can_select, can_insert, can_update, can_delete, "table")
VALUES 
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,  -- ID do role Gestor
    true, true, true, true, 'student'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    true, true, true, true, 'teacher'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    true, true, true, true, 'classroom'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    true, true, true, true, 'discipline'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    true, true, true, true, 'course'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    true, true, true, true, 'series'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    true, true, true, true, 'timetable'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    true, true, true, true, 'class_session'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    true, true, true, true, 'attendance'
),
(
    (SELECT id FROM school WHERE name = 'Escola Fundamental Alfa'),
    'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
    true, true, true, true, 'grade'
);


----- Criar manual, usuário migration sem permissão, substituir ids na user_roles
-- 2ff - professor
-- 905 - gestor
-- gestor@eduprime.com
-- profesor@eduprime.com
-- Seed para inserir feriados usando o ano vigente
DO $$
DECLARE
    current_year INTEGER := EXTRACT(YEAR FROM CURRENT_DATE);
BEGIN
    INSERT INTO holidays (name, holiday_date, description)
    VALUES
        ('Ano Novo', TO_DATE(current_year || '-01-01', 'YYYY-MM-DD'), 'Comemoração do início do novo ano'),
        ('Carnaval', TO_DATE(current_year || '-02-13', 'YYYY-MM-DD'), 'Dia de Carnaval'),
        ('Paixão de Cristo', TO_DATE(current_year || '-03-29', 'YYYY-MM-DD'), 'Sexta-feira Santa'),
        ('Tiradentes', TO_DATE(current_year || '-04-21', 'YYYY-MM-DD'), 'Comemoração em memória de Tiradentes'),
        ('Dia do Trabalhador', TO_DATE(current_year || '-05-01', 'YYYY-MM-DD'), 'Dia do Trabalho'),
        ('Corpus Christi', TO_DATE(current_year || '-05-30', 'YYYY-MM-DD'), 'Dia de Corpus Christi'),
        ('Independência do Brasil', TO_DATE(current_year || '-09-07', 'YYYY-MM-DD'), 'Comemoração da Independência do Brasil'),
        ('Nossa Senhora Aparecida', TO_DATE(current_year || '-10-12', 'YYYY-MM-DD'), 'Dia de Nossa Senhora Aparecida, padroeira do Brasil'),
        ('Finados', TO_DATE(current_year || '-11-02', 'YYYY-MM-DD'), 'Dia de Finados'),
        ('Proclamação da República', TO_DATE(current_year || '-11-15', 'YYYY-MM-DD'), 'Comemoração da Proclamação da República do Brasil'),
        ('Natal', TO_DATE(current_year || '-12-25', 'YYYY-MM-DD'), 'Comemoração do Natal');
END $$;
-- Inserção de um Template de Ano Letivo com 4 etapas usando o ano atual
DO $$
DECLARE
    current_year INTEGER := EXTRACT(YEAR FROM CURRENT_DATE);
    teaching_days_stage1 INTEGER;
    teaching_days_stage2 INTEGER;
    teaching_days_stage3 INTEGER;
    teaching_days_stage4 INTEGER;
BEGIN
    -- Calcular os dias úteis para cada etapa
    teaching_days_stage1 := calculate_business_days((current_year || '-02-01')::DATE, (current_year || '-04-30')::DATE);
    teaching_days_stage2 := calculate_business_days((current_year || '-05-01')::DATE, (current_year || '-07-15')::DATE);
    teaching_days_stage3 := calculate_business_days((current_year || '-07-16')::DATE, (current_year || '-09-30')::DATE);
    teaching_days_stage4 := calculate_business_days((current_year || '-10-01')::DATE, (current_year || '-12-20')::DATE);

    -- Inserir o template de ano letivo
    INSERT INTO academic_year_template (id, ref_year, name, stages, created_at)
    VALUES (
        gen_random_uuid(),
        current_year,
        'Modelo Padrão Quatro Etapas',
        jsonb_build_array(
            jsonb_build_object('stageNumber', 1, 'startDate', (current_year || '-02-01')::DATE, 'endDate', (current_year || '-04-30')::DATE, 'teachingDays', teaching_days_stage1),
            jsonb_build_object('stageNumber', 2, 'startDate', (current_year || '-05-01')::DATE, 'endDate', (current_year || '-07-15')::DATE, 'teachingDays', teaching_days_stage2),
            jsonb_build_object('stageNumber', 3, 'startDate', (current_year || '-07-16')::DATE, 'endDate', (current_year || '-09-30')::DATE, 'teachingDays', teaching_days_stage3),
            jsonb_build_object('stageNumber', 4, 'startDate', (current_year || '-10-01')::DATE, 'endDate', (current_year || '-12-20')::DATE, 'teachingDays', teaching_days_stage4)
        ),
        NOW()
    );
END $$;
-- Inserção de Ano Letivo para todas as escolas usando o template criado
DO $$
DECLARE
    current_year INTEGER := EXTRACT(YEAR FROM CURRENT_DATE);
    template_id UUID;
BEGIN
    -- Seleciona o ID do template atual para o ano vigente
    SELECT id INTO template_id
    FROM academic_year_template
    WHERE ref_year = current_year AND name = 'Modelo Padrão Quatro Etapas';

    -- Verifica se o template foi encontrado
    IF template_id IS NOT NULL THEN
        -- Inserção de ano letivo para cada escola usando o template selecionado
        INSERT INTO academic_year (id, school_id, template_id, ref_year, created_at)
        SELECT 
            gen_random_uuid(),
            s.id, 
            template_id, 
            current_year, 
            NOW()
        FROM school s;
    ELSE
        RAISE NOTICE 'Nenhum template de ano letivo encontrado para o ano atual.';
    END IF;
END $$;
