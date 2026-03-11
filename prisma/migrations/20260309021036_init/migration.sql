-- CreateEnum
CREATE TYPE "PackageState" AS ENUM ('EN_ATTENTE', 'EN_TRANSIT', 'ARRIVE', 'LIVRE', 'RETOURNE');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('SIMPLE', 'RELAIS');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('HEBDOMADAIRE', 'BIMENSUEL', 'MENSUEL', 'TRIMESTRIEL', 'OCCASIONNEL');

-- CreateTable
CREATE TABLE "person_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "remise" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "mobile" TEXT,
    "person_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "locality" TEXT,
    "type" "AddressType" NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "address_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "natures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "natures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "reference" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "creator_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "relay_id" TEXT,
    "departure_gp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_natures" (
    "id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "nature_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "package_natures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_statuses" (
    "id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "state" "PackageState" NOT NULL DEFAULT 'EN_ATTENTE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "package_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departure_gps" (
    "id" TEXT NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "arrival_date" TIMESTAMP(3),
    "price" DOUBLE PRECISION NOT NULL,
    "price_gp" DOUBLE PRECISION NOT NULL,
    "currency_id" TEXT NOT NULL,
    "departure_address_id" TEXT NOT NULL,
    "destination_address_id" TEXT NOT NULL,
    "person_id" TEXT,
    "creator_id" TEXT NOT NULL,
    "insurance_price" DOUBLE PRECISION,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "departure_gps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_partners" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "departure_address_id" TEXT NOT NULL,
    "destination_address_id" TEXT NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "frequency_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_prices" (
    "id" TEXT NOT NULL,
    "departure_country" TEXT NOT NULL,
    "departure_region" TEXT NOT NULL,
    "destination_country" TEXT NOT NULL,
    "destination_region" TEXT NOT NULL,
    "base_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relays" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "relays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency_id" TEXT NOT NULL,
    "amount_xof" DOUBLE PRECISION NOT NULL,
    "exchange_rate" DOUBLE PRECISION NOT NULL,
    "payment_method_id" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "refunded" BOOLEAN NOT NULL DEFAULT false,
    "package_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "link_invoice" TEXT,
    "remise" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "remise_reason" TEXT,
    "price_relay" DOUBLE PRECISION,
    "insurance_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "person_types_name_key" ON "person_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_person_id_key" ON "accounts"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_address_hash_key" ON "addresses"("address_hash");

-- CreateIndex
CREATE UNIQUE INDEX "natures_name_key" ON "natures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "packages_reference_key" ON "packages"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "route_prices_departure_country_departure_region_destination_key" ON "route_prices"("departure_country", "departure_region", "destination_country", "destination_region");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "payment_methods_name_key" ON "payment_methods"("name");

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_person_type_id_fkey" FOREIGN KEY ("person_type_id") REFERENCES "person_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_relay_id_fkey" FOREIGN KEY ("relay_id") REFERENCES "relays"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_departure_gp_id_fkey" FOREIGN KEY ("departure_gp_id") REFERENCES "departure_gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_natures" ADD CONSTRAINT "package_natures_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_natures" ADD CONSTRAINT "package_natures_nature_id_fkey" FOREIGN KEY ("nature_id") REFERENCES "natures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_statuses" ADD CONSTRAINT "package_statuses_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departure_gps" ADD CONSTRAINT "departure_gps_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departure_gps" ADD CONSTRAINT "departure_gps_departure_address_id_fkey" FOREIGN KEY ("departure_address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departure_gps" ADD CONSTRAINT "departure_gps_destination_address_id_fkey" FOREIGN KEY ("destination_address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departure_gps" ADD CONSTRAINT "departure_gps_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departure_gps" ADD CONSTRAINT "departure_gps_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_partners" ADD CONSTRAINT "route_partners_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_partners" ADD CONSTRAINT "route_partners_departure_address_id_fkey" FOREIGN KEY ("departure_address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_partners" ADD CONSTRAINT "route_partners_destination_address_id_fkey" FOREIGN KEY ("destination_address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relays" ADD CONSTRAINT "relays_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relays" ADD CONSTRAINT "relays_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
