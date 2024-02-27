-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "instructorId" TEXT;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
