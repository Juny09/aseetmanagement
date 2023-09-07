/*
  Warnings:

  - Added the required column `attach` to the `MStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimateddate` to the `MStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performby` to the `MStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MStatus" ADD COLUMN     "attach" TEXT NOT NULL,
ADD COLUMN     "estimateddate" TEXT NOT NULL,
ADD COLUMN     "performby" TEXT NOT NULL;
