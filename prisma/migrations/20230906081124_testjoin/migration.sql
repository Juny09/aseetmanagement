/*
  Warnings:

  - Added the required column `partId` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "partId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
