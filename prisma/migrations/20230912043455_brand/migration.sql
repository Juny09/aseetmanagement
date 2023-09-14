/*
  Warnings:

  - A unique constraint covering the columns `[bid]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bid` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Iot" DROP CONSTRAINT "Iot_brandId_fkey";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "bid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Iot" ALTER COLUMN "brandId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_bid_key" ON "Brand"("bid");

-- AddForeignKey
ALTER TABLE "Iot" ADD CONSTRAINT "Iot_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;
