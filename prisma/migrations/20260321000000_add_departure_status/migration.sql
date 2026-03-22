-- CreateEnum
CREATE TYPE "DepartureState" AS ENUM ('EN_ATTENTE', 'EN_TRANSIT', 'ARRIVE');

-- CreateTable
CREATE TABLE "departure_statuses" (
    "id" TEXT NOT NULL,
    "departure_gp_id" TEXT NOT NULL,
    "state" "DepartureState" NOT NULL DEFAULT 'EN_ATTENTE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "departure_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "departure_statuses" ADD CONSTRAINT "departure_statuses_departure_gp_id_fkey" FOREIGN KEY ("departure_gp_id") REFERENCES "departure_gps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
