/*
  Warnings:

  - You are about to drop the column `partId` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `partid` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "asset" DROP CONSTRAINT "asset_partId_fkey";

-- DropForeignKey
ALTER TABLE "asset" DROP CONSTRAINT "asset_statusId_fkey";

-- AlterTable
ALTER TABLE "asset" DROP COLUMN "partId",
DROP COLUMN "statusId",
ADD COLUMN     "partid" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "status";

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_partid_fkey" FOREIGN KEY ("partid") REFERENCES "part"("idp") ON DELETE RESTRICT ON UPDATE CASCADE;
