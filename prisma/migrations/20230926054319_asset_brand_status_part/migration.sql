/*
  Warnings:

  - You are about to drop the column `commission` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `datasheet` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `datepurc` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `deviceassociation` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `foundation` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `generalnote` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `ide` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `install` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `ratedeffiency` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `subtype` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `partId` on the `status` table. All the data in the column will be lost.
  - You are about to drop the `brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `communi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `iot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `main` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `space` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partId` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `part` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "iot" DROP CONSTRAINT "iot_brandId_fkey";

-- DropForeignKey
ALTER TABLE "iot" DROP CONSTRAINT "iot_communiId_fkey";

-- DropForeignKey
ALTER TABLE "iot" DROP CONSTRAINT "iot_meterId_fkey";

-- DropForeignKey
ALTER TABLE "main" DROP CONSTRAINT "main_assetId_fkey";

-- DropForeignKey
ALTER TABLE "main" DROP CONSTRAINT "main_iotId_fkey";

-- DropForeignKey
ALTER TABLE "main" DROP CONSTRAINT "main_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "main" DROP CONSTRAINT "main_statusId_fkey";

-- DropForeignKey
ALTER TABLE "status" DROP CONSTRAINT "status_partId_fkey";

-- DropIndex
DROP INDEX "asset_ide_key";

-- AlterTable
ALTER TABLE "asset" DROP COLUMN "commission",
DROP COLUMN "datasheet",
DROP COLUMN "datepurc",
DROP COLUMN "deviceassociation",
DROP COLUMN "foundation",
DROP COLUMN "generalnote",
DROP COLUMN "ide",
DROP COLUMN "install",
DROP COLUMN "ratedeffiency",
DROP COLUMN "subtype",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "partId" TEXT NOT NULL,
ADD COLUMN     "statusId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "part" ADD COLUMN     "brand" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "status" DROP COLUMN "partId";

-- DropTable
DROP TABLE "brand";

-- DropTable
DROP TABLE "communi";

-- DropTable
DROP TABLE "iot";

-- DropTable
DROP TABLE "main";

-- DropTable
DROP TABLE "meter";

-- DropTable
DROP TABLE "space";

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_partId_fkey" FOREIGN KEY ("partId") REFERENCES "part"("idp") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;
