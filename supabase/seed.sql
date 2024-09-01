-- Inserção de Instituições
INSERT INTO institution (id,
                         name,
                         email,
                         address,
                         city,
                         state,
                         postalcode,
                         phone,
                         created_at)
VALUES ('6dbfbe8d-390e-4f7b-a041-b580cee27127'::uuid,
        'Instituição Educacional Alfa',
        'alpha@eduprime.chat',
        'Rua Principal, 123',
        'Cidade Alfa',
        'PE',
        '12345-678',
        '(11) 1234-5678',
        NOW());

-- Inserção de Escolas
INSERT INTO school (id,
                    name,
                    address,
                    city,
                    state,
                    postalcode,
                    phone,
                    institution_id,
                    created_at)
VALUES ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid,
        'Escola Fundamental Alfa',
        'Avenida Secundária, 456',
        'Cidade Alfa',
        'PE',
        '12345-678',
        '(11) 8765-4321',
        '6dbfbe8d-390e-4f7b-a041-b580cee27127'::uuid,
        NOW()),
       ('ac144f88-bbff-47a2-847f-3605957576c8'::uuid,
        'Colégio Beta',
        'Rua Terciária, 789',
        'Cidade Beta',
        'RJ',
        '98765-432',
        '(21) 2345-6789',
        '6dbfbe8d-390e-4f7b-a041-b580cee27127'::uuid,
        NOW());

-- Inserção de Cursos
INSERT INTO course (id, name, school_id, created_at)
VALUES (gen_random_uuid(),
        'Ensino Fundamental I',
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid,
        NOW()),
       (gen_random_uuid(),
        'Ensino Médio',
        'ac144f88-bbff-47a2-847f-3605957576c8'::uuid,
        NOW());

-- Inserção de Séries
INSERT INTO series (id, name, course_id, school_id)
VALUES (gen_random_uuid(),
        '1º Ano',
        (SELECT id
         FROM course
         WHERE name = 'Ensino Fundamental I'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        '2º Ano',
        (SELECT id
         FROM course
         WHERE name = 'Ensino Médio'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid);

-- Inserção de Turmas
INSERT INTO classroom (id, name, period, series_id, school_id)
VALUES (gen_random_uuid(),
        'Turma A',
        'MORNING',
        (SELECT id
         FROM series
         WHERE name = '1º Ano'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Turma B',
        'AFTERNOON',
        (SELECT id
         FROM series
         WHERE name = '1º Ano'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Turma C',
        'EVENING',
        (SELECT id
         FROM series
         WHERE name = '2º Ano'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid);

-- Inserção de Estudantes
INSERT INTO student (id,
                     name,
                     email,
                     classroom_id,
                     birthdate,
                     school_id)
VALUES (gen_random_uuid(),
        'Ana Silva',
        'ana.silva@example.com',
        (SELECT id
         FROM classroom
         WHERE name = 'Turma A'),
        '2005-03-10',
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Bruno Souza',
        'bruno.souza@example.com',
        (SELECT id
         FROM classroom
         WHERE name = 'Turma A'),
        '2004-07-22',
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Carla Mendes',
        'carla.mendes@example.com',
        (SELECT id
         FROM classroom
         WHERE name = 'Turma B'),
        '2006-01-15',
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Daniel Oliveira',
        'daniel.oliveira@example.com',
        (SELECT id
         FROM classroom
         WHERE name = 'Turma B'),
        '2003-05-30',
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Elaine Costa',
        'elaine.costa@example.com',
        (SELECT id
         FROM classroom
         WHERE name = 'Turma C'),
        '2002-11-09',
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Felipe Lima',
        'felipe.lima@example.com',
        (SELECT id
         FROM classroom
         WHERE name = 'Turma C'),
        '2001-02-28',
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid);

-- Inserção de Professores
INSERT INTO teacher (id, name, email, school_id, created_at)
VALUES (gen_random_uuid(),
        'Prof. João Pereira',
        'joao.pereira@example.com',
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid,
        NOW()),
       (gen_random_uuid(),
        'Profª. Maria Fernandes',
        'maria.fernandes@example.com',
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid,
        NOW()),
       (gen_random_uuid(),
        'Prof. Paulo Santos',
        'paulo.santos@example.com',
        'ac144f88-bbff-47a2-847f-3605957576c8'::uuid,
        NOW()),
       (gen_random_uuid(),
        'Profª. Rita Oliveira',
        'rita.oliveira@example.com',
        'ac144f88-bbff-47a2-847f-3605957576c8'::uuid,
        NOW());

-- Inserção de Disciplinas
INSERT INTO discipline (id, name, teacher_id, school_id)
VALUES (gen_random_uuid(),
        'Matemática',
        (SELECT id
         FROM teacher
         WHERE name = 'Prof. João Pereira'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Ciências',
        (SELECT id
         FROM teacher
         WHERE name = 'Profª. Maria Fernandes'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'História',
        (SELECT id
         FROM teacher
         WHERE name = 'Prof. Paulo Santos'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Geografia',
        (SELECT id
         FROM teacher
         WHERE name = 'Profª. Rita Oliveira'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid);

-- Inserção de Horários
INSERT INTO timetable (id, name, classroom_id, school_id)
VALUES (gen_random_uuid(),
        'Horário da Turma A',
        (SELECT id
         FROM classroom
         WHERE name = 'Turma A'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Horário da Turma B',
        (SELECT id
         FROM classroom
         WHERE name = 'Turma B'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'Horário da Turma C',
        (SELECT id
         FROM classroom
         WHERE name = 'Turma C'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid);

-- Inserção de Sessões de Aula
INSERT INTO class_session (id,
                           day_of_week,
                           start_time,
                           end_time,
                           discipline_id,
                           timetable_id,
                           school_id)
VALUES (gen_random_uuid(),
        'MONDAY',
        '08:00',
        '09:00',
        (SELECT id
         FROM discipline
         WHERE name = 'Matemática'),
        (SELECT id
         FROM timetable
         WHERE name = 'Horário da Turma A'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'TUESDAY',
        '09:00',
        '10:00',
        (SELECT id
         FROM discipline
         WHERE name = 'Ciências'),
        (SELECT id
         FROM timetable
         WHERE name = 'Horário da Turma A'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'WEDNESDAY',
        '08:00',
        '09:00',
        (SELECT id
         FROM discipline
         WHERE name = 'Matemática'),
        (SELECT id
         FROM timetable
         WHERE name = 'Horário da Turma B'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'THURSDAY',
        '09:00',
        '10:00',
        (SELECT id
         FROM discipline
         WHERE name = 'Ciências'),
        (SELECT id
         FROM timetable
         WHERE name = 'Horário da Turma B'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'MONDAY',
        '10:00',
        '11:00',
        (SELECT id
         FROM discipline
         WHERE name = 'História'),
        (SELECT id
         FROM timetable
         WHERE name = 'Horário da Turma C'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid),
       (gen_random_uuid(),
        'TUESDAY',
        '11:00',
        '12:00',
        (SELECT id
         FROM discipline
         WHERE name = 'Geografia'),
        (SELECT id
         FROM timetable
         WHERE name = 'Horário da Turma C'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid);

-- Inserção de Horários de Escola
-- Inserção de Horários de Escola
INSERT INTO timetable_school (timetable_id, school_id, created_at)
VALUES ((SELECT id
         FROM timetable
         WHERE name = 'Horário da Turma A'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid,
        NOW()),
       ((SELECT id
         FROM timetable
         WHERE name = 'Horário da Turma B'),
        '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid,
        NOW()),
       ((SELECT id
         FROM timetable
         WHERE name = 'Horário da Turma C'),
        'ac144f88-bbff-47a2-847f-3605957576c8'::uuid,
        NOW());

INSERT INTO public.role (id, school_id, name)
VALUES ('2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid, '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'Professor'),
       ('bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid, '79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'Gestor');

INSERT INTO public.user_role (school_id, role_id, user_id)
VALUES ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
        '2ff53f52-cdd9-4b04-80c4-02d146b653e7'::uuid),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        '905096b1-ad84-46c2-a309-29a0501470f7'::uuid);

-- permissões para Professor
INSERT INTO public.role_permission (school_id, role_id, can_select, can_insert, can_update, can_delete,
                                    "table")
VALUES ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
        true, false, false, false, 'student'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
        true, true, true, false, 'attendance'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
        true, true, true, false, 'grade'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
        true, false, false, false, 'classroom'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
        true, false, false, false, 'discipline'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, '2137ba0e-eb65-4ef9-882a-51032ab1f1d3'::uuid,
        true, false, false, false, 'class_session');

-- permissões para Gestor
INSERT INTO public.role_permission (school_id, role_id, can_select, can_insert, can_update, can_delete,
                                    "table")
VALUES ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'student'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'teacher'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'classroom'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'discipline'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'course'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'series'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'timetable'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'class_session'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'attendance'),
       ('79b51357-d87c-49c2-a61d-ecbff0ae1df0'::uuid, 'bdb42af9-3ccf-431e-b1f3-af2440261cb4'::uuid,
        true, true, true, true, 'grade');

----- Criar manual, usuário migration sem permissão, substituir ids na user_roles
-- 2ff - professor
-- 905 - gestor
-- gestor@eduprime.com
-- profesor@eduprime.com