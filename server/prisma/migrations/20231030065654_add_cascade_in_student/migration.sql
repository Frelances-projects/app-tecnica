-- DropForeignKey
ALTER TABLE "scheduled_classes" DROP CONSTRAINT "scheduled_classes_studentId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_studentId_fkey";

-- AddForeignKey
ALTER TABLE "scheduled_classes" ADD CONSTRAINT "scheduled_classes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
