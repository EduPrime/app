-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tenantId" DROP NOT NULL,
ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "academic_year" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "academic_year_template" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "classroom" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "discipline" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "enrollment" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "enrollmenthistory" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "grade" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "institution" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "institutionsettings" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "preenrollment" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "school" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "school_settings" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "series" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "server_allocations" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "servers" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "teacher" ALTER COLUMN "tenantId" SET DATA TYPE TEXT;
