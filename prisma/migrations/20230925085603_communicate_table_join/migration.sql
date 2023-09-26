/*
  Warnings:

  - A unique constraint covering the columns `[ide]` on the table `asset` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[devid]` on the table `iot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lid]` on the table `space` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sid]` on the table `status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `communiId` to the `iot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lid` to the `space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sid` to the `status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "iot" ADD COLUMN     "communiId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "space" ADD COLUMN     "lid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "status" ADD COLUMN     "sid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "communicate" (
    "id" SERIAL NOT NULL,
    "commid" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "baudrate" TEXT NOT NULL,
    "stopbit" TEXT NOT NULL,
    "parity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "communicate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "main" (
    "id" SERIAL NOT NULL,
    "assetId" TEXT NOT NULL,
    "iotId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "main_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "communicate_commid_key" ON "communicate"("commid");

-- CreateIndex
CREATE UNIQUE INDEX "asset_ide_key" ON "asset"("ide");

-- CreateIndex
CREATE UNIQUE INDEX "iot_devid_key" ON "iot"("devid");

-- CreateIndex
CREATE UNIQUE INDEX "space_lid_key" ON "space"("lid");

-- CreateIndex
CREATE UNIQUE INDEX "status_sid_key" ON "status"("sid");

-- AddForeignKey
ALTER TABLE "iot" ADD CONSTRAINT "iot_communiId_fkey" FOREIGN KEY ("communiId") REFERENCES "communicate"("commid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "main" ADD CONSTRAINT "main_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset"("ide") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "main" ADD CONSTRAINT "main_iotId_fkey" FOREIGN KEY ("iotId") REFERENCES "iot"("devid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "main" ADD CONSTRAINT "main_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "space"("lid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "main" ADD CONSTRAINT "main_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;
