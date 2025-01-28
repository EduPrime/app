/*
  Warnings:

  - The values [Masculino,Feminino] on the enum `genderType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Professor,Gestor,Coordenador,Diretor,Vigia] on the enum `position` will be removed. If these variants are still used in the database, this will fail.
  - The values [Urbana,Rural] on the enum `residenceZoneType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pai,Mãe,Ambos] on the enum `responsibleType` will be removed. If these variants are still used in the database, this will fail.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `situation` column on the `preenrollment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `workload` column on the `series` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `situation` on the `enrollment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `institutionId` to the `servers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "situationType" AS ENUM ('PENDENTE', 'CURSANDO', 'APROVADO', 'APROVADO_PELO_CONSELHO', 'APROVADO_COM_DEPENDENCIA', 'REPROVADO', 'TRANSFERIDO', 'ABANDONO', 'FALECIDO');

-- CreateEnum
CREATE TYPE "roleType" AS ENUM ('ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR', 'PROFESSOR', 'PUBLICO');

-- CreateEnum
CREATE TYPE "contractType" AS ENUM ('INDETERMINADO', 'CONTRATADO', 'PERMUTA', 'ESTAGIARIO', 'COMISSIONADO', 'EFETIVO');

-- CreateEnum
CREATE TYPE "defficiencyType" AS ENUM ('TRANSTORNO_DO_ESPECTRO_AUTISTA', 'TRANSTORNO_DESINTEGRATIVO_DA_INFANCIA_PSICOSE_INFANTIL', 'TDAH', 'SINDROME_DE_RETT', 'SINDROME_DE_ASPERGER', 'SURDOCEGUEIRA', 'SURDEZ', 'DEFICIENCIA_MULTIPLA', 'DEFICIENCIA_MENTAL', 'DEFICIENCIA_INTELECTUAL', 'DEFICIENCIA_FISICA', 'DEFICIENCIA_AUDITIVA', 'CEGUEIRA', 'BAIXA_VISAO', 'AUTISMO_CLASSICO', 'ALTAS_HABILIDADES_SUPERDOTACAO');

-- AlterEnum
BEGIN;
CREATE TYPE "genderType_new" AS ENUM ('MASCULINO', 'FEMININO');
ALTER TYPE "genderType" RENAME TO "genderType_old";
ALTER TYPE "genderType_new" RENAME TO "genderType";
DROP TYPE "genderType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "position_new" AS ENUM ('PROFESSOR', 'GESTOR', 'COORDENADOR', 'DIRETOR', 'VIGIA');
ALTER TYPE "position" RENAME TO "position_old";
ALTER TYPE "position_new" RENAME TO "position";
DROP TYPE "position_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "residenceZoneType_new" AS ENUM ('URBANA', 'RURAL');
ALTER TABLE "student" ALTER COLUMN "residenceZone" DROP DEFAULT;
ALTER TABLE "student" ALTER COLUMN "residenceZone" TYPE "residenceZoneType_new" USING ("residenceZone"::text::"residenceZoneType_new");
ALTER TYPE "residenceZoneType" RENAME TO "residenceZoneType_old";
ALTER TYPE "residenceZoneType_new" RENAME TO "residenceZoneType";
DROP TYPE "residenceZoneType_old";
ALTER TABLE "student" ALTER COLUMN "residenceZone" SET DEFAULT 'URBANA';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "responsibleType_new" AS ENUM ('PAI', 'MÃE', 'AMBOS');
ALTER TABLE "student" ALTER COLUMN "responsibleType" DROP DEFAULT;
ALTER TABLE "student" ALTER COLUMN "responsibleType" TYPE "responsibleType_new" USING ("responsibleType"::text::"responsibleType_new");
ALTER TYPE "responsibleType" RENAME TO "responsibleType_old";
ALTER TYPE "responsibleType_new" RENAME TO "responsibleType";
DROP TYPE "responsibleType_old";
ALTER TABLE "student" ALTER COLUMN "responsibleType" SET DEFAULT 'PAI';
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "roleType" NOT NULL DEFAULT 'PUBLICO',
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "workload" DROP NOT NULL,
ALTER COLUMN "workload" SET DATA TYPE DECIMAL;

-- AlterTable
ALTER TABLE "enrollment" DROP COLUMN "situation",
ADD COLUMN     "situation" "situationType" NOT NULL;

-- AlterTable
ALTER TABLE "preenrollment" DROP COLUMN "situation",
ADD COLUMN     "situation" "situationType";

-- AlterTable
ALTER TABLE "series" DROP COLUMN "workload",
ADD COLUMN     "workload" DECIMAL;

-- AlterTable
ALTER TABLE "server_allocations" ADD COLUMN     "workload" DECIMAL;

-- AlterTable
ALTER TABLE "servers" ADD COLUMN     "contract" "contractType" DEFAULT 'INDETERMINADO',
ADD COLUMN     "defficiency" "defficiencyType",
ADD COLUMN     "institutionId" UUID NOT NULL,
ADD COLUMN     "userId" UUID,
ALTER COLUMN "schoolId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "residenceZone" SET DEFAULT 'URBANA',
ALTER COLUMN "responsibleType" SET DEFAULT 'PAI';

-- DropEnum
DROP TYPE "gendertype";

-- DropEnum
DROP TYPE "residencezonetype";

-- DropEnum
DROP TYPE "responsibletype";

-- DropEnum
DROP TYPE "situationtype";

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "user_server_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "server_institution_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
