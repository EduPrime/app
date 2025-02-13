/*
  Warnings:

  - You are about to drop the column `user_created` on the `teacher` table. All the data in the column will be lost.
  - Added the required column `apiUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseModality` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseStage` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institutionId` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teachingType` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workload` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseStage` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graduate` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institutionId` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolDays` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workload` to the `series` table without a default value. This is not possible if the table is not empty.
  - Made the column `schoolId` on table `series` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apiUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "course" ADD COLUMN     "courseModality" TEXT NOT NULL,
ADD COLUMN     "courseStage" INTEGER NOT NULL,
ADD COLUMN     "graduate" TEXT,
ADD COLUMN     "institutionId" UUID NOT NULL,
ADD COLUMN     "regimeType" TEXT,
ADD COLUMN     "teachingType" TEXT NOT NULL,
ADD COLUMN     "workload" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "series" ADD COLUMN     "courseStage" TEXT NOT NULL,
ADD COLUMN     "graduate" TEXT NOT NULL,
ADD COLUMN     "institutionId" UUID NOT NULL,
ADD COLUMN     "schoolDays" TEXT NOT NULL,
ADD COLUMN     "workload" TEXT NOT NULL,
ALTER COLUMN "schoolId" SET NOT NULL;

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "placeOfBirth" VARCHAR(100);

-- AlterTable
ALTER TABLE "teacher" DROP COLUMN "user_created",
ADD COLUMN     "userCreated" UUID;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_institution_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
