/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "IOT" (
    "id" SERIAL NOT NULL,
    "devname" TEXT NOT NULL,
    "devid" TEXT NOT NULL,
    "devtype" TEXT NOT NULL,
    "deveui" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "IOT_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IOT" ADD CONSTRAINT "IOT_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
