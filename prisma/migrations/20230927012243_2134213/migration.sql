/*
  Warnings:

  - Added the required column `subtype` to the `asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "asset" ADD COLUMN     "subtype" TEXT NOT NULL;
