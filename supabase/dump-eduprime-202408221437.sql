
CREATE TYPE attendance_status AS ENUM (
    'PRESENT',
    'ABSENT',
    'EXCUSED'
);

--
-- TOC entry 1278 (class 1247 OID 18818)
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
-- TOC entry 1275 (class 1247 OID 18811)
-- Name: Period; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE period AS ENUM (
    'MORNING',
    'AFTERNOON',
    'EVENING'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 286 (class 1259 OID 18914)
-- Name: Attendance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE attendance (
    id uuid PRIMARY KEY NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    studentid uuid NOT NULL,
    status attendance_status NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 285 (class 1259 OID 18907)
-- Name: class_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE class_session (
    id uuid PRIMARY KEY NOT NULL,
    day_of_week day_of_week NOT NULL,
    starttime text NOT NULL,
    endtime text NOT NULL,
    disciplineid uuid NOT NULL,
    timetableid uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 280 (class 1259 OID 18871)
-- Name: Classroom; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE classroom (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    period period DEFAULT 'MORNING'::period NOT NULL,
    seriesid uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 278 (class 1259 OID 18857)
-- Name: Course; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE course (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    schoolid uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 283 (class 1259 OID 18893)
-- Name: Discipline; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE discipline (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    teacherid uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 287 (class 1259 OID 18919)
-- Name: Grade; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE grade (
    id uuid PRIMARY KEY NOT NULL,
    value double precision NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    studentid uuid NOT NULL,
    disciplineid uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 276 (class 1259 OID 18841)
-- Name: Institution; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE institution (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    address text,
    city text,
    state text,
    postalcode text,
    phone text,
    email text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone,
    singleton integer DEFAULT 1 NOT NULL
);


--
-- TOC entry 277 (class 1259 OID 18848)
-- Name: School; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE school (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    address text,
    city text,
    state text,
    postalcode text,
    phone text,
    institutionid uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    active boolean DEFAULT true NOT NULL,
    abbreviation text,
    longitude text,
    latitude text,
    totalarea text,
    builtarea text,
    availablearea text,
    acronym text,
    blockdiaryentriesforclosedacademicyears boolean,
    operationalstatus integer,
    administrativedependency integer,
    regulation integer,
    logourl text,
    access integer,
    managerid uuid,
    managerposition text,
    operationlocation text,
    condition integer,
    sharedschoolinepcode integer,
    creationdecree text,
    numberoffloors integer,
    floortype integer,
    energymeter integer,
    waterconsumed integer,
    hasprincipaloffice boolean,
    hasteachersroom boolean,
    hassecretaryoffice boolean,
    hascomputerlab boolean,
    hassciencelab boolean,
    hasaeeroom boolean,
    hascoveredcourt boolean,
    hasuncoveredcourt boolean,
    haskitchen boolean,
    haslibrary boolean,
    hasreadingroom boolean,
    hasplayground boolean,
    hasnursery boolean,
    hasrestroomoutside boolean,
    hasrestroominside boolean,
    haschildrestroom boolean,
    hasaccessiblerestroom boolean,
    hasshower boolean,
    hascafeteria boolean,
    haspantry boolean,
    hasauditorium boolean,
    haspatio boolean,
    hasgreenarea boolean,
    hasperoom boolean,
    hasartsroom boolean,
    hasstudentdormitory boolean,
    hasteacherdormitory boolean,
    hasexternalarea boolean,
    hasmultipurposeroom boolean,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 279 (class 1259 OID 18864)
-- Name: Series; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE series (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    courseid uuid NOT NULL,
    timetableid uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 281 (class 1259 OID 18879)
-- Name: Student; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE student (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    email text,
    phone text,
    classroomid uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 282 (class 1259 OID 18886)
-- Name: Teacher; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE teacher (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    email text,
    phone text,
    schoolid uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 284 (class 1259 OID 18900)
-- Name: Timetable; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE timetable (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    classroomid uuid NOT NULL,
    disciplineid uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 288 (class 1259 OID 18924)
-- Name: timetable_school; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE timetable_school (
    timetableid uuid NOT NULL,
    schoolid uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone
);


--
-- TOC entry 289 (class 1259 OID 18929)
-- Name: _TeacherToTimetable; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE _teachertotimetable (
    a uuid NOT NULL,
    b uuid NOT NULL
);


--
-- TOC entry 3971 (class 0 OID 18914)
-- Dependencies: 286
-- Data for Name: Attendance; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO attendance VALUES ('386309cc-13cf-4905-bf16-df9e115c3f20', '2024-08-22 17:36:16.439', '391efcb9-7af2-46f4-a8c4-efb0b82bf301', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('ab318aed-4c64-4d78-aee4-e4e56fb1d1c3', '2024-08-22 17:36:16.439', '4a7ba6cd-7090-46d2-8ddc-84c5700d44c1', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('94e932d5-872d-40ee-b4b1-c8d92d82bdab', '2024-08-22 17:36:16.439', '28a46ec9-919b-4205-8465-b498aa78ee60', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('3581a6e3-6de5-46e4-b0c3-0ede56981d44', '2024-08-22 17:36:16.439', 'bb5d2119-5a82-4d98-beca-8ee69893eeda', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('4055ce09-c0ff-4ee2-bef0-f196655ea8b2', '2024-08-22 17:36:16.439', 'd1c5f329-ae31-46c9-ad76-07a8861eb688', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('36cdf298-cb65-4e8a-95a9-a3055e719256', '2024-08-22 17:36:16.439', 'f29361bc-9d97-4704-86e0-59bd6b434eed', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('aee18c61-010b-4292-a2ff-ea745e042555', '2024-08-22 17:36:16.439', 'dc53c8c2-c606-4dd5-baea-65c4034bdac8', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('1407fa03-9744-4a1f-9d46-72ff28430526', '2024-08-22 17:36:16.439', '27c3ede5-4f12-46de-a52d-ad8d060f8c1b', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('90e5a79f-c06f-4ed8-9856-37a899db8db2', '2024-08-22 17:36:16.439', '0be461dd-4b3a-4b56-8915-e29609f0da2a', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('450a99a0-b2d2-4a69-b7f0-a80fd088a09c', '2024-08-22 17:36:16.439', '2afad23e-fd99-469a-9b4e-9e9fd9d468bf', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('756cbe30-b5d6-4b9f-aa9d-3c4082e8a277', '2024-08-22 17:36:16.439', 'e9fd9c88-76bb-464d-954c-0e246fcf1734', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');
INSERT INTO attendance VALUES ('2f90371b-de37-4c43-9826-a3d6a31bf818', '2024-08-22 17:36:16.439', '8397997c-b6a6-4abb-96e8-e7a945b9898b', 'PRESENT', '2024-08-22 17:36:16.441', NULL, '2024-08-22 17:36:16.441');


--
-- TOC entry 3970 (class 0 OID 18907)
-- Dependencies: 285
-- Data for Name: class_session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO class_session VALUES ('a3fd7d77-29b2-433b-bc13-20e81ea57c1d', 'MONDAY', '08:00', '09:00', 'c05787aa-0758-40c9-8e5b-a37648adebbd', '0df8a75d-bec5-47f3-b149-9c4fa5e93b21', '2024-08-22 17:36:16.361', NULL, '2024-08-22 17:36:16.361');
INSERT INTO class_session VALUES ('09ce7b25-5e8a-4ed6-b8e4-9a9e302c926f', 'TUESDAY', '09:00', '10:00', '408a0df8-4004-4803-ad0b-0d75f849333c', '0df8a75d-bec5-47f3-b149-9c4fa5e93b21', '2024-08-22 17:36:16.361', NULL, '2024-08-22 17:36:16.361');
INSERT INTO class_session VALUES ('74bf676c-829d-41d7-9e14-9df74d34106f', 'WEDNESDAY', '08:00', '09:00', 'c05787aa-0758-40c9-8e5b-a37648adebbd', '78a4499b-c744-4bf1-8c7d-21c307767c58', '2024-08-22 17:36:16.37', NULL, '2024-08-22 17:36:16.37');
INSERT INTO class_session VALUES ('b8bd3871-ddb5-487e-9be0-826c5d35b48b', 'THURSDAY', '09:00', '10:00', '408a0df8-4004-4803-ad0b-0d75f849333c', '78a4499b-c744-4bf1-8c7d-21c307767c58', '2024-08-22 17:36:16.37', NULL, '2024-08-22 17:36:16.37');
INSERT INTO class_session VALUES ('8787a830-ae6c-484f-9b9b-85b4f2db21c3', 'MONDAY', '08:00', '09:00', 'bf7bb967-ba81-4a4d-9b24-40616a5fc9ac', '9092baa1-58e4-4a55-90ef-9bb55c6e4631', '2024-08-22 17:36:16.372', NULL, '2024-08-22 17:36:16.372');
INSERT INTO class_session VALUES ('889ed50d-6372-4184-8c82-ba904af49eef', 'TUESDAY', '09:00', '10:00', '4967f739-7fa4-447a-84e1-958b2ae38a9d', '9092baa1-58e4-4a55-90ef-9bb55c6e4631', '2024-08-22 17:36:16.372', NULL, '2024-08-22 17:36:16.372');
INSERT INTO class_session VALUES ('45c82676-7246-44ee-8f01-e3cd8ab65a6e', 'MONDAY', '10:00', '11:00', '013818b5-1aa3-4f57-83dc-248d908ab896', 'ac65a727-b4de-496f-b4e8-12774626eb39', '2024-08-22 17:36:16.375', NULL, '2024-08-22 17:36:16.375');
INSERT INTO class_session VALUES ('1372106a-8604-4e0e-ae0d-c36d05e6848c', 'TUESDAY', '11:00', '12:00', 'f8f5869a-c1d8-47e7-9546-51a5be89f251', 'ac65a727-b4de-496f-b4e8-12774626eb39', '2024-08-22 17:36:16.375', NULL, '2024-08-22 17:36:16.375');
INSERT INTO class_session VALUES ('b7232ae6-c5c6-4bdc-8a73-571b31582b24', 'WEDNESDAY', '08:00', '09:00', 'bf7bb967-ba81-4a4d-9b24-40616a5fc9ac', '1b001345-d4d1-4cf1-8f0a-f5a8afb04fe7', '2024-08-22 17:36:16.38', NULL, '2024-08-22 17:36:16.38');
INSERT INTO class_session VALUES ('ed967578-6826-44b4-951a-daf7789deffb', 'THURSDAY', '09:00', '10:00', '4967f739-7fa4-447a-84e1-958b2ae38a9d', '1b001345-d4d1-4cf1-8f0a-f5a8afb04fe7', '2024-08-22 17:36:16.38', NULL, '2024-08-22 17:36:16.38');
INSERT INTO class_session VALUES ('c6593edb-6b92-4431-89c2-932912e71db3', 'MONDAY', '10:00', '11:00', '87a261f8-80f0-4dc1-aae4-e193f0f7cd99', '647b4415-3452-480e-ba5b-7356754e8f08', '2024-08-22 17:36:16.407', NULL, '2024-08-22 17:36:16.407');
INSERT INTO class_session VALUES ('2d993941-6847-4215-84fc-781bd8fed8f9', 'TUESDAY', '11:00', '12:00', '3d459c75-be07-41dc-8c92-227d77382a79', '647b4415-3452-480e-ba5b-7356754e8f08', '2024-08-22 17:36:16.407', NULL, '2024-08-22 17:36:16.407');


--
-- TOC entry 3965 (class 0 OID 18871)
-- Dependencies: 280
-- Data for Name: Classroom; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO classroom VALUES ('ef40a6bd-915a-4ee2-94ee-08144a028727', 'Turma A', 'MORNING', '7082a1bd-004e-4cfc-b2e9-05f2aba7c8b7', '2024-08-22 17:36:16.324', NULL, '2024-08-22 17:36:16.324');
INSERT INTO classroom VALUES ('a96e7935-678d-414b-ad47-f30a1c793705', 'Turma B', 'AFTERNOON', '7082a1bd-004e-4cfc-b2e9-05f2aba7c8b7', '2024-08-22 17:36:16.326', NULL, '2024-08-22 17:36:16.326');
INSERT INTO classroom VALUES ('aade83c7-95dd-4765-827c-dedd00e4e761', 'Turma C', 'EVENING', '2fc0ed7a-7770-4a05-82b5-383c1718e1f4', '2024-08-22 17:36:16.328', NULL, '2024-08-22 17:36:16.328');
INSERT INTO classroom VALUES ('9c74990d-62ed-4954-8b12-33a9b68ae5bd', 'Turma A', 'MORNING', '4be1e9de-5831-43a2-a694-a46233c969ff', '2024-08-22 17:36:16.356', NULL, '2024-08-22 17:36:16.356');
INSERT INTO classroom VALUES ('c714b1e9-9d78-41a3-9b32-b89574df5bfd', 'Turma B', 'AFTERNOON', '4be1e9de-5831-43a2-a694-a46233c969ff', '2024-08-22 17:36:16.358', NULL, '2024-08-22 17:36:16.358');
INSERT INTO classroom VALUES ('fa8e0302-e5b9-4e7a-b31f-97c82fc14ad8', 'Turma C', 'EVENING', '4f59aa6f-3077-4b77-9b86-cb82d99dd91a', '2024-08-22 17:36:16.359', NULL, '2024-08-22 17:36:16.359');


--
-- TOC entry 3963 (class 0 OID 18857)
-- Dependencies: 278
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO course VALUES ('e414b152-1e07-4ce4-b19c-8af7537106be', 'Ensino Fundamental I', '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.317', NULL, '2024-08-22 17:36:16.317');
INSERT INTO course VALUES ('9024463f-a510-40df-aa12-5482ef80463d', 'Ensino Médio', 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.319', NULL, '2024-08-22 17:36:16.319');
INSERT INTO course VALUES ('5ef56102-4df5-4937-a5e1-29dec687ade1', 'Ensino Fundamental I', '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.35', NULL, '2024-08-22 17:36:16.35');
INSERT INTO course VALUES ('0597d637-4220-4655-b50d-56c342ceb325', 'Ensino Médio', 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.353', NULL, '2024-08-22 17:36:16.353');


--
-- TOC entry 3968 (class 0 OID 18893)
-- Dependencies: 283
-- Data for Name: Discipline; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO discipline VALUES ('c05787aa-0758-40c9-8e5b-a37648adebbd', 'Matemática', 'e7a51974-8bfc-4aa1-b1a8-feffce06ab7a', '2024-08-22 17:36:16.342', NULL, '2024-08-22 17:36:16.342');
INSERT INTO discipline VALUES ('408a0df8-4004-4803-ad0b-0d75f849333c', 'Ciências', 'a9607eba-b10f-40fe-a3af-69b446b6a664', '2024-08-22 17:36:16.344', NULL, '2024-08-22 17:36:16.344');
INSERT INTO discipline VALUES ('013818b5-1aa3-4f57-83dc-248d908ab896', 'História', 'b465610b-b9fd-421e-a08a-6154650418fc', '2024-08-22 17:36:16.346', NULL, '2024-08-22 17:36:16.346');
INSERT INTO discipline VALUES ('f8f5869a-c1d8-47e7-9546-51a5be89f251', 'Geografia', '72118dc4-e0bb-43a7-8c75-0bccdd380b9a', '2024-08-22 17:36:16.359', NULL, '2024-08-22 17:36:16.359');
INSERT INTO discipline VALUES ('bf7bb967-ba81-4a4d-9b24-40616a5fc9ac', 'Matemática', '0eb341ad-7fc3-4466-aa89-bc1180971024', '2024-08-22 17:36:16.367', NULL, '2024-08-22 17:36:16.367');
INSERT INTO discipline VALUES ('4967f739-7fa4-447a-84e1-958b2ae38a9d', 'Ciências', 'a2ad98e4-1ee7-4ada-9e91-dcfe103b0b55', '2024-08-22 17:36:16.368', NULL, '2024-08-22 17:36:16.368');
INSERT INTO discipline VALUES ('87a261f8-80f0-4dc1-aae4-e193f0f7cd99', 'História', '8d4a1df3-e23e-49f0-be09-7540da1ba91b', '2024-08-22 17:36:16.37', NULL, '2024-08-22 17:36:16.37');
INSERT INTO discipline VALUES ('3d459c75-be07-41dc-8c92-227d77382a79', 'Geografia', 'a92584c3-2d32-47d6-92f6-6f528d7b1881', '2024-08-22 17:36:16.371', NULL, '2024-08-22 17:36:16.371');


--
-- TOC entry 3972 (class 0 OID 18919)
-- Dependencies: 287
-- Data for Name: Grade; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO grade VALUES ('416e8076-f399-4d46-a5fc-958d990ec94b', 41, '2024-08-22 17:36:16.443', '391efcb9-7af2-46f4-a8c4-efb0b82bf301', '87a261f8-80f0-4dc1-aae4-e193f0f7cd99', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('bc273a4e-d8af-43ba-b143-9a7562d1fd28', 4, '2024-08-22 17:36:16.443', '4a7ba6cd-7090-46d2-8ddc-84c5700d44c1', '87a261f8-80f0-4dc1-aae4-e193f0f7cd99', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('32035ac7-33e2-4987-b24f-e9909ce4855c', 84, '2024-08-22 17:36:16.443', '28a46ec9-919b-4205-8465-b498aa78ee60', '3d459c75-be07-41dc-8c92-227d77382a79', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('0ef769a8-1eab-4202-a7ec-00d7190e27c4', 72, '2024-08-22 17:36:16.443', 'bb5d2119-5a82-4d98-beca-8ee69893eeda', '4967f739-7fa4-447a-84e1-958b2ae38a9d', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('25f85047-a60c-4e41-bbbf-8d20efc55cdd', 54, '2024-08-22 17:36:16.443', 'd1c5f329-ae31-46c9-ad76-07a8861eb688', 'c05787aa-0758-40c9-8e5b-a37648adebbd', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('c632ac17-42b9-4c25-9364-7dc44671607e', 44, '2024-08-22 17:36:16.443', 'f29361bc-9d97-4704-86e0-59bd6b434eed', '3d459c75-be07-41dc-8c92-227d77382a79', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('54743646-4a50-4f87-9ea7-b92e08016056', 22, '2024-08-22 17:36:16.443', 'dc53c8c2-c606-4dd5-baea-65c4034bdac8', '87a261f8-80f0-4dc1-aae4-e193f0f7cd99', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('b7aed53b-ed87-49d8-9bc7-afa6d3240265', 66, '2024-08-22 17:36:16.443', '27c3ede5-4f12-46de-a52d-ad8d060f8c1b', 'f8f5869a-c1d8-47e7-9546-51a5be89f251', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('dc2ad0ba-ef0c-422b-b5b6-6fdc3c04a699', 59, '2024-08-22 17:36:16.443', '0be461dd-4b3a-4b56-8915-e29609f0da2a', '013818b5-1aa3-4f57-83dc-248d908ab896', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('e06acb7c-e542-4fd2-bd20-99f65b7f7432', 15, '2024-08-22 17:36:16.443', '2afad23e-fd99-469a-9b4e-9e9fd9d468bf', '4967f739-7fa4-447a-84e1-958b2ae38a9d', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('7fb83ba2-aac8-445a-add9-f1d2f9facebd', 91, '2024-08-22 17:36:16.443', 'e9fd9c88-76bb-464d-954c-0e246fcf1734', '4967f739-7fa4-447a-84e1-958b2ae38a9d', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');
INSERT INTO grade VALUES ('25f2c6bd-377b-47fc-8e12-788f1563e4d3', 17, '2024-08-22 17:36:16.443', '8397997c-b6a6-4abb-96e8-e7a945b9898b', '408a0df8-4004-4803-ad0b-0d75f849333c', '2024-08-22 17:36:16.445', NULL, '2024-08-22 17:36:16.445');


--
-- TOC entry 3961 (class 0 OID 18841)
-- Dependencies: 276
-- Data for Name: Institution; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO institution VALUES ('08538d30-6faf-4339-b8e2-577c707182fb', 'Instituição Educacional Alfa', 'Rua Principal, 123', 'Cidade Alfa', 'Estado Alfa', '12345-678', '(11) 1234-5678', 'alpha@eduprime.chat', '2024-08-22 17:36:16.3', NULL, '2024-08-22 17:36:16.3', 1);


--
-- TOC entry 3962 (class 0 OID 18848)
-- Dependencies: 277
-- Data for Name: School; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO school VALUES ('5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', 'Escola Fundamental Alfa', 'Avenida Secundária, 456', 'Cidade Alfa', 'Estado Alfa', '12345-678', '(11) 8765-4321', '08538d30-6faf-4339-b8e2-577c707182fb', '2024-08-22 17:36:16.309', NULL, true, 'EFA', '-46.6333', '-23.5505', '5000', '3000', '2000', 'EFA', false, 1, 3, 1, 'https://example.com/logo1.png', 1, '1d3e4567-e89b-12d3-a456-426614174001', 'Principal', 'Urban', 1, 12345678, 'Decreto 1234', 2, 1, 1, 10000, true, true, true, true, true, false, true, false, true, true, true, true, false, false, true, true, true, false, true, true, false, true, true, true, false, false, false, true, true, '2024-08-22 17:36:16.309');
INSERT INTO school VALUES ('c68a893a-2cec-4738-8476-abe80ac63d11', 'Colégio Beta', 'Rua Terciária, 789', 'Cidade Beta', 'Estado Beta', '98765-432', '(21) 2345-6789', '08538d30-6faf-4339-b8e2-577c707182fb', '2024-08-22 17:36:16.314', NULL, true, 'CB', '-43.2075', '-22.9028', '7000', '4500', '2500', 'CB', true, 1, 3, 1, 'https://example.com/logo2.png', 1, '1d3e4567-e89b-12d3-a456-426614174002', 'Principal', 'Urban', 1, 87654321, 'Decreto 5678', 3, 2, 2, 15000, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, '2024-08-22 17:36:16.314');


--
-- TOC entry 3964 (class 0 OID 18864)
-- Dependencies: 279
-- Data for Name: Series; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO series VALUES ('7082a1bd-004e-4cfc-b2e9-05f2aba7c8b7', '1º Ano', 'e414b152-1e07-4ce4-b19c-8af7537106be', NULL, '2024-08-22 17:36:16.321', NULL, '2024-08-22 17:36:16.321');
INSERT INTO series VALUES ('2fc0ed7a-7770-4a05-82b5-383c1718e1f4', '2º Ano', '9024463f-a510-40df-aa12-5482ef80463d', NULL, '2024-08-22 17:36:16.323', NULL, '2024-08-22 17:36:16.323');
INSERT INTO series VALUES ('4be1e9de-5831-43a2-a694-a46233c969ff', '1º Ano', '5ef56102-4df5-4937-a5e1-29dec687ade1', NULL, '2024-08-22 17:36:16.354', NULL, '2024-08-22 17:36:16.354');
INSERT INTO series VALUES ('4f59aa6f-3077-4b77-9b86-cb82d99dd91a', '2º Ano', '0597d637-4220-4655-b50d-56c342ceb325', NULL, '2024-08-22 17:36:16.355', NULL, '2024-08-22 17:36:16.355');


--
-- TOC entry 3966 (class 0 OID 18879)
-- Dependencies: 281
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO student VALUES ('391efcb9-7af2-46f4-a8c4-efb0b82bf301', 'Ana Silva', 'ana.silva@example.com', NULL, 'ef40a6bd-915a-4ee2-94ee-08144a028727', '2024-08-22 17:36:16.331', NULL, '2024-08-22 17:36:16.331');
INSERT INTO student VALUES ('4a7ba6cd-7090-46d2-8ddc-84c5700d44c1', 'Bruno Souza', 'bruno.souza@example.com', NULL, 'ef40a6bd-915a-4ee2-94ee-08144a028727', '2024-08-22 17:36:16.331', NULL, '2024-08-22 17:36:16.331');
INSERT INTO student VALUES ('28a46ec9-919b-4205-8465-b498aa78ee60', 'Carla Mendes', 'carla.mendes@example.com', NULL, 'a96e7935-678d-414b-ad47-f30a1c793705', '2024-08-22 17:36:16.331', NULL, '2024-08-22 17:36:16.331');
INSERT INTO student VALUES ('bb5d2119-5a82-4d98-beca-8ee69893eeda', 'Daniel Oliveira', 'daniel.oliveira@example.com', NULL, 'a96e7935-678d-414b-ad47-f30a1c793705', '2024-08-22 17:36:16.331', NULL, '2024-08-22 17:36:16.331');
INSERT INTO student VALUES ('d1c5f329-ae31-46c9-ad76-07a8861eb688', 'Elaine Costa', 'elaine.costa@example.com', NULL, 'aade83c7-95dd-4765-827c-dedd00e4e761', '2024-08-22 17:36:16.331', NULL, '2024-08-22 17:36:16.331');
INSERT INTO student VALUES ('f29361bc-9d97-4704-86e0-59bd6b434eed', 'Felipe Lima', 'felipe.lima@example.com', NULL, 'aade83c7-95dd-4765-827c-dedd00e4e761', '2024-08-22 17:36:16.331', NULL, '2024-08-22 17:36:16.331');
INSERT INTO student VALUES ('dc53c8c2-c606-4dd5-baea-65c4034bdac8', 'Ana Silva', 'ana.silva@example.com', NULL, '9c74990d-62ed-4954-8b12-33a9b68ae5bd', '2024-08-22 17:36:16.36', NULL, '2024-08-22 17:36:16.36');
INSERT INTO student VALUES ('27c3ede5-4f12-46de-a52d-ad8d060f8c1b', 'Bruno Souza', 'bruno.souza@example.com', NULL, '9c74990d-62ed-4954-8b12-33a9b68ae5bd', '2024-08-22 17:36:16.36', NULL, '2024-08-22 17:36:16.36');
INSERT INTO student VALUES ('0be461dd-4b3a-4b56-8915-e29609f0da2a', 'Carla Mendes', 'carla.mendes@example.com', NULL, 'c714b1e9-9d78-41a3-9b32-b89574df5bfd', '2024-08-22 17:36:16.36', NULL, '2024-08-22 17:36:16.36');
INSERT INTO student VALUES ('2afad23e-fd99-469a-9b4e-9e9fd9d468bf', 'Daniel Oliveira', 'daniel.oliveira@example.com', NULL, 'c714b1e9-9d78-41a3-9b32-b89574df5bfd', '2024-08-22 17:36:16.36', NULL, '2024-08-22 17:36:16.36');
INSERT INTO student VALUES ('e9fd9c88-76bb-464d-954c-0e246fcf1734', 'Elaine Costa', 'elaine.costa@example.com', NULL, 'fa8e0302-e5b9-4e7a-b31f-97c82fc14ad8', '2024-08-22 17:36:16.36', NULL, '2024-08-22 17:36:16.36');
INSERT INTO student VALUES ('8397997c-b6a6-4abb-96e8-e7a945b9898b', 'Felipe Lima', 'felipe.lima@example.com', NULL, 'fa8e0302-e5b9-4e7a-b31f-97c82fc14ad8', '2024-08-22 17:36:16.36', NULL, '2024-08-22 17:36:16.36');


--
-- TOC entry 3967 (class 0 OID 18886)
-- Dependencies: 282
-- Data for Name: Teacher; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO teacher VALUES ('e7a51974-8bfc-4aa1-b1a8-feffce06ab7a', 'Prof. João Pereira', 'joao.pereira@example.com', NULL, '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.336', NULL, '2024-08-22 17:36:16.336');
INSERT INTO teacher VALUES ('a9607eba-b10f-40fe-a3af-69b446b6a664', 'Profª. Maria Fernandes', 'maria.fernandes@example.com', NULL, '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.338', NULL, '2024-08-22 17:36:16.338');
INSERT INTO teacher VALUES ('b465610b-b9fd-421e-a08a-6154650418fc', 'Prof. Paulo Santos', 'paulo.santos@example.com', NULL, 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.339', NULL, '2024-08-22 17:36:16.339');
INSERT INTO teacher VALUES ('72118dc4-e0bb-43a7-8c75-0bccdd380b9a', 'Profª. Rita Oliveira', 'rita.oliveira@example.com', NULL, 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.341', NULL, '2024-08-22 17:36:16.341');
INSERT INTO teacher VALUES ('0eb341ad-7fc3-4466-aa89-bc1180971024', 'Prof. João Pereira', 'joao.pereira@example.com', NULL, '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.362', NULL, '2024-08-22 17:36:16.362');
INSERT INTO teacher VALUES ('a2ad98e4-1ee7-4ada-9e91-dcfe103b0b55', 'Profª. Maria Fernandes', 'maria.fernandes@example.com', NULL, '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.364', NULL, '2024-08-22 17:36:16.364');
INSERT INTO teacher VALUES ('8d4a1df3-e23e-49f0-be09-7540da1ba91b', 'Prof. Paulo Santos', 'paulo.santos@example.com', NULL, 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.365', NULL, '2024-08-22 17:36:16.365');
INSERT INTO teacher VALUES ('a92584c3-2d32-47d6-92f6-6f528d7b1881', 'Profª. Rita Oliveira', 'rita.oliveira@example.com', NULL, 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.366', NULL, '2024-08-22 17:36:16.366');


--
-- TOC entry 3969 (class 0 OID 18900)
-- Dependencies: 284
-- Data for Name: Timetable; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO timetable VALUES ('0df8a75d-bec5-47f3-b149-9c4fa5e93b21', 'Horário da Turma A', 'ef40a6bd-915a-4ee2-94ee-08144a028727', NULL, '2024-08-22 17:36:16.361', NULL, '2024-08-22 17:36:16.361');
INSERT INTO timetable VALUES ('78a4499b-c744-4bf1-8c7d-21c307767c58', 'Horário da Turma B', 'a96e7935-678d-414b-ad47-f30a1c793705', NULL, '2024-08-22 17:36:16.37', NULL, '2024-08-22 17:36:16.37');
INSERT INTO timetable VALUES ('9092baa1-58e4-4a55-90ef-9bb55c6e4631', 'Horário da Turma A', '9c74990d-62ed-4954-8b12-33a9b68ae5bd', NULL, '2024-08-22 17:36:16.372', NULL, '2024-08-22 17:36:16.372');
INSERT INTO timetable VALUES ('ac65a727-b4de-496f-b4e8-12774626eb39', 'Horário da Turma C', 'aade83c7-95dd-4765-827c-dedd00e4e761', NULL, '2024-08-22 17:36:16.375', NULL, '2024-08-22 17:36:16.375');
INSERT INTO timetable VALUES ('1b001345-d4d1-4cf1-8f0a-f5a8afb04fe7', 'Horário da Turma B', 'c714b1e9-9d78-41a3-9b32-b89574df5bfd', NULL, '2024-08-22 17:36:16.38', NULL, '2024-08-22 17:36:16.38');
INSERT INTO timetable VALUES ('647b4415-3452-480e-ba5b-7356754e8f08', 'Horário da Turma C', 'fa8e0302-e5b9-4e7a-b31f-97c82fc14ad8', NULL, '2024-08-22 17:36:16.407', NULL, '2024-08-22 17:36:16.407');


--
-- TOC entry 3973 (class 0 OID 18924)
-- Dependencies: 288
-- Data for Name: timetable_school; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO timetable_school VALUES ('0df8a75d-bec5-47f3-b149-9c4fa5e93b21', '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('0df8a75d-bec5-47f3-b149-9c4fa5e93b21', 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('78a4499b-c744-4bf1-8c7d-21c307767c58', '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('78a4499b-c744-4bf1-8c7d-21c307767c58', 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('9092baa1-58e4-4a55-90ef-9bb55c6e4631', '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('9092baa1-58e4-4a55-90ef-9bb55c6e4631', 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('ac65a727-b4de-496f-b4e8-12774626eb39', '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('ac65a727-b4de-496f-b4e8-12774626eb39', 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('1b001345-d4d1-4cf1-8f0a-f5a8afb04fe7', '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('1b001345-d4d1-4cf1-8f0a-f5a8afb04fe7', 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('647b4415-3452-480e-ba5b-7356754e8f08', '5cdf1697-9914-4d99-8bb2-7e3a3bb01e92', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');
INSERT INTO timetable_school VALUES ('647b4415-3452-480e-ba5b-7356754e8f08', 'c68a893a-2cec-4738-8476-abe80ac63d11', '2024-08-22 17:36:16.449', NULL, '2024-08-22 17:36:16.449');


--
-- TOC entry 3974 (class 0 OID 18929)
-- Dependencies: 289
-- Data for Name: _TeacherToTimetable; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO _teachertotimetable VALUES ('e7a51974-8bfc-4aa1-b1a8-feffce06ab7a', '0df8a75d-bec5-47f3-b149-9c4fa5e93b21');
INSERT INTO _teachertotimetable VALUES ('a9607eba-b10f-40fe-a3af-69b446b6a664', '0df8a75d-bec5-47f3-b149-9c4fa5e93b21');
INSERT INTO _teachertotimetable VALUES ('e7a51974-8bfc-4aa1-b1a8-feffce06ab7a', '78a4499b-c744-4bf1-8c7d-21c307767c58');
INSERT INTO _teachertotimetable VALUES ('a9607eba-b10f-40fe-a3af-69b446b6a664', '78a4499b-c744-4bf1-8c7d-21c307767c58');
INSERT INTO _teachertotimetable VALUES ('0eb341ad-7fc3-4466-aa89-bc1180971024', '9092baa1-58e4-4a55-90ef-9bb55c6e4631');
INSERT INTO _teachertotimetable VALUES ('a2ad98e4-1ee7-4ada-9e91-dcfe103b0b55', '9092baa1-58e4-4a55-90ef-9bb55c6e4631');
INSERT INTO _teachertotimetable VALUES ('b465610b-b9fd-421e-a08a-6154650418fc', 'ac65a727-b4de-496f-b4e8-12774626eb39');
INSERT INTO _teachertotimetable VALUES ('72118dc4-e0bb-43a7-8c75-0bccdd380b9a', 'ac65a727-b4de-496f-b4e8-12774626eb39');
INSERT INTO _teachertotimetable VALUES ('0eb341ad-7fc3-4466-aa89-bc1180971024', '1b001345-d4d1-4cf1-8f0a-f5a8afb04fe7');
INSERT INTO _teachertotimetable VALUES ('a2ad98e4-1ee7-4ada-9e91-dcfe103b0b55', '1b001345-d4d1-4cf1-8f0a-f5a8afb04fe7');
INSERT INTO _teachertotimetable VALUES ('8d4a1df3-e23e-49f0-be09-7540da1ba91b', '647b4415-3452-480e-ba5b-7356754e8f08');
INSERT INTO _teachertotimetable VALUES ('a92584c3-2d32-47d6-92f6-6f528d7b1881', '647b4415-3452-480e-ba5b-7356754e8f08');


--
-- TOC entry 3778 (class 2606 OID 18918)
-- Name: Attendance Attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- TOC entry 3776 (class 2606 OID 18913)
-- Name: class_session ClassSession_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY class_session
    ADD CONSTRAINT classsession_pkey PRIMARY KEY (id);


--
-- TOC entry 3766 (class 2606 OID 18878)
-- Name: Classroom Classroom_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY classroom
    ADD CONSTRAINT classroom_pkey PRIMARY KEY (id);


--
-- TOC entry 3762 (class 2606 OID 18863)
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);


--
-- TOC entry 3772 (class 2606 OID 18899)
-- Name: Discipline Discipline_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY discipline
    ADD CONSTRAINT discipline_pkey PRIMARY KEY (id);


--
-- TOC entry 3780 (class 2606 OID 18923)
-- Name: Grade Grade_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY grade
    ADD CONSTRAINT grade_pkey PRIMARY KEY (id);


--
-- TOC entry 3757 (class 2606 OID 18847)
-- Name: Institution Institution_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY institution
    ADD CONSTRAINT institution_pkey PRIMARY KEY (id);


--
-- TOC entry 3760 (class 2606 OID 18856)
-- Name: School School_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY school
    ADD CONSTRAINT school_pkey PRIMARY KEY (id);


--
-- TOC entry 3764 (class 2606 OID 18870)
-- Name: Series Series_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY series
    ADD CONSTRAINT series_pkey PRIMARY KEY (id);


--
-- TOC entry 3768 (class 2606 OID 18885)
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY student
    ADD CONSTRAINT student_pkey PRIMARY KEY (id);


--
-- TOC entry 3770 (class 2606 OID 18892)
-- Name: Teacher Teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (id);


--
-- TOC entry 3782 (class 2606 OID 18928)
-- Name: timetable_school TimetableSchool_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable_school
    ADD CONSTRAINT timetableschool_pkey PRIMARY KEY (timetableid, schoolid);


--
-- TOC entry 3774 (class 2606 OID 18906)
-- Name: Timetable Timetable_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable
    ADD CONSTRAINT timetable_pkey PRIMARY KEY (id);

--
-- TOC entry 3758 (class 1259 OID 19042)
-- Name: Institution_singleton_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX institution_singleton_key ON institution USING btree (singleton);


--
-- TOC entry 3783 (class 1259 OID 18932)
-- Name: _TeacherToTimetable_AB_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _teachertotimetable_ab_unique ON _teachertotimetable USING btree (a, b);


--
-- TOC entry 3784 (class 1259 OID 18933)
-- Name: _TeacherToTimetable_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _teachertotimetable_b_index ON _teachertotimetable USING btree (b);


--
-- TOC entry 3797 (class 2606 OID 18994)
-- Name: Attendance Attendance_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_studentid_fkey FOREIGN KEY (studentid) REFERENCES student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3795 (class 2606 OID 18984)
-- Name: class_session ClassSession_disciplineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY class_session
    ADD CONSTRAINT classsession_disciplineid_fkey FOREIGN KEY (disciplineid) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3796 (class 2606 OID 18989)
-- Name: class_session ClassSession_timetableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY class_session
    ADD CONSTRAINT classsession_timetableid_fkey FOREIGN KEY (timetableid) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3789 (class 2606 OID 18954)
-- Name: Classroom Classroom_seriesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY classroom
    ADD CONSTRAINT classroom_seriesid_fkey FOREIGN KEY (seriesid) REFERENCES series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3786 (class 2606 OID 18939)
-- Name: Course Course_schoolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY course
    ADD CONSTRAINT course_schoolid_fkey FOREIGN KEY (schoolid) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3792 (class 2606 OID 18969)
-- Name: Discipline Discipline_teacherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY discipline
    ADD CONSTRAINT discipline_teacherid_fkey FOREIGN KEY (teacherid) REFERENCES teacher(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3798 (class 2606 OID 19004)
-- Name: Grade Grade_disciplineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY grade
    ADD CONSTRAINT grade_disciplineid_fkey FOREIGN KEY (disciplineid) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3799 (class 2606 OID 18999)
-- Name: Grade Grade_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY grade
    ADD CONSTRAINT grade_studentid_fkey FOREIGN KEY (studentid) REFERENCES student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3785 (class 2606 OID 18934)
-- Name: School School_institutionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY school
    ADD CONSTRAINT school_institutionid_fkey FOREIGN KEY (institutionid) REFERENCES institution(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3787 (class 2606 OID 18944)
-- Name: Series Series_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY series
    ADD CONSTRAINT series_courseid_fkey FOREIGN KEY (courseid) REFERENCES course(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3788 (class 2606 OID 18949)
-- Name: Series Series_timetableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY series
    ADD CONSTRAINT series_timetableid_fkey FOREIGN KEY (timetableid) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3790 (class 2606 OID 18959)
-- Name: Student Student_classroomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY student
    ADD CONSTRAINT student_classroomid_fkey FOREIGN KEY (classroomid) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3791 (class 2606 OID 18964)
-- Name: Teacher Teacher_schoolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY teacher
    ADD CONSTRAINT teacher_schoolid_fkey FOREIGN KEY (schoolid) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3800 (class 2606 OID 19014)
-- Name: timetable_school TimetableSchool_schoolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable_school
    ADD CONSTRAINT timetableschool_schoolid_fkey FOREIGN KEY (schoolid) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3801 (class 2606 OID 19009)
-- Name: timetable_school TimetableSchool_timetableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable_school
    ADD CONSTRAINT timetableschool_timetableid_fkey FOREIGN KEY (timetableid) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3793 (class 2606 OID 18974)
-- Name: Timetable Timetable_classroomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable
    ADD CONSTRAINT timetable_classroomid_fkey FOREIGN KEY (classroomid) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3794 (class 2606 OID 18979)
-- Name: Timetable Timetable_disciplineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timetable
    ADD CONSTRAINT timetable_disciplineid_fkey FOREIGN KEY (disciplineid) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3802 (class 2606 OID 19019)
-- Name: _TeacherToTimetable _TeacherToTimetable_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY _teachertotimetable
    ADD CONSTRAINT _teachertotimetable_a_fkey FOREIGN KEY (a) REFERENCES teacher(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3803 (class 2606 OID 19024)
-- Name: _TeacherToTimetable _TeacherToTimetable_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY _teachertotimetable
    ADD CONSTRAINT _teachertotimetable_b_fkey FOREIGN KEY (b) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-08-22 14:37:41

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
