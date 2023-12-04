-- AlterEnum
ALTER TYPE "ScheduledClassStatus" ADD VALUE 'UNCHECKED';

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "birthDate" TEXT;
