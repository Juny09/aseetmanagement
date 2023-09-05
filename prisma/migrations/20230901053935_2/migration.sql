/*
  Warnings:

  - Changed the type of `commission` on the `Asset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "commission",
ADD COLUMN     "commission" BYTEA NOT NULL;
