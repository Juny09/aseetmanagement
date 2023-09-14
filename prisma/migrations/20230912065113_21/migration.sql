/*
  Warnings:

  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Iot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Part` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Iot" DROP CONSTRAINT "Iot_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_partId_fkey";

-- DropTable
DROP TABLE "Asset";

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "Iot";

-- DropTable
DROP TABLE "Part";

-- DropTable
DROP TABLE "Space";

-- DropTable
DROP TABLE "Status";

-- CreateTable
CREATE TABLE "asset" (
    "id" SERIAL NOT NULL,
    "ename" TEXT NOT NULL,
    "ide" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subtype" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "modelnum" TEXT NOT NULL,
    "serialnum" TEXT NOT NULL,
    "datepurc" TEXT NOT NULL,
    "install" TEXT NOT NULL,
    "controlsys" TEXT NOT NULL,
    "commission" TEXT NOT NULL,
    "datasheet" TEXT NOT NULL,
    "connection" TEXT NOT NULL,
    "foundation" TEXT NOT NULL,
    "mechanical" TEXT NOT NULL,
    "electrical" TEXT NOT NULL,
    "ratedeffiency" TEXT NOT NULL,
    "deviceassociation" TEXT NOT NULL,
    "generalnote" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "areasq" TEXT NOT NULL,
    "occupancy" TEXT NOT NULL,
    "spacetype" TEXT NOT NULL,
    "purposeusage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idp" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "mstatus" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "performby" TEXT NOT NULL,
    "attach" TEXT NOT NULL,
    "estimateddate" TEXT NOT NULL,
    "warrantyinfo" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "partId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bid" TEXT NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "iot" (
    "id" SERIAL NOT NULL,
    "devname" TEXT NOT NULL,
    "devid" TEXT NOT NULL,
    "devtype" TEXT NOT NULL,
    "deveui" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandId" TEXT NOT NULL,

    CONSTRAINT "iot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "part_idp_key" ON "part"("idp");

-- CreateIndex
CREATE UNIQUE INDEX "brand_bid_key" ON "brand"("bid");

-- AddForeignKey
ALTER TABLE "status" ADD CONSTRAINT "status_partId_fkey" FOREIGN KEY ("partId") REFERENCES "part"("idp") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "iot" ADD CONSTRAINT "iot_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;
