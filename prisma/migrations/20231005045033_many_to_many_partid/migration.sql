/*
  Warnings:

  - You are about to drop the column `partid` on the `asset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "asset" DROP CONSTRAINT "asset_partid_fkey";

-- AlterTable
ALTER TABLE "asset" DROP COLUMN "partid";

-- CreateTable
CREATE TABLE "_AssetPart" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssetPart_AB_unique" ON "_AssetPart"("A", "B");

-- CreateIndex
CREATE INDEX "_AssetPart_B_index" ON "_AssetPart"("B");

-- AddForeignKey
ALTER TABLE "_AssetPart" ADD CONSTRAINT "_AssetPart_A_fkey" FOREIGN KEY ("A") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetPart" ADD CONSTRAINT "_AssetPart_B_fkey" FOREIGN KEY ("B") REFERENCES "part"("id") ON DELETE CASCADE ON UPDATE CASCADE;
