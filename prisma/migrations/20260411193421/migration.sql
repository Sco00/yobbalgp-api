-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "current_state" "PackageState" NOT NULL DEFAULT 'EN_ATTENTE';

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "accepted" SET DEFAULT true;
