-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_partId_fkey";

-- DropIndex
DROP INDEX "Part_id_key";

-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "partId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("idp") ON DELETE RESTRICT ON UPDATE CASCADE;
