/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Part` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Part_id_key" ON "Part"("id");
