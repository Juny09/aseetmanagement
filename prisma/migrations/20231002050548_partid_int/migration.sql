/*
  Warnings:

  - Changed the type of `partid` on the `asset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "asset" DROP CONSTRAINT "asset_partid_fkey";

-- AlterTable
ALTER TABLE "asset" DROP COLUMN "partid",
ADD COLUMN     "partid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_partid_fkey" FOREIGN KEY ("partid") REFERENCES "part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
