/*
  Warnings:

  - You are about to drop the column `createdAt` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `brand` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "brand" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
