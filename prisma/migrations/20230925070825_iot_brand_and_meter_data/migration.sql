/*
  Warnings:

  - A unique constraint covering the columns `[meterid]` on the table `meter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `meterId` to the `iot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "iot" ADD COLUMN     "meterId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "meter_meterid_key" ON "meter"("meterid");

-- AddForeignKey
ALTER TABLE "iot" ADD CONSTRAINT "iot_meterId_fkey" FOREIGN KEY ("meterId") REFERENCES "meter"("meterid") ON DELETE RESTRICT ON UPDATE CASCADE;
