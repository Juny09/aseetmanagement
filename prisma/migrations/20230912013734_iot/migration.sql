/*
  Warnings:

  - You are about to drop the `IOT` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IOT" DROP CONSTRAINT "IOT_brandId_fkey";

-- DropTable
DROP TABLE "IOT";

-- CreateTable
CREATE TABLE "Iot" (
    "id" SERIAL NOT NULL,
    "devname" TEXT NOT NULL,
    "devid" TEXT NOT NULL,
    "devtype" TEXT NOT NULL,
    "deveui" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "Iot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Iot" ADD CONSTRAINT "Iot_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
