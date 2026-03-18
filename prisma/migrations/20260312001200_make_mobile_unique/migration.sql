/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `persons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "persons_mobile_key" ON "persons"("mobile");
