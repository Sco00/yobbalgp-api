import { PrismaClient, AddressType, Frequency, PackageState } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...')

  // ─── PersonTypes ──────────────────────────────────────────────────────────
  const [ptSimple, ptCommercial, ptEtudiant, ptRelais, ptPartner] = await Promise.all([
    prisma.personType.upsert({
      where: { name: 'simple' },
      update: {},
      create: { name: 'simple', remise: 0 },
    }),
    prisma.personType.upsert({
      where: { name: 'commercial' },
      update: {},
      create: { name: 'commercial', remise: 0 },
    }),
    prisma.personType.upsert({
      where: { name: 'etudiant' },
      update: {},
      create: { name: 'etudiant', remise: 10 },
    }),
    prisma.personType.upsert({
      where: { name: 'relais' },
      update: {},
      create: { name: 'relais', remise: 0 },
    }),
    prisma.personType.upsert({
      where: { name: 'partner' },
      update: {},
      create: { name: 'partner', remise: 0 },
    }),
  ])
  console.log('✅ PersonTypes créés')

  // ─── Roles ────────────────────────────────────────────────────────────────
  const [roleAdmin, roleClient] = await Promise.all([
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: { name: 'ADMIN' },
    }),
    prisma.role.upsert({
      where: { name: 'CLIENT' },
      update: {},
      create: { name: 'CLIENT' },
    }),
  ])
  console.log('✅ Roles créés')

  // ─── Currencies ───────────────────────────────────────────────────────────
  const [eur, xof, usd] = await Promise.all([
    prisma.currency.upsert({
      where: { code: 'EUR' },
      update: {},
      create: { code: 'EUR', name: 'Euro', symbol: '€' },
    }),
    prisma.currency.upsert({
      where: { code: 'XOF' },
      update: {},
      create: { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA' },
    }),
    prisma.currency.upsert({
      where: { code: 'USD' },
      update: {},
      create: { code: 'USD', name: 'Dollar américain', symbol: '$' },
    }),
  ])
  console.log('✅ Currencies créées')

  // ─── PaymentMethods ───────────────────────────────────────────────────────
  await Promise.all([
    prisma.paymentMethod.upsert({
      where: { name: 'CASH' },
      update: {},
      create: { name: 'CASH' },
    }),
    prisma.paymentMethod.upsert({
      where: { name: 'VIREMENT' },
      update: {},
      create: { name: 'VIREMENT' },
    }),
    prisma.paymentMethod.upsert({
      where: { name: 'ORANGE_MONEY' },
      update: {},
      create: { name: 'ORANGE_MONEY' },
    }),
    prisma.paymentMethod.upsert({
      where: { name: 'WAVE' },
      update: {},
      create: { name: 'WAVE' },
    }),
  ])
  console.log('✅ PaymentMethods créées')

  // ─── Addresses ────────────────────────────────────────────────────────────
  const [addrParis, addrDakar, addrMarseille, addrRelaisParis] = await Promise.all([
    prisma.address.upsert({
      where: { addressHash: 'FR-IDF-PARIS-SIMPLE' },
      update: {},
      create: {
        country: 'France',
        region: 'Île-de-France',
        city: 'Paris',
        locality: '19e arrondissement',
        type: AddressType.SIMPLE,
        latitude: 48.8566,
        longitude: 2.3522,
        addressHash: 'FR-IDF-PARIS-SIMPLE',
      },
    }),
    prisma.address.upsert({
      where: { addressHash: 'SN-DAKAR-DAKAR-SIMPLE' },
      update: {},
      create: {
        country: 'Sénégal',
        region: 'Dakar',
        city: 'Dakar',
        locality: 'Médina',
        type: AddressType.SIMPLE,
        latitude: 14.7167,
        longitude: -17.4677,
        addressHash: 'SN-DAKAR-DAKAR-SIMPLE',
      },
    }),
    prisma.address.upsert({
      where: { addressHash: 'FR-PACA-MARSEILLE-SIMPLE' },
      update: {},
      create: {
        country: 'France',
        region: 'PACA',
        city: 'Marseille',
        type: AddressType.SIMPLE,
        latitude: 43.2965,
        longitude: 5.3698,
        addressHash: 'FR-PACA-MARSEILLE-SIMPLE',
      },
    }),
    prisma.address.upsert({
      where: { addressHash: 'FR-IDF-PARIS-RELAIS' },
      update: {},
      create: {
        country: 'France',
        region: 'Île-de-France',
        city: 'Paris',
        locality: 'Château Rouge',
        type: AddressType.RELAIS,
        latitude: 48.8844,
        longitude: 2.3498,
        addressHash: 'FR-IDF-PARIS-RELAIS',
      },
    }),
  ])
  console.log('✅ Addresses créées')

  // ─── Persons ──────────────────────────────────────────────────────────────
  const [personAdmin, personGP1, personGP2, personClient1, personClient2, relayPerson] = await Promise.all([
    prisma.person.upsert({
      where: { mobile: '+33612345678' },
      update: {},
      create: {
        firstName: 'Ousmane',
        lastName: 'Diallo',
        mobile: '+33612345678',
        personTypeId: ptSimple.id,
      },
    }),
    prisma.person.upsert({
      where: { mobile: '+33698765432' },
      update: {},
      create: {
        firstName: 'Mamadou',
        lastName: 'Sarr',
        mobile: '+33698765432',
        personTypeId: ptPartner.id,
      },
    }),
    prisma.person.upsert({
      where: { mobile: '+33677889900' },
      update: {},
      create: {
        firstName: 'Aissatou',
        lastName: 'Ba',
        mobile: '+33677889900',
        personTypeId: ptPartner.id,
      },
    }),
    prisma.person.upsert({
      where: { mobile: '+33655443322' },
      update: {},
      create: {
        firstName: 'Fatou',
        lastName: 'Ndiaye',
        mobile: '+33655443322',
        personTypeId: ptEtudiant.id,
      },
    }),
    prisma.person.upsert({
      where: { mobile: '+33611223344' },
      update: {},
      create: {
        firstName: 'Ibrahim',
        lastName: 'Sow',
        mobile: '+33611223344',
        personTypeId: ptCommercial.id,
      },
    }),
    prisma.person.upsert({
      where: { mobile: '+33699001122' },
      update: {},
      create: {
        firstName: 'Mariama',
        lastName: 'Diop',
        mobile: '+33699001122',
        personTypeId: ptRelais.id,
      },
    }),
  ])
  console.log('✅ Persons créées')

  // ─── Accounts ─────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Password123!', 10)

  await Promise.all([
    prisma.account.upsert({
      where: { personId: personAdmin.id },
      update: {},
      create: {
        email: 'admin@yobbalgp.com',
        password: hashedPassword,
        personId: personAdmin.id,
        roleId: roleAdmin.id,
      },
    }),
    prisma.account.upsert({
      where: { personId: personGP1.id },
      update: {},
      create: {
        email: 'mamadou.sarr@yobbalgp.com',
        password: hashedPassword,
        personId: personGP1.id,
        roleId: roleClient.id,
      },
    }),
    prisma.account.upsert({
      where: { personId: personGP2.id },
      update: {},
      create: {
        email: 'aissatou.ba@yobbalgp.com',
        password: hashedPassword,
        personId: personGP2.id,
        roleId: roleClient.id,
      },
    }),
    prisma.account.upsert({
      where: { personId: personClient1.id },
      update: {},
      create: {
        email: 'fatou.ndiaye@yobbalgp.com',
        password: hashedPassword,
        personId: personClient1.id,
        roleId: roleClient.id,
      },
    }),
    prisma.account.upsert({
      where: { personId: personClient2.id },
      update: {},
      create: {
        email: 'ibrahim.sow@yobbalgp.com',
        password: hashedPassword,
        personId: personClient2.id,
        roleId: roleClient.id,
      },
    }),
  ])
  console.log('✅ Accounts créés — mot de passe : Password123!')

  // ─── Relay ────────────────────────────────────────────────────────────────
  const existingRelay = await prisma.relay.findFirst({ where: { name: 'Relais Château Rouge' } })
  const relay = existingRelay ?? await prisma.relay.create({
    data: {
      name: 'Relais Château Rouge',
      addressId: addrRelaisParis.id,
      personId: relayPerson.id,
    },
  })
  console.log('✅ Relay créé')

  // ─── Natures ──────────────────────────────────────────────────────────────
  const [natureVetements, natureElectro, natureAlim] = await Promise.all([
    prisma.nature.upsert({
      where: { name: 'Vêtements' },
      update: {},
      create: { name: 'Vêtements', unitPrice: 2.5 },
    }),
    prisma.nature.upsert({
      where: { name: 'Électronique' },
      update: {},
      create: { name: 'Électronique', unitPrice: 6.0 },
    }),
    prisma.nature.upsert({
      where: { name: 'Alimentaire' },
      update: {},
      create: { name: 'Alimentaire', unitPrice: 1.5 },
    }),
  ])
  console.log('✅ Natures créées')

  // ─── RoutePartners ────────────────────────────────────────────────────────
  const [existingRP1, existingRP2] = await Promise.all([
    prisma.routePartner.findFirst({ where: { personId: personGP1.id } }),
    prisma.routePartner.findFirst({ where: { personId: personGP2.id } }),
  ])

  await Promise.all([
    existingRP1 ? Promise.resolve() : prisma.routePartner.create({
      data: {
        personId: personGP1.id,
        departureAddressId: addrParis.id,
        destinationAddressId: addrDakar.id,
        frequency: Frequency.MENSUEL,
      },
    }),
    existingRP2 ? Promise.resolve() : prisma.routePartner.create({
      data: {
        personId: personGP2.id,
        departureAddressId: addrMarseille.id,
        destinationAddressId: addrDakar.id,
        frequency: Frequency.BIMENSUEL,
      },
    }),
  ])
  console.log('✅ RoutePartners créés')

  // ─── DepartureGps ─────────────────────────────────────────────────────────
  const [existingDep1, existingDep2, existingDep3, existingDep4] = await Promise.all([
    prisma.departureGp.findFirst({ where: { departureDate: new Date('2024-11-01T08:00:00Z') } }),
    prisma.departureGp.findFirst({ where: { departureDate: new Date('2025-02-15T10:00:00Z') } }),
    prisma.departureGp.findFirst({ where: { departureDate: new Date('2025-09-20T08:00:00Z') } }),
    prisma.departureGp.findFirst({ where: { departureDate: new Date('2026-04-10T08:00:00Z') } }),
  ])

  const [dep1, , dep3] = await Promise.all([
    existingDep1 ?? prisma.departureGp.create({
      data: {
        departureDate: new Date('2024-11-01T08:00:00Z'),
        deadline: new Date('2024-10-25T23:59:59Z'),
        arrivalDate: new Date('2024-11-03T14:00:00Z'),
        price: 8.0,
        priceGp: 5.0,
        currencyId: eur.id,
        departureAddressId: addrParis.id,
        destinationAddressId: addrDakar.id,
        personId: personGP1.id,
        creatorId: personAdmin.id,
        insurancePrice: 1.5,
        isClosed: true,
      },
    }),
    existingDep2 ?? prisma.departureGp.create({
      data: {
        departureDate: new Date('2025-02-15T10:00:00Z'),
        deadline: new Date('2025-02-08T23:59:59Z'),
        arrivalDate: new Date('2025-02-17T16:00:00Z'),
        price: 8.0,
        priceGp: 5.0,
        currencyId: eur.id,
        departureAddressId: addrMarseille.id,
        destinationAddressId: addrDakar.id,
        personId: personGP2.id,
        creatorId: personAdmin.id,
        isClosed: true,
      },
    }),
    existingDep3 ?? prisma.departureGp.create({
      data: {
        departureDate: new Date('2025-09-20T08:00:00Z'),
        deadline: new Date('2025-09-13T23:59:59Z'),
        arrivalDate: new Date('2025-09-22T12:00:00Z'),
        price: 9.0,
        priceGp: 6.0,
        currencyId: eur.id,
        departureAddressId: addrParis.id,
        destinationAddressId: addrDakar.id,
        personId: personGP1.id,
        creatorId: personAdmin.id,
        insurancePrice: 2.0,
        isClosed: false,
      },
    }),
    existingDep4 ?? prisma.departureGp.create({
      data: {
        departureDate: new Date('2026-04-10T08:00:00Z'),
        deadline: new Date('2026-04-03T23:59:59Z'),
        arrivalDate: new Date('2026-04-12T14:00:00Z'),
        price: 9.0,
        priceGp: 6.0,
        currencyId: eur.id,
        departureAddressId: addrParis.id,
        destinationAddressId: addrDakar.id,
        personId: personGP2.id,
        creatorId: personAdmin.id,
        isClosed: false,
      },
    }),
  ])
  console.log('✅ DepartureGps créés')

  // ─── Packages ─────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.package.upsert({
      where: { reference: 'YBL-2024-001' },
      update: {},
      create: {
        reference: 'YBL-2024-001',
        weight: 5.0,
        personId: personClient1.id,
        creatorId: personAdmin.id,
        departureGpId: dep1.id,
        natures: {
          create: [
            { natureId: natureVetements.id, quantity: 3, price: 7.5 },
            { natureId: natureAlim.id,      quantity: 2, price: 3.0 },
          ],
        },
        statuses: { create: [{ state: PackageState.LIVRE }] },
      },
    }),
    prisma.package.upsert({
      where: { reference: 'YBL-2024-002' },
      update: {},
      create: {
        reference: 'YBL-2024-002',
        weight: 3.5,
        personId: personClient2.id,
        creatorId: personAdmin.id,
        departureGpId: dep1.id,
        relayId: relay.id,
        natures: {
          create: [
            { natureId: natureElectro.id, quantity: 1, price: 6.0 },
          ],
        },
        statuses: { create: [{ state: PackageState.LIVRE }] },
      },
    }),
    prisma.package.upsert({
      where: { reference: 'YBL-2025-001' },
      update: {},
      create: {
        reference: 'YBL-2025-001',
        weight: 8.0,
        personId: personClient1.id,
        creatorId: personAdmin.id,
        departureGpId: dep3.id,
        natures: {
          create: [
            { natureId: natureVetements.id, quantity: 5, price: 12.5 },
            { natureId: natureElectro.id,   quantity: 1, price: 6.0  },
          ],
        },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }] },
      },
    }),
  ])
  console.log('✅ Packages créés')

  console.log('\n📋 Résumé des données créées :')
  console.log('   - 5 PersonTypes : simple, commercial, etudiant (remise 10%), relais, partner')
  console.log('   - 2 Roles : ADMIN, CLIENT')
  console.log('   - 3 Currencies : EUR, XOF, USD')
  console.log('   - 4 PaymentMethods : CASH, VIREMENT, ORANGE_MONEY, WAVE')
  console.log('   - 4 Addresses (3 SIMPLE, 1 RELAIS)')
  console.log('   - 6 Persons (1 admin, 2 partners/GP, 1 etudiant, 1 commercial, 1 relais)')
  console.log('   - 5 Accounts — mdp: Password123!')
  console.log('   - 1 Relay : Château Rouge')
  console.log('   - 3 Natures : Vêtements (2.5€), Électronique (6€), Alimentaire (1.5€)')
  console.log('   - 2 RoutePartners')
  console.log('   - 4 DepartureGps (2 fermés passés, 1 passé ouvert, 1 futur ouvert)')
  console.log('   - 3 Packages')
  console.log('\n✅ Seeding terminé !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
