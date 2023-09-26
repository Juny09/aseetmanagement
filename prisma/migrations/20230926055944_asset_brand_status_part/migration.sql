/*
  Warnings:

  - You are about to drop the column `brand` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `electrical` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `ename` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `mechanical` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `part` table. All the data in the column will be lost.
  - Added the required column `abrand` to the `asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "asset" DROP COLUMN "brand",
DROP COLUMN "electrical",
DROP COLUMN "ename",
DROP COLUMN "mechanical",
ADD COLUMN     "abrand" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "part" DROP COLUMN "name";
