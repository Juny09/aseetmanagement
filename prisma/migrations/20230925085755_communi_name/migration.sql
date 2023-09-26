/*
  Warnings:

  - You are about to drop the `communicate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "iot" DROP CONSTRAINT "iot_communiId_fkey";

-- DropTable
DROP TABLE "communicate";

-- CreateTable
CREATE TABLE "communi" (
    "id" SERIAL NOT NULL,
    "commid" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "baudrate" TEXT NOT NULL,
    "stopbit" TEXT NOT NULL,
    "parity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "communi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "communi_commid_key" ON "communi"("commid");

-- AddForeignKey
ALTER TABLE "iot" ADD CONSTRAINT "iot_communiId_fkey" FOREIGN KEY ("communiId") REFERENCES "communi"("commid") ON DELETE RESTRICT ON UPDATE CASCADE;
