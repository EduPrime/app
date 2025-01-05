/*
  Warnings:

  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "academic_year" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "academic_year_template" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "classroom" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "course" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "discipline" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "enrollment" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "enrollmenthistory" ADD COLUMN     "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(6),
ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedAt" TIMESTAMP(6),
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "grade" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID,
ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "institution" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "institutionsettings" ADD COLUMN     "deletedAt" TIMESTAMP(6),
ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedAt" TIMESTAMP(6),
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "preenrollment" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "school" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "school_settings" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedAt" TIMESTAMP(6),
ADD COLUMN     "updatedBy" UUID,
ADD COLUMN     "userCreated" UUID,
ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "series" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "server_allocations" ADD COLUMN     "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(6),
ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedAt" TIMESTAMP(6),
ADD COLUMN     "updatedBy" UUID,
ADD COLUMN     "userCreated" VARCHAR(255);

-- AlterTable
ALTER TABLE "servers" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID,
ADD COLUMN     "userCreated" VARCHAR(255);

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;

-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "tenantId" UUID,
ADD COLUMN     "updatedBy" UUID;
