/*
  Warnings:

  - You are about to drop the `_AssetPart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `partid` to the `asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AssetPart" DROP CONSTRAINT "_AssetPart_A_fkey";

-- DropForeignKey
ALTER TABLE "_AssetPart" DROP CONSTRAINT "_AssetPart_B_fkey";

-- AlterTable
ALTER TABLE "asset" ADD COLUMN     "partid" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AssetPart";

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_partid_fkey" FOREIGN KEY ("partid") REFERENCES "part"("idp") ON DELETE RESTRICT ON UPDATE CASCADE;
