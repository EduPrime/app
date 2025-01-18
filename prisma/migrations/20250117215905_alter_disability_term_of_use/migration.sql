/*
  Warnings:

  - You are about to drop the column `defficiency` on the `servers` table. All the data in the column will be lost.
  - You are about to drop the `academic_year` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `academic_year_template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `institutionsettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `school_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `server_allocations` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "disabilityType" AS ENUM ('TRANSTORNO_DO_ESPECTRO_AUTISTA', 'TRANSTORNO_DESINTEGRATIVO_DA_INFANCIA_PSICOSE_INFANTIL', 'TDAH', 'SINDROME_DE_RETT', 'SINDROME_DE_ASPERGER', 'SURDOCEGUEIRA', 'SURDEZ', 'DEFICIENCIA_MULTIPLA', 'DEFICIENCIA_MENTAL', 'DEFICIENCIA_INTELECTUAL', 'DEFICIENCIA_FISICA', 'DEFICIENCIA_AUDITIVA', 'CEGUEIRA', 'BAIXA_VISAO', 'AUTISMO_CLASSICO', 'ALTAS_HABILIDADES_SUPERDOTACAO');

-- DropForeignKey
ALTER TABLE "institutionsettings" DROP CONSTRAINT "institutionsettings_institutionid_fkey";

-- DropForeignKey
ALTER TABLE "school_settings" DROP CONSTRAINT "school_settings_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "school_settings" DROP CONSTRAINT "school_settings_school_id_fkey";

-- DropForeignKey
ALTER TABLE "server_allocations" DROP CONSTRAINT "fk_school";

-- DropForeignKey
ALTER TABLE "server_allocations" DROP CONSTRAINT "fk_server";

-- AlterTable
ALTER TABLE "servers" DROP COLUMN "defficiency",
ADD COLUMN     "disability" "disabilityType";

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "disability" "disabilityType";

-- DropTable
DROP TABLE "academic_year";

-- DropTable
DROP TABLE "academic_year_template";

-- DropTable
DROP TABLE "institutionsettings";

-- DropTable
DROP TABLE "school_settings";

-- DropTable
DROP TABLE "server_allocations";

-- DropEnum
DROP TYPE "defficiencyType";

-- CreateTable
CREATE TABLE "academicYear" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL,
    "templateId" UUID NOT NULL,
    "refYear" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "updatedBy" UUID,
    "tenantId" TEXT,
    "deletedAt" TIMESTAMPTZ(6),
    "userCreated" UUID,

    CONSTRAINT "academicYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academicYearTemplate" (
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
    "updatedBy" UUID,
    "tenantId" TEXT,

    CONSTRAINT "academicYearTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentAttendance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "enrollmentId" UUID NOT NULL,
    "missType" INTEGER NOT NULL,
    "schoolId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "tenantId" TEXT,

    CONSTRAINT "studentAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generalAttendance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "studentId" UUID NOT NULL,
    "numMissed" INTEGER NOT NULL,
    "stage" INTEGER NOT NULL,
    "schoolId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "tenantId" TEXT,

    CONSTRAINT "generalAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplineAttendance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "studentId" UUID NOT NULL,
    "disciplineId" UUID NOT NULL,
    "numMissed" INTEGER NOT NULL,
    "stage" INTEGER NOT NULL,
    "schoolId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "tenantId" TEXT,

    CONSTRAINT "disciplineAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generalGrade" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "studentId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "grade" DECIMAL NOT NULL,
    "roundedGrade" DECIMAL,
    "etapa" DECIMAL NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "tenantId" TEXT,

    CONSTRAINT "generalGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examGrade" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "enrollmentId" UUID NOT NULL,
    "disciplineId" UUID NOT NULL,
    "grade" DECIMAL NOT NULL,
    "stage" INTEGER NOT NULL,
    "schoolId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "tenantId" TEXT,

    CONSTRAINT "examGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplineGrade" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "studentId" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "disciplineId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "stage" INTEGER NOT NULL,
    "at1" DECIMAL NOT NULL,
    "at2" DECIMAL NOT NULL,
    "at3" DECIMAL NOT NULL,
    "at4" DECIMAL NOT NULL,
    "eval" DECIMAL NOT NULL,
    "avg" DECIMAL NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "tenantId" TEXT,

    CONSTRAINT "disciplineGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentFeedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "studentId" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "parecer" VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "tenantId" TEXT,

    CONSTRAINT "studentFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentStageFeedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "studentId" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "stage" INTEGER NOT NULL,
    "feedback" VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "tenantId" TEXT,

    CONSTRAINT "studentStageFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplineStageFeedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "studentId" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "disciplineId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "stage" INTEGER NOT NULL,
    "feedback" VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "tenantId" TEXT,

    CONSTRAINT "disciplineStageFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutionSettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "tenantId" TEXT,
    "institutionId" UUID NOT NULL,
    "dateOpening" TIMESTAMP(6),
    "dateClosing" TIMESTAMP(6),
    "schoolDays" DOUBLE PRECISION,
    "dateStart" TIMESTAMP(6),
    "dateEnd" TIMESTAMP(6),

    CONSTRAINT "institutionSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schoolSettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOpening" DATE,
    "dateClosing" DATE,
    "schoolDays" DECIMAL,
    "dateStart" DATE,
    "dateEnd" DATE,
    "institutionId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "tenantId" TEXT,
    "userCreated" UUID,
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "schoolSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serverAllocations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "serverId" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "entryDate" TIMESTAMP(6) NOT NULL,
    "exitDate" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "tenantId" TEXT,
    "userCreated" VARCHAR(255),
    "workload" DECIMAL,

    CONSTRAINT "serverAllocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "academicYearTemplate_name_key" ON "academicYearTemplate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "institutionsettings_institutionid_key" ON "institutionSettings"("institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "uq_server_allocation" ON "serverAllocations"("serverId", "schoolId", "anoLetivo");

-- AddForeignKey
ALTER TABLE "studentAttendance" ADD CONSTRAINT "faltaaluno_enrollment_id_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentAttendance" ADD CONSTRAINT "faltaaluno_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generalAttendance" ADD CONSTRAINT "faltageral_student_id_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generalAttendance" ADD CONSTRAINT "faltageral_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineAttendance" ADD CONSTRAINT "faltacc_student_id_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineAttendance" ADD CONSTRAINT "faltacc_discipline_id_fkey" FOREIGN KEY ("disciplineId") REFERENCES "discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineAttendance" ADD CONSTRAINT "faltacc_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generalGrade" ADD CONSTRAINT "notageral_student_id_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generalGrade" ADD CONSTRAINT "notageral_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examGrade" ADD CONSTRAINT "notaexame_enrollment_id_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examGrade" ADD CONSTRAINT "notaexame_discipline_id_fkey" FOREIGN KEY ("disciplineId") REFERENCES "discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examGrade" ADD CONSTRAINT "notaexame_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineGrade" ADD CONSTRAINT "notadisciplina_student_id_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineGrade" ADD CONSTRAINT "notadisciplina_discipline_id_fkey" FOREIGN KEY ("disciplineId") REFERENCES "discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineGrade" ADD CONSTRAINT "notadisciplina_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineGrade" ADD CONSTRAINT "notadisciplina_enrollment_id_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentFeedback" ADD CONSTRAINT "pareceraluno_student_id_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentFeedback" ADD CONSTRAINT "pareceraluno_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentFeedback" ADD CONSTRAINT "pareceraluno_enrollment_id_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentStageFeedback" ADD CONSTRAINT "pareceretapaaluno_student_id_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentStageFeedback" ADD CONSTRAINT "pareceretapaaluno_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentStageFeedback" ADD CONSTRAINT "pareceretapaaluno_enrollment_id_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineStageFeedback" ADD CONSTRAINT "pareceretapadisciplina_student_id_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineStageFeedback" ADD CONSTRAINT "pareceretapadisciplina_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineStageFeedback" ADD CONSTRAINT "pareceretapadisciplina_enrollment_id_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplineStageFeedback" ADD CONSTRAINT "pareceretapadisciplina_discipline_id_fkey" FOREIGN KEY ("disciplineId") REFERENCES "discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institutionSettings" ADD CONSTRAINT "institutionsettings_institutionid_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schoolSettings" ADD CONSTRAINT "school_settings_institution_id_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schoolSettings" ADD CONSTRAINT "school_settings_school_id_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "serverAllocations" ADD CONSTRAINT "fk_school" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "serverAllocations" ADD CONSTRAINT "fk_server" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
