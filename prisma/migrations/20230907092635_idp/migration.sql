/*
  Warnings:

  - You are about to drop the column `pid` on the `Part` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idp]` on the table `Part` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_partId_fkey";

-- DropIndex
DROP INDEX "Part_pid_key";

-- AlterTable
ALTER TABLE "Part" DROP COLUMN "pid";

-- CreateIndex
CREATE UNIQUE INDEX "Part_idp_key" ON "Part"("idp");

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("idp") ON DELETE RESTRICT ON UPDATE CASCADE;
