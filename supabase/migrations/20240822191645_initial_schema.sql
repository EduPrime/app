DEALLOCATE ALL;
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

CREATE TABLE attendance (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    date timestamptz NOT NULL,
    student_id uuid NOT NULL,
    status attendance_status NOT NULL,
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE class_session (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    day_of_week day_of_week NOT NULL,
    start_time VARCHAR(255) NOT NULL,
    end_time VARCHAR(255) NOT NULL,
    discipline_id uuid NOT NULL,
    timetable_id uuid NOT NULL,
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE classroom (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    period period DEFAULT 'MORNING'::period NOT NULL,
    series_id uuid NOT NULL,
    status status DEFAULT 'ACTIVE',
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE course (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    school_id uuid NOT NULL,
    status status DEFAULT 'ACTIVE',
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE discipline (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    teacher_id uuid NOT NULL,
    status status DEFAULT 'ACTIVE',
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE grade (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    value double precision NOT NULL,
    date timestamptz NOT NULL,
    student_id uuid NOT NULL,
    discipline_id uuid NOT NULL,
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE institution (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state CHAR(2),
    postalcode CHAR(10),
    phone VARCHAR(15),
    email VARCHAR(255),
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid(),
    singleton integer DEFAULT 1 NOT NULL
);

CREATE TABLE school (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state CHAR(2),
    postalcode CHAR(10),
    phone VARCHAR(15),
    institution_id uuid NOT NULL,
    active boolean DEFAULT true NOT NULL,
    abbreviation VARCHAR(255),
    longitude VARCHAR(255),
    latitude VARCHAR(255),
    totalarea VARCHAR(255),
    builtarea VARCHAR(255),
    availablearea VARCHAR(255),
    acronym VARCHAR(255),
    blockdiaryentriesforclosedacademicyears boolean,
    operationalstatus integer,
    administrativedependency integer,
    regulation integer,
    logourl VARCHAR(255),
    access integer,
    manager_id uuid,
    managerposition VARCHAR(255),
    operationlocation VARCHAR(255),
    condition integer,
    sharedschoolinepcode integer,
    creationdecree VARCHAR(255),
    numberoffloors integer,
    floortype integer,
    energymeter integer,
    hasexternalarea boolean,
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE series (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    course_id uuid NOT NULL,
    timetable_id uuid,
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE student (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL, 
    gender CHAR(1), -- Gênero
    email VARCHAR(255),
    phone VARCHAR(15),
    address VARCHAR(255), -- Endereço
    classroom_id uuid NOT NULL,
    guardian_name VARCHAR(100),  
    guardian_phone VARCHAR(15),  
    status status DEFAULT 'ACTIVE',
    photo BYTEA,
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE teacher (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL, 
    email VARCHAR(255),
    phone VARCHAR(15),
    address VARCHAR(255),
    specializations  jsonb,
    school_id uuid NOT NULL,
    status status DEFAULT 'ACTIVE',
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE timetable (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    classroom_id uuid NOT NULL,
    discipline_id uuid,
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

CREATE TABLE timetable_school (
    timetable_id uuid NOT NULL,
    school_id uuid NOT NULL,
    metadata jsonb,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    updated_at timestamptz,
    user_created UUID DEFAULT auth.uid()
);

-- Melhorar campos
CREATE TABLE _teachertotimetable (
    a uuid NOT NULL,
    b uuid NOT NULL
);

ALTER TABLE ONLY timetable_school
    ADD CONSTRAINT timetableschool_pkey PRIMARY KEY (timetable_id, school_id);

CREATE UNIQUE INDEX institution_singleton_key ON institution USING btree (singleton);

CREATE UNIQUE INDEX _teachertotimetable_ab_unique ON _teachertotimetable USING btree (a, b);

CREATE INDEX _teachertotimetable_b_index ON _teachertotimetable USING btree (b);

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_studentid_fkey FOREIGN KEY (student_id) REFERENCES student(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY class_session
    ADD CONSTRAINT classsession_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY class_session
    ADD CONSTRAINT classsession_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY classroom
    ADD CONSTRAINT classroom_seriesid_fkey FOREIGN KEY (series_id) REFERENCES series(id) ON UPDATE CASCADE ON DELETE RESTRICT;

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

ALTER TABLE "public"."attendance" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."class_session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."classroom" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."course" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."discipline" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."grade" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "public"."institution" ENABLE ROW LEVEL SECURITY; -- Excluded as requested
ALTER TABLE "public"."school" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."series" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."student" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."teacher" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."timetable" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."timetable_school" ENABLE ROW LEVEL SECURITY;


--
-- FUNCTION
--
-- Definindo a função para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
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
