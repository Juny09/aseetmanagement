/*
  Warnings:

  - You are about to drop the `MStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MStatus";

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "warrantyinfo" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "performby" TEXT NOT NULL,
    "attach" TEXT NOT NULL,
    "estimateddate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);
