DEALLOCATE ALL;

CREATE SCHEMA IF NOT EXISTS system;

CREATE TYPE status AS ENUM (
    'Ativo',
    'Inativo',
    'Graduado',
    'Suspenso',
    'Transferido'
    );

CREATE TYPE situation_type AS ENUM (
    'Pendente',
    'Cursando',
    'Aprovado',
    'Aprovado pelo Conselho',
    'Aprovado com Dependência',
    'Reprovado',
    'Transferido',
    'Abandono',
    'Falecido'
    );

CREATE TYPE attendance_status AS ENUM (
    'PRESENT',
    'ABSENT',
    'EXCUSED'
    );

CREATE TYPE day_of_week AS ENUM (
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo'
    );

CREATE TYPE period AS ENUM (
    'Manhã',
    'Tarde',
    'Noite'
    );

CREATE TYPE course_stage_type AS ENUM (
    'Etapa 1',
    'Etapa 2',
    'Etapa 3',
    'Etapa 4',
    'Etapa 5',
    'Etapa 6'
);

CREATE TYPE gender_type AS ENUM (
    'Masculino',
    'Feminino'
);

CREATE TYPE graduate_status AS ENUM (
    'Sim',
    'Não'
);

CREATE TYPE marital_status_type AS ENUM (
    'Solteiro',
    'Casado',
    'Divorciado',
    'Viúvo',
    'Separado',
    'União Estável',
    'Não Informado'
);

CREATE TYPE responsibleType AS ENUM (
    'Pai',
    'Mãe',
    'Ambos'
);

CREATE TYPE residence_zone_type AS ENUM (
    'Urbana',
    'Rural'
);

CREATE TYPE race_type AS ENUM (
    'Branco',
    'Preta',
    'Parda',
    'Amarela',
    'Indígena',
    'Não Declarada'
);

CREATE TYPE deficiency_type AS ENUM (
    'Visual',
    'Auditiva',
    'Física',
    'Intelectual',
    'Mental',
    'Múltipla',
    'Outros',
    'Não possui'
);

CREATE TABLE institution
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name         VARCHAR(100)                               NOT NULL,
    address      VARCHAR(255),
    city         VARCHAR(100),
    state        CHAR(2),
    postalcode   CHAR(10),
    phone        VARCHAR(15),
    email        VARCHAR(255),
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    singleton    INTEGER          DEFAULT 1                 NOT NULL UNIQUE,
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);

CREATE TABLE school (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state CHAR(2),
    postalcode CHAR(10),
    school_zone residence_zone_type,
    phone VARCHAR(15),
    email VARCHAR(100),
    website VARCHAR(255),
    social_network VARCHAR(255),
    institution_id uuid NOT NULL,
    active boolean DEFAULT true NOT NULL,
    abbreviation VARCHAR(255),
    logourl VARCHAR(255),
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);
CREATE TABLE teacher
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name         VARCHAR(100)                               NOT NULL,
    birthdate DATE NOT NULL,
    email        VARCHAR(255),
    phone        VARCHAR(15),
    address VARCHAR(255),
    qualifications  jsonb,
    status       status           DEFAULT 'Ativo',
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);

CREATE TABLE discipline
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    teacher_id   UUID                                       NOT NULL REFERENCES teacher (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name         VARCHAR(100)                               NOT NULL,
    status       status           DEFAULT 'Ativo',
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);

CREATE TABLE course
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name         VARCHAR(100)                               NOT NULL,
    status       status           DEFAULT 'Ativo',
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);

CREATE TABLE classroom
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    series_id    UUID                                       NOT NULL,
    institution_id    UUID                                       NOT NULL REFERENCES institution (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    course_id    UUID                                       NOT NULL REFERENCES course (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    teacher_id    UUID                                       NOT NULL REFERENCES teacher (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    maxStudents INTEGER NOT NULL,
    startTime TIME NOT NULL,
    startTimeInterval TIME NOT NULL,
    endTimeInterval TIME NOT NULL,
    endTime TIME NOT NULL,
    day_of_week day_of_week NOT NULL,
    name         VARCHAR(100)                               NOT NULL,
    period       period           DEFAULT 'Manhã'         NOT NULL,
    status       status           DEFAULT 'Ativo' NOT NULL,
    abbreviation VARCHAR(100),
    year INTEGER NOT NULL,
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);
CREATE TABLE timetable
(
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id     UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    classroom_id  UUID                                       NOT NULL REFERENCES classroom (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    discipline_id UUID                                       REFERENCES discipline (id) ON UPDATE CASCADE ON DELETE SET NULL,
    name          VARCHAR(100)                               NOT NULL,
    metadata      JSONB,
    user_created  UUID             DEFAULT auth.uid(),
    created_at    TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at    TIMESTAMPTZ,
    updated_at    TIMESTAMPTZ
);
CREATE TABLE class_session
(
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id     UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    discipline_id UUID                                       NOT NULL REFERENCES discipline (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    timetable_id  UUID                                       NOT NULL REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    day_of_week   day_of_week                                NOT NULL,
    start_time    TIME                                       NOT NULL,
    end_time      TIME                                       NOT NULL,
    metadata      JSONB,
    user_created  UUID             DEFAULT auth.uid(),
    created_at    TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at    TIMESTAMPTZ,
    updated_at    TIMESTAMPTZ

);



CREATE TABLE series
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    course_id    UUID                                       NOT NULL REFERENCES course (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    institution_id UUID                                       REFERENCES institution (id) ON UPDATE CASCADE ON DELETE SET NULL,
    timetable_id UUID                                       REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE SET NULL,
    name         VARCHAR(100)                               NOT NULL,
    course_stage course_stage_type DEFAULT 'Etapa 1' NOT NULL,
    graduate graduate_status DEFAULT 'Sim' NOT NULL,
    workload VARCHAR(100) NOT NULL,
    school_days VARCHAR(100) NOT NULL,
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);


CREATE TABLE student
(
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name           VARCHAR(100)                               NOT NULL,
    birthdate      DATE                                       NOT NULL,
    gender         gender_type DEFAULT 'Masculino',
    place_of_birth VARCHAR(100),
    postalcode VARCHAR(100),
    residence_zone residence_zone_type DEFAULT 'Urbana',
    number_address VARCHAR(100),
    cpf VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    complement VARCHAR(100),
    father_name VARCHAR(100),
    father_email VARCHAR(100),
    father_cpf VARCHAR(100),
    father_phone VARCHAR(100),
    mother_name VARCHAR(100),
    mother_email VARCHAR(100),
    mother_cpf VARCHAR(100),
    mother_phone VARCHAR(100),
    rg_number VARCHAR(100),
    rg_state CHAR(2),
    rg_issue_date DATE,
    rg_issuer VARCHAR (100),
    new_birth_cert_number VARCHAR (100),
    old_birth_cert_term VARCHAR (100),
    old_birth_cert_book VARCHAR (100),
    old_birth_cert_sheet VARCHAR (100),
    docsType VARCHAR (100),
    old_birth_cert_date_issue DATE,
    old_birth_cert_state VARCHAR (100),
    responsibleType responsibleType DEFAULT 'Pai',
    deficiency deficiency_type DEFAULT 'Não possui',
    race race_type DEFAULT 'Não Declarada',
    email          VARCHAR(255),
    phone          VARCHAR(15) NOT NULL,
    address        VARCHAR(255),
    status         status           DEFAULT 'Ativo',
    photo          BYTEA,
    metadata       JSONB,
    user_created   UUID             DEFAULT auth.uid(),
    created_at     TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at     TIMESTAMPTZ,
    updated_at     TIMESTAMPTZ
);

CREATE TABLE enrollment (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id     UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    student_id   UUID                                       NOT NULL REFERENCES student (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    course_id     UUID                                       NOT NULL REFERENCES course (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    classroom_id     UUID                                       NOT NULL REFERENCES classroom (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    series_id     UUID                                       NOT NULL REFERENCES series (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name VARCHAR(100),
    created_at     TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at     TIMESTAMPTZ,
    updated_at     TIMESTAMPTZ,
    date_enrollment DATE NOT NULL,
    observations VARCHAR(200),
    status         status           DEFAULT 'Ativo',
    situation situation_type DEFAULT NULL,
    enrollmentCode VARCHAR(100) UNIQUE
);

CREATE TABLE attendance
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    student_id   UUID                                       NOT NULL REFERENCES student (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    date         TIMESTAMPTZ                                NOT NULL,
    status       attendance_status                          NOT NULL,
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);

CREATE TABLE grade
(
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id     UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    student_id    UUID                                       NOT NULL REFERENCES student (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    discipline_id UUID                                       NOT NULL REFERENCES discipline (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    value         double precision                           NOT NULL,
    date          TIMESTAMPTZ                                NOT NULL,
    metadata      JSONB,
    user_created  UUID             DEFAULT auth.uid(),
    created_at    TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at    TIMESTAMPTZ,
    updated_at    TIMESTAMPTZ
);

CREATE TABLE timetable_school
(
    timetable_id UUID                                  NOT NULL REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    school_id    UUID                                  NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    metadata     JSONB,
    user_created UUID        DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ,
    PRIMARY KEY (timetable_id, school_id)
);

CREATE TABLE teacher_to_timetable
(
    school_id    UUID NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    teacher_id   UUID NOT NULL REFERENCES teacher (id) ON UPDATE CASCADE ON DELETE CASCADE,
    timetable_id UUID NOT NULL REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (school_id, teacher_id, timetable_id)
);


CREATE TABLE role
(
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID         NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name      varchar(100) NOT NULL
);
  CREATE TABLE holidays (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    holiday_date DATE NOT NULL,
    description VARCHAR(100),
    weekday VARCHAR(10) -- Coluna para armazenar o dia da semana
);
CREATE OR REPLACE FUNCTION set_weekday()
RETURNS TRIGGER AS $$
BEGIN
    NEW.weekday := TO_CHAR(NEW.holiday_date, 'Day');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_weekday
BEFORE INSERT OR UPDATE ON holidays
FOR EACH ROW
EXECUTE FUNCTION set_weekday();


CREATE TABLE document (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(255) NOT NULL,
    size BIGINT NOT NULL,
    is_current_version BOOLEAN DEFAULT TRUE,
    file_hash TEXT UNIQUE,
    upload_date timestamptz DEFAULT CURRENT_TIMESTAMP,
    storage_path TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    compression_applied BOOLEAN DEFAULT FALSE,
    metadata JSONB,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamptz,
    deleted_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

-- Política para permitir uploads por usuários anônimos no bucket 'ged'
CREATE POLICY "allow_anon_insert"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (
  bucket_id = 'ged'
);

-- Política para permitir leitura por usuários anônimos no bucket 'ged'
CREATE POLICY "public_read_policy"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'ged'
  AND auth.role() = 'anon'
);

CREATE TABLE academic_year_template (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    ref_year INTEGER NOT NULL, -- Ano de referência
    name VARCHAR(100) NOT NULL UNIQUE, -- Nome do modelo de ano letivo
    stages jsonb NOT NULL, -- JSONB para armazenar etapas do ano letivo
    stage_count INTEGER GENERATED ALWAYS AS (jsonb_array_length(stages)) STORED, -- Número de etapas, calculado automaticamente
    metadata jsonb, -- Metadados adicionais, se necessário
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamptz,
    deleted_at timestamptz,
    user_created UUID DEFAULT auth.uid() -- Usuário que criou o registro
);

CREATE TABLE academic_year (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    school_id uuid NOT NULL, -- Chave estrangeira para a tabela school
    template_id uuid NOT NULL, -- Chave estrangeira para a tabela academic_year_template
    ref_year INTEGER NOT NULL, -- Ano de referência
    metadata jsonb, -- Metadados adicionais, se necessário
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamptz,
    deleted_at timestamptz,
    user_created UUID DEFAULT auth.uid() -- Usuário que criou o registro
);

-- Melhorar campos
CREATE TABLE _teachertotimetable (
    a uuid NOT NULL,
    b uuid NOT NULL
);

CREATE TABLE role_permission
(
    school_id  UUID    NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    role_id    UUID    NOT NULL REFERENCES role (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    "table"    varchar NOT NULL,
    can_select boolean NOT NULL,
    can_insert boolean NOT NULL,
    can_update boolean NOT NULL,
    can_delete boolean NOT NULL,
    PRIMARY KEY (role_id, school_id, "table")
);

CREATE TABLE user_role
(
    school_id UUID NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    role_id   UUID NOT NULL REFERENCES role (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    user_id   UUID NOT NULL,
    PRIMARY KEY (school_id, role_id, user_id)
);

ALTER TABLE ONLY classroom
    ADD CONSTRAINT classroom_seriesid_fkey FOREIGN KEY (series_id) REFERENCES series (id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY course
    ADD CONSTRAINT course_schoolid_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY discipline
    ADD CONSTRAINT discipline_teacherid_fkey FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY grade
    ADD CONSTRAINT grade_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY grade
    ADD CONSTRAINT grade_studentid_fkey FOREIGN KEY (student_id) REFERENCES student(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY school
    ADD CONSTRAINT school_institutionid_fkey FOREIGN KEY (institution_id) REFERENCES institution(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY series
    ADD CONSTRAINT series_courseid_fkey FOREIGN KEY (course_id) REFERENCES course(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY series
    ADD CONSTRAINT series_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY student
    ADD CONSTRAINT student_classroomid_fkey FOREIGN KEY (classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY teacher
    ADD CONSTRAINT teacher_schoolid_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY timetable_school
    ADD CONSTRAINT timetableschool_schoolid_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY timetable_school
    ADD CONSTRAINT timetableschool_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY timetable
    ADD CONSTRAINT timetable_classroomid_fkey FOREIGN KEY (classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY timetable
    ADD CONSTRAINT timetable_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY _teachertotimetable
    ADD CONSTRAINT _teachertotimetable_a_fkey FOREIGN KEY (a) REFERENCES teacher(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY _teachertotimetable
    ADD CONSTRAINT _teachertotimetable_b_fkey FOREIGN KEY (b) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-08-22 14:37:41

-- ALTER TABLE "public"."attendance" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."class_session" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."classroom" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."course" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."discipline" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."grade" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."institution" ENABLE ROW LEVEL SECURITY; -- Excluded as requested
-- ALTER TABLE "public"."school" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."series" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."student" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."teacher" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."timetable" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."timetable_school" ENABLE ROW LEVEL SECURITY;


--
-- FUNCTION
--
 CREATE OR REPLACE FUNCTION calculate_business_days(start_date DATE, end_date DATE)
RETURNS INTEGER AS $$
DECLARE
    business_days INTEGER;
BEGIN
    -- Calcular dias úteis excluindo fins de semana e feriados
    SELECT COUNT(*)
    INTO business_days
    FROM generate_series(start_date, end_date, INTERVAL '1 day') AS day
    WHERE EXTRACT(ISODOW FROM day) < 6  -- Excluir sábados (6) e domingos (7)
      AND day::DATE NOT IN (SELECT holiday_date FROM holidays); -- Excluir feriados

    RETURN business_days;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar a coluna updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Bloco PL/pgSQL para adicionar triggers a todas as tabelas com o campo updated_at
DO $$
DECLARE
    tbl RECORD;
BEGIN
    FOR tbl IN
        SELECT table_name
        FROM information_schema.columns
        WHERE column_name = 'updated_at' AND table_schema = 'public'
    LOOP
        EXECUTE format('
            CREATE TRIGGER set_updated_at_%I
            AFTER UPDATE ON %I
            FOR EACH ROW
            WHEN (OLD.* IS DISTINCT FROM NEW.*)
            EXECUTE FUNCTION update_updated_at_column();',
            tbl.table_name, tbl.table_name
        );
    END LOOP;
END;
$$;