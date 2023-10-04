-- DropForeignKey
ALTER TABLE "asset" DROP CONSTRAINT "asset_partid_fkey";

-- AlterTable
ALTER TABLE "asset" ALTER COLUMN "partid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_partid_fkey" FOREIGN KEY ("partid") REFERENCES "part"("idp") ON DELETE RESTRICT ON UPDATE CASCADE;
