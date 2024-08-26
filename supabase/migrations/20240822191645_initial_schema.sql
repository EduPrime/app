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

--
-- TOC entry 1278 (class 1247 O_id 18818)
-- Name: day_of_week; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE day_of_week AS ENUM (
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
);
--
-- TOC entry 1275 (class 1247 O_id 18811)
-- Name: Period; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE period AS ENUM (
    'MORNING',
    'AFTERNOON',
    'EVENING'
);

--
-- TOC entry 286 (class 1259 O_id 18914)
-- Name: Attendance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE attendance (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    date timestamp(3) without time zone NOT NULL,
    student_id uuid NOT NULL,
    status attendance_status NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 285 (class 1259 O_id 18907)
-- Name: class_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE class_session (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    day_of_week day_of_week NOT NULL,
    start_time VARCHAR(255) NOT NULL,
    end_time VARCHAR(255) NOT NULL,
    discipline_id uuid NOT NULL,
    timetable_id uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 280 (class 1259 O_id 18871)
-- Name: Classroom; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE classroom (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    period period DEFAULT 'MORNING'::period NOT NULL,
    series_id uuid NOT NULL,
    status status DEFAULT 'ACTIVE',
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);



--
-- TOC entry 278 (class 1259 O_id 18857)
-- Name: Course; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE course (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    school_id uuid NOT NULL,
    status status DEFAULT 'ACTIVE',
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 283 (class 1259 O_id 18893)
-- Name: Discipline; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE discipline (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    teacher_id uuid NOT NULL,
    status status DEFAULT 'ACTIVE',
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 287 (class 1259 O_id 18919)
-- Name: Grade; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE grade (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    value double precision NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    student_id uuid NOT NULL,
    discipline_id uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 276 (class 1259 O_id 18841)
-- Name: Institution; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE institution (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state CHAR(2),
    postalcode CHAR(10),
    phone VARCHAR(15),
    email VARCHAR(255),
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid(),
    singleton integer DEFAULT 1 NOT NULL
);


--
-- TOC entry 277 (class 1259 O_id 18848)
-- Name: School; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE school (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state CHAR(2),
    postalcode CHAR(10),
    phone VARCHAR(15),
    institution_id uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
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
    user_created UUID DEFAULT auth.uid(),
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 279 (class 1259 O_id 18864)
-- Name: Series; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE series (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    course_id uuid NOT NULL,
    timetable_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 281 (class 1259 O_id 18879)
-- Name: Student; Type: TABLE; Schema: public; Owner: -
--

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
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 282 (class 1259 O_id 18886)
-- Name: Teacher; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE teacher (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(15),
    school_id uuid NOT NULL,
    status status DEFAULT 'ACTIVE',
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 284 (class 1259 O_id 18900)
-- Name: Timetable; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE timetable (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    classroom_id uuid NOT NULL,
    discipline_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 288 (class 1259 O_id 18924)
-- Name: timetable_school; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE timetable_school (
    timetable_id uuid NOT NULL,
    school_id uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    user_created UUID DEFAULT auth.uid()
);


--
-- TOC entry 289 (class 1259 O_id 18929)
-- Name: _TeacherToTimetable; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE _teachertotimetable (
    a uuid NOT NULL,
    b uuid NOT NULL
);

--
-- TOC entry 3782 (class 2606 O_id 18928)
-- Name: timetable_school TimetableSchool_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable_school
    ADD CONSTRAINT timetableschool_pkey PRIMARY KEY (timetable_id, school_id);

 

--
-- TOC entry 3758 (class 1259 O_id 19042)
-- Name: Institution_singleton_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX institution_singleton_key ON institution USING btree (singleton);


--
-- TOC entry 3783 (class 1259 O_id 18932)
-- Name: _TeacherToTimetable_AB_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _teachertotimetable_ab_unique ON _teachertotimetable USING btree (a, b);


--
-- TOC entry 3784 (class 1259 O_id 18933)
-- Name: _TeacherToTimetable_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _teachertotimetable_b_index ON _teachertotimetable USING btree (b);


--
-- TOC entry 3797 (class 2606 O_id 18994)
-- Name: Attendance Attendance_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_studentid_fkey FOREIGN KEY (student_id) REFERENCES student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3795 (class 2606 O_id 18984)
-- Name: class_session ClassSession_disciplineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY class_session
    ADD CONSTRAINT classsession_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3796 (class 2606 O_id 18989)
-- Name: class_session ClassSession_timetableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY class_session
    ADD CONSTRAINT classsession_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3789 (class 2606 O_id 18954)
-- Name: Classroom Classroom_seriesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY classroom
    ADD CONSTRAINT classroom_seriesid_fkey FOREIGN KEY (series_id) REFERENCES series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3786 (class 2606 O_id 18939)
-- Name: Course Course_schoolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY course
    ADD CONSTRAINT course_schoolid_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3792 (class 2606 O_id 18969)
-- Name: Discipline Discipline_teacherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY discipline
    ADD CONSTRAINT discipline_teacherid_fkey FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3798 (class 2606 O_id 19004)
-- Name: Grade Grade_disciplineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY grade
    ADD CONSTRAINT grade_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3799 (class 2606 O_id 18999)
-- Name: Grade Grade_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY grade
    ADD CONSTRAINT grade_studentid_fkey FOREIGN KEY (student_id) REFERENCES student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3785 (class 2606 O_id 18934)
-- Name: School School_institutionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY school
    ADD CONSTRAINT school_institutionid_fkey FOREIGN KEY (institution_id) REFERENCES institution(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3787 (class 2606 O_id 18944)
-- Name: Series Series_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY series
    ADD CONSTRAINT series_courseid_fkey FOREIGN KEY (course_id) REFERENCES course(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3788 (class 2606 O_id 18949)
-- Name: Series Series_timetableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY series
    ADD CONSTRAINT series_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3790 (class 2606 O_id 18959)
-- Name: Student Student_classroomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY student
    ADD CONSTRAINT student_classroomid_fkey FOREIGN KEY (classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3791 (class 2606 O_id 18964)
-- Name: Teacher Teacher_schoolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY teacher
    ADD CONSTRAINT teacher_schoolid_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3800 (class 2606 O_id 19014)
-- Name: timetable_school TimetableSchool_schoolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable_school
    ADD CONSTRAINT timetableschool_schoolid_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3801 (class 2606 O_id 19009)
-- Name: timetable_school TimetableSchool_timetableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable_school
    ADD CONSTRAINT timetableschool_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3793 (class 2606 O_id 18974)
-- Name: Timetable Timetable_classroomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable
    ADD CONSTRAINT timetable_classroomid_fkey FOREIGN KEY (classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3794 (class 2606 O_id 18979)
-- Name: Timetable Timetable_disciplineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable
    ADD CONSTRAINT timetable_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3802 (class 2606 O_id 19019)
-- Name: _TeacherToTimetable _TeacherToTimetable_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY _teachertotimetable
    ADD CONSTRAINT _teachertotimetable_a_fkey FOREIGN KEY (a) REFERENCES teacher(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3803 (class 2606 O_id 19024)
-- Name: _TeacherToTimetable _TeacherToTimetable_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

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
