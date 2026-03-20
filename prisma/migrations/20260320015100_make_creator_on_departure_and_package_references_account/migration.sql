-- DropForeignKey
ALTER TABLE "departure_gps" DROP CONSTRAINT "departure_gps_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_creator_id_fkey";

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departure_gps" ADD CONSTRAINT "departure_gps_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
