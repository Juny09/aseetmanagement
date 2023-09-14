/*
  Warnings:

  - Changed the type of `partId` on the `Status` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_partId_fkey";

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "partId",
ADD COLUMN     "partId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
