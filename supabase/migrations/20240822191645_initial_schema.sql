DEALLOCATE ALL;

CREATE SCHEMA IF NOT EXISTS system;

CREATE TYPE status AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'GRADUATED',
    'SUSPENDED',
    'TRANSFERRED'
    );

CREATE TYPE attendance_status AS ENUM (
    'PRESENT',
    'ABSENT',
    'EXCUSED'
    );

CREATE TYPE day_of_week AS ENUM (
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
    );

CREATE TYPE period AS ENUM (
    'MORNING',
    'AFTERNOON',
    'EVENING'
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

CREATE TABLE school
(
    id                                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id                          UUID                                       NOT NULL REFERENCES institution (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name                                    VARCHAR(100)                               NOT NULL,
    address                                 VARCHAR(255),
    city                                    VARCHAR(100),
    state                                   CHAR(2),
    postalcode                              CHAR(10),
    phone                                   VARCHAR(15),
    active                                  boolean          DEFAULT true              NOT NULL,
    abbreviation                            VARCHAR(255),
    longitude                               VARCHAR(255),
    latitude                                VARCHAR(255),
    totalarea                               VARCHAR(255),
    builtarea                               VARCHAR(255),
    availablearea                           VARCHAR(255),
    acronym                                 VARCHAR(255),
    blockdiaryentriesforclosedacademicyears boolean,
    operationalstatus                       INTEGER,
    administrativedependency                INTEGER,
    regulation                              INTEGER,
    logourl                                 VARCHAR(255),
    access                                  INTEGER,
    manager_id                              uuid,
    managerposition                         VARCHAR(255),
    operationlocation                       VARCHAR(255),
    condition                               INTEGER,
    sharedschoolinepcode                    INTEGER,
    creationdecree                          VARCHAR(255),
    numberoffloors                          INTEGER,
    floortype                               INTEGER,
    energymeter                             INTEGER,
    hasexternalarea                         boolean,
    metadata                                JSONB,
    user_created                            UUID             DEFAULT auth.uid(),
    created_at                              TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at                              TIMESTAMPTZ,
    updated_at                              TIMESTAMPTZ
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

CREATE TABLE classroom
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    series_id    UUID                                       NOT NULL REFERENCES series (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name         VARCHAR(100)                               NOT NULL,
    period       period           DEFAULT 'MORNING'         NOT NULL,
    status       status           DEFAULT 'ACTIVE',
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
    status       status           DEFAULT 'ACTIVE',
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
    status       status           DEFAULT 'ACTIVE',
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);

-- Grade table
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

-- Series table
CREATE TABLE series
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    course_id    UUID                                       NOT NULL REFERENCES course (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    timetable_id UUID                                       REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE SET NULL,
    name         VARCHAR(100)                               NOT NULL,
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);

-- Student table
CREATE TABLE student
(
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id      UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    classroom_id   UUID                                       NOT NULL REFERENCES classroom (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name           VARCHAR(100)                               NOT NULL,
    birthdate      DATE                                       NOT NULL,
    gender         CHAR(1),
    email          VARCHAR(255),
    phone          VARCHAR(15),
    address        VARCHAR(255),
    guardian_name  VARCHAR(100),
    guardian_phone VARCHAR(15),
    status         status           DEFAULT 'ACTIVE',
    photo          BYTEA,
    metadata       JSONB,
    user_created   UUID             DEFAULT auth.uid(),
    created_at     TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at     TIMESTAMPTZ,
    updated_at     TIMESTAMPTZ
);

-- Teacher table
CREATE TABLE teacher
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name         VARCHAR(100)                               NOT NULL,
    email        VARCHAR(255),
    phone        VARCHAR(15),
    status       status           DEFAULT 'ACTIVE',
    metadata     JSONB,
    user_created UUID             DEFAULT auth.uid(),
    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at   TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ
);

-- Timetable table
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

-- Timetable School table
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
    school_id UUID NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    a         UUID NOT NULL REFERENCES teacher (id) ON UPDATE CASCADE ON DELETE CASCADE,
    b         UUID NOT NULL REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (a, b)
);

-- CREATE TABLE user_school
-- (
--     user_id   uuid,
--     school_id UUID NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
--     roles     text[],
--     PRIMARY KEY (user_id, school_id)
-- );

CREATE TABLE role
(
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID         NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name      varchar(100) NOT NULL
);

CREATE TABLE role_permission
(
    school_id UUID      NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    role_id   UUID      NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    user_id   UUID      NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    can_select boolean NOT NULL,
    can_insert boolean NOT NULL,
    can_update boolean NOT NULL,
    can_delete boolean NOT NULL,
    PRIMARY KEY (user_id, school_id)
);

-- RLS
ALTER TABLE "public"."attendance"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."class_session"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."classroom"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."course"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."discipline"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."grade"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."institution"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."school"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."series"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."student"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."teacher"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."timetable"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."timetable_school"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."teacher_to_timetable"
    ENABLE ROW LEVEL SECURITY;
--
-- FUNCTION
--
-- Definindo a função para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Bloco PL/pgSQL para adicionar triggers a todas as tabelas com o campo updated_at
DO
$$
    DECLARE
        tbl RECORD;
    BEGIN
        FOR tbl IN
            SELECT table_name
            FROM information_schema.columns
            WHERE column_name = 'updated_at'
              AND table_schema = 'public'
            LOOP
                EXECUTE format('
            CREATE TRIGGER set_updated_at_%I
            BEFORE UPDATE ON %I
            FOR EACH ROW
            WHEN (OLD.* IS DISTINCT FROM NEW.*)
            EXECUTE FUNCTION update_updated_at_column();',
                               tbl.table_name, tbl.table_name
                        );
            END LOOP;
    END;
$$;

-- Qualquer outra lógica ou dados que você queira adicionar
