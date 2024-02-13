-- AlterEnum
ALTER TYPE "ScheduledClassStatus" ADD VALUE 'MISSED';

-- AlterTable
ALTER TABLE "driver_license_categories" ADD COLUMN     "vehicles" TEXT[];

-- AlterTable
ALTER TABLE "scheduled_classes" ADD COLUMN     "instructorId" TEXT,
ADD COLUMN     "vehicle" TEXT;

-- AddForeignKey
ALTER TABLE "scheduled_classes" ADD CONSTRAINT "scheduled_classes_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
