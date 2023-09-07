/*
  Warnings:

  - A unique constraint covering the columns `[pid]` on the table `Part` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pid` to the `Part` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_partId_fkey";

-- AlterTable
ALTER TABLE "Part" ADD COLUMN     "pid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "partId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Part_pid_key" ON "Part"("pid");

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;
