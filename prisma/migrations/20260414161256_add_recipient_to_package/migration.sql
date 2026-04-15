-- AlterTable: add columns with a temporary default for existing rows
ALTER TABLE "packages"
  ADD COLUMN "recipient_name"  TEXT NOT NULL DEFAULT '',
  ADD COLUMN "recipient_phone" TEXT NOT NULL DEFAULT '';

-- Remove the defaults so new rows must always provide these values
ALTER TABLE "packages"
  ALTER COLUMN "recipient_name"  DROP DEFAULT,
  ALTER COLUMN "recipient_phone" DROP DEFAULT;
