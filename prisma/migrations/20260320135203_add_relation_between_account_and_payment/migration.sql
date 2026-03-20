-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
