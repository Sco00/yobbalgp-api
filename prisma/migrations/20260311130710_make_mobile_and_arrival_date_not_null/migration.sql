/*
  Warnings:

  - Made the column `arrival_date` on table `departure_gps` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mobile` on table `persons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "departure_gps" ALTER COLUMN "arrival_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "persons" ALTER COLUMN "mobile" SET NOT NULL;
