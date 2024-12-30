-- CreateEnum
CREATE TYPE "attendancestatus" AS ENUM ('PRESENT', 'ABSENT', 'EXCUSED');

-- CreateEnum
CREATE TYPE "dayofweek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "genderType" AS ENUM ('Masculino', 'Feminino');

-- CreateEnum
CREATE TYPE "gendertype" AS ENUM ('Masculino', 'Feminino');

-- CreateEnum
CREATE TYPE "period" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING');

-- CreateEnum
CREATE TYPE "position" AS ENUM ('Professor', 'Gestor', 'Coordenador', 'Diretor', 'Vigia');

-- CreateEnum
CREATE TYPE "residenceZoneType" AS ENUM ('Urbana', 'Rural');

-- CreateEnum
CREATE TYPE "residencezonetype" AS ENUM ('Urbana', 'Rural');

-- CreateEnum
CREATE TYPE "responsibleType" AS ENUM ('Pai', 'Mãe', 'Ambos');

-- CreateEnum
CREATE TYPE "responsibletype" AS ENUM ('Pai', 'Mãe', 'Ambos');

-- CreateEnum
CREATE TYPE "situationtype" AS ENUM ('Pendente', 'Cursando', 'Aprovado', 'Aprovado_pelo_Conselho', 'Aprovado_com_Dependencia', 'Reprovado', 'Transferido', 'Abandono', 'Falecido');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED', 'TRANSFERRED');

-- CreateTable
CREATE TABLE "academic_year" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL,
    "templateId" UUID NOT NULL,
    "refYear" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "userCreated" UUID,

    CONSTRAINT "academic_year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_year_template" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "refYear" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "stages" JSONB NOT NULL,
    "stageCount" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "userCreated" UUID,

    CONSTRAINT "academic_year_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "seriesId" UUID NOT NULL,
    "maxStudents" INTEGER NOT NULL,
    "startTime" TIMESTAMP(6),
    "startTimeInterval" TIMESTAMP(6),
    "endTimeInterval" TIMESTAMP(6),
    "endTime" TIMESTAMP(6),
    "dayofweek" "dayofweek",
    "name" VARCHAR(100) NOT NULL,
    "period" "period" DEFAULT 'MORNING',
    "status" "status" DEFAULT 'ACTIVE',
    "abbreviation" VARCHAR(100),
    "year" INTEGER NOT NULL,
    "metadata" JSONB,
    "userCreated" VARCHAR(255),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "schoolId" UUID,

    CONSTRAINT "classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "schoolId" UUID NOT NULL,
    "status" "status" DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "userCreated" VARCHAR(255),

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discipline" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "status" "status" DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "userCreated" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),
    "workload" DECIMAL,

    CONSTRAINT "discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "classroomId" UUID NOT NULL,
    "seriesId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "dateEnrollment" TIMESTAMP(6) NOT NULL,
    "observations" VARCHAR(200),
    "status" "status" DEFAULT 'ACTIVE',
    "situation" "situationtype" NOT NULL,
    "enrollmentCode" VARCHAR(100) NOT NULL,
    "institutionId" UUID,
    "preenrollmentId" UUID,

    CONSTRAINT "enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollmenthistory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "startedAt" TIMESTAMP(6) NOT NULL,
    "endedAt" TIMESTAMP(6),
    "formerClassroomId" UUID NOT NULL,
    "currentClassroomId" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,

    CONSTRAINT "enrollmenthistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "disciplineId" UUID NOT NULL,
    "value" DECIMAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "metadata" JSONB,
    "userCreated" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255),
    "city" VARCHAR(100),
    "state" CHAR(2),
    "postalCode" CHAR(10),
    "phone" VARCHAR(15),
    "email" VARCHAR(255),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "userCreated" VARCHAR(255),
    "singleton" INTEGER DEFAULT 1,

    CONSTRAINT "institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutionsettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "institutionId" UUID NOT NULL,
    "dateOpening" TIMESTAMP(6),
    "dateClosing" TIMESTAMP(6),
    "schoolDays" DOUBLE PRECISION,
    "dateStart" TIMESTAMP(6),
    "dateEnd" TIMESTAMP(6),

    CONSTRAINT "institutionsettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preenrollment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "institutionId" UUID,
    "schoolId" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "seriesId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "datePreenrollment" TIMESTAMP(6) NOT NULL,
    "observations" VARCHAR(200),
    "status" "status" DEFAULT 'ACTIVE',
    "situation" "situationtype",
    "preenrollmentcode" VARCHAR(100),

    CONSTRAINT "preenrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255),
    "city" VARCHAR(100),
    "state" CHAR(2),
    "postalCode" CHAR(10),
    "phone" VARCHAR(15),
    "institutionId" UUID NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "abbreviation" VARCHAR(255),
    "longitude" VARCHAR(255),
    "latitude" VARCHAR(255),
    "totalArea" VARCHAR(255),
    "builtArea" VARCHAR(255),
    "availableArea" VARCHAR(255),
    "acronym" VARCHAR(255),
    "blockDiaryEntries" BOOLEAN,
    "operationalStatus" INTEGER,
    "administrativeDependency" INTEGER,
    "regulation" INTEGER,
    "logoUrl" VARCHAR(255),
    "access" INTEGER,
    "managerid" UUID,
    "managerPosition" VARCHAR(255),
    "operationLocation" VARCHAR(255),
    "condition" INTEGER,
    "sharedSchooLinePCode" INTEGER,
    "creationDecree" VARCHAR(255),
    "numberOfFloors" INTEGER,
    "floorType" INTEGER,
    "energyMeter" INTEGER,
    "hasExternalArea" BOOLEAN,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "userCreated" VARCHAR(255),

    CONSTRAINT "school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_settings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOpening" DATE,
    "dateClosing" DATE,
    "schoolDays" DECIMAL,
    "dateStart" DATE,
    "dateEnd" DATE,
    "institutionId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "school_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "courseId" UUID NOT NULL,
    "timetableId" UUID,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "userCreated" VARCHAR(255),
    "schoolId" UUID,

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "server_allocations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "serverId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "entryDate" TIMESTAMP(6) NOT NULL,
    "exitDate" TIMESTAMP(6),

    CONSTRAINT "server_allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(15),
    "cpf" VARCHAR(11) NOT NULL,
    "address" VARCHAR(255),
    "position" VARCHAR(255) NOT NULL,
    "schoolId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "birthdate" TIMESTAMP(6) NOT NULL,
    "gender" CHAR(1),
    "email" VARCHAR(255),
    "phone" VARCHAR(15),
    "address" VARCHAR(255),
    "guardianName" VARCHAR(100),
    "guardianPhone" VARCHAR(15),
    "status" "status" DEFAULT 'ACTIVE',
    "photo" BYTEA,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "userCreated" VARCHAR(255),
    "schoolId" UUID,
    "postalCode" VARCHAR(100),
    "residenceZone" "residenceZoneType" DEFAULT 'Urbana',
    "numberAddress" VARCHAR(100),
    "cpf" VARCHAR(100),
    "neighborhood" VARCHAR(100),
    "city" VARCHAR(100),
    "complement" VARCHAR(100),
    "fatherName" VARCHAR(100),
    "fatherEmail" VARCHAR(100),
    "fatherCpf" VARCHAR(100),
    "fatherPhone" VARCHAR(100),
    "motherName" VARCHAR(100),
    "motherEmail" VARCHAR(100),
    "motherCpf" VARCHAR(100),
    "motherPhone" VARCHAR(100),
    "rgNumber" VARCHAR(100),
    "rgState" CHAR(2),
    "rgIssueDate" DATE,
    "rgIssuer" VARCHAR(100),
    "birthCertificate" VARCHAR(100),
    "docsType" VARCHAR(100),
    "responsibleType" "responsibleType" DEFAULT 'Pai',
    "citystate" VARCHAR,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birthdate" DATE NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(15),
    "address" VARCHAR(255),
    "qualifications" JSONB,
    "status" "status" DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "user_created" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),
    "showDetails" BOOLEAN,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "academic_year_template_name_key" ON "academic_year_template"("name");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_studentid_key" ON "enrollment"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_enrollmentcode_key" ON "enrollment"("enrollmentCode");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_preenrollmentid_key" ON "enrollment"("preenrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "institutionsettings_institutionid_key" ON "institutionsettings"("institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "preenrollment_studentid_key" ON "preenrollment"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "preenrollment_preenrollmentcode_key" ON "preenrollment"("preenrollmentcode");

-- CreateIndex
CREATE UNIQUE INDEX "uq_server_allocation" ON "server_allocations"("serverId", "schoolId", "anoLetivo");

-- CreateIndex
CREATE UNIQUE INDEX "servers_email_key" ON "servers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "servers_cpf_key" ON "servers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "student_cpf_key" ON "student"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "student_rgNumber_key" ON "student"("rgNumber");

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_seriesid_fkey" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_schoolid_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_classroomid_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_courseid_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_institutionid_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_preenrollmentid_fkey" FOREIGN KEY ("preenrollmentId") REFERENCES "preenrollment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_schoolid_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_seriesid_fkey" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_studentid_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollmenthistory" ADD CONSTRAINT "enrollmenthistory_currentclassroomid_fkey" FOREIGN KEY ("currentClassroomId") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollmenthistory" ADD CONSTRAINT "enrollmenthistory_enrollmentid_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollmenthistory" ADD CONSTRAINT "enrollmenthistory_formerclassroomid_fkey" FOREIGN KEY ("formerClassroomId") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grade" ADD CONSTRAINT "grade_discipline_id_fkey" FOREIGN KEY ("disciplineId") REFERENCES "discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade" ADD CONSTRAINT "grade_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade" ADD CONSTRAINT "grade_student_id_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institutionsettings" ADD CONSTRAINT "institutionsettings_institutionid_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "preenrollment" ADD CONSTRAINT "preenrollment_courseid_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "preenrollment" ADD CONSTRAINT "preenrollment_institutionid_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "preenrollment" ADD CONSTRAINT "preenrollment_schoolid_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "preenrollment" ADD CONSTRAINT "preenrollment_seriesid_fkey" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "preenrollment" ADD CONSTRAINT "preenrollment_studentid_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "school" ADD CONSTRAINT "school_institutionid_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "school_settings" ADD CONSTRAINT "school_settings_institution_id_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "school_settings" ADD CONSTRAINT "school_settings_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_courseid_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_schoolid_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "server_allocations" ADD CONSTRAINT "fk_school" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "server_allocations" ADD CONSTRAINT "fk_server" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_school" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
