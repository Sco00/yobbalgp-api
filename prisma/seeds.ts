import { PrismaClient, AddressType, Frequency, PackageState, DepartureState } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const EUR_TO_XOF = 655.957

async function seedDepartureStatuses(
  departureId:   string,
  createdAt:     Date,   // date de création du départ → EN_ATTENTE
  departureDate: Date,   // date de départ             → EN_TRANSIT
  arrivalDate:   Date,   // date d'arrivée             → ARRIVE
): Promise<void> {
  const existing = await prisma.departureStatus.findFirst({ where: { departureGpId: departureId } })
  if (existing) return
  await prisma.departureStatus.create({ data: { departureGpId: departureId, state: DepartureState.EN_ATTENTE, createdAt } })
  await prisma.departureStatus.create({ data: { departureGpId: departureId, state: DepartureState.EN_TRANSIT, createdAt: departureDate } })
  await prisma.departureStatus.create({ data: { departureGpId: departureId, state: DepartureState.ARRIVE,     createdAt: arrivalDate } })
}

async function seedPaymentIfAbsent(packageId: string, data: {
  amount: number
  currencyId: string
  exchangeRate: number
  paymentMethodId: string
  creatorId: string
  remise?: number
  priceRelay?: number
  insurancePrice?: number
}): Promise<void> {
  const existing = await prisma.payment.findFirst({ where: { packageId } })
  if (existing) return
  await prisma.payment.create({
    data: {
      packageId,
      amount: data.amount,
      currencyId: data.currencyId,
      exchangeRate: data.exchangeRate,
      amountXof: Math.round(data.amount * data.exchangeRate * 100) / 100,
      paymentMethodId: data.paymentMethodId,
      creatorId: data.creatorId,
      remise: data.remise ?? 0,
      priceRelay: data.priceRelay,
      insurancePrice: data.insurancePrice ?? 0,
      accepted: true,
    },
  })
}

async function main() {
  console.log('🌱 Début du seeding...')

  // ─── PersonTypes ──────────────────────────────────────────────────────────
  const [ptSimple, ptCommercial, ptEtudiant, ptRelais, ptPartner] = await Promise.all([
    prisma.personType.upsert({ where: { name: 'simple' },     update: {}, create: { name: 'simple',     remise: 0  } }),
    prisma.personType.upsert({ where: { name: 'commercial' }, update: {}, create: { name: 'commercial', remise: 0  } }),
    prisma.personType.upsert({ where: { name: 'etudiant' },   update: {}, create: { name: 'etudiant',   remise: 10 } }),
    prisma.personType.upsert({ where: { name: 'relais' },     update: {}, create: { name: 'relais',     remise: 0  } }),
    prisma.personType.upsert({ where: { name: 'partner' },    update: {}, create: { name: 'partner',    remise: 0  } }),
  ])
  console.log('✅ PersonTypes créés')

  // ─── Roles ────────────────────────────────────────────────────────────────
  const [roleAdmin, roleClient] = await Promise.all([
    prisma.role.upsert({ where: { name: 'ADMIN' },  update: {}, create: { name: 'ADMIN'  } }),
    prisma.role.upsert({ where: { name: 'CLIENT' }, update: {}, create: { name: 'CLIENT' } }),
  ])
  console.log('✅ Roles créés')

  // ─── Currencies ───────────────────────────────────────────────────────────
  const [eur] = await Promise.all([
    prisma.currency.upsert({ where: { code: 'EUR' }, update: {}, create: { code: 'EUR', name: 'Euro',              symbol: '€'    } }),
    prisma.currency.upsert({ where: { code: 'XOF' }, update: {}, create: { code: 'XOF', name: 'Franc CFA',        symbol: 'FCFA' } }),
    prisma.currency.upsert({ where: { code: 'USD' }, update: {}, create: { code: 'USD', name: 'Dollar américain', symbol: '$'    } }),
  ])
  console.log('✅ Currencies créées')

  // ─── PaymentMethods ───────────────────────────────────────────────────────
  const [pmCash, pmVirement, pmOrangeMoney, pmWave] = await Promise.all([
    prisma.paymentMethod.upsert({ where: { name: 'CASH' },         update: {}, create: { name: 'CASH'         } }),
    prisma.paymentMethod.upsert({ where: { name: 'VIREMENT' },     update: {}, create: { name: 'VIREMENT'     } }),
    prisma.paymentMethod.upsert({ where: { name: 'ORANGE_MONEY' }, update: {}, create: { name: 'ORANGE_MONEY' } }),
    prisma.paymentMethod.upsert({ where: { name: 'WAVE' },         update: {}, create: { name: 'WAVE'         } }),
  ])
  console.log('✅ PaymentMethods créées')

  // ─── Addresses (principales) ──────────────────────────────────────────────
  const [addrParis, addrDakar, addrMarseille, addrRelaisParis] = await Promise.all([
    prisma.address.upsert({
      where: { addressHash: 'FR-IDF-PARIS-SIMPLE' }, update: {},
      create: { country: 'France', region: 'Île-de-France', city: 'Paris', locality: '19e arrondissement', type: AddressType.SIMPLE, latitude: 48.8566, longitude: 2.3522, addressHash: 'FR-IDF-PARIS-SIMPLE' },
    }),
    prisma.address.upsert({
      where: { addressHash: 'SN-DAKAR-DAKAR-SIMPLE' }, update: {},
      create: { country: 'Sénégal', region: 'Dakar', city: 'Dakar', locality: 'Médina', type: AddressType.SIMPLE, latitude: 14.7167, longitude: -17.4677, addressHash: 'SN-DAKAR-DAKAR-SIMPLE' },
    }),
    prisma.address.upsert({
      where: { addressHash: 'FR-PACA-MARSEILLE-SIMPLE' }, update: {},
      create: { country: 'France', region: 'PACA', city: 'Marseille', type: AddressType.SIMPLE, latitude: 43.2965, longitude: 5.3698, addressHash: 'FR-PACA-MARSEILLE-SIMPLE' },
    }),
    prisma.address.upsert({
      where: { addressHash: 'FR-IDF-PARIS-RELAIS' }, update: {},
      create: { country: 'France', region: 'Île-de-France', city: 'Paris', locality: 'Château Rouge', type: AddressType.RELAIS, latitude: 48.8844, longitude: 2.3498, addressHash: 'FR-IDF-PARIS-RELAIS' },
    }),
  ])

  // ─── Addresses (supplémentaires) ──────────────────────────────────────────
  await Promise.all([
    prisma.address.upsert({ where: { addressHash: 'FR-AURA-LYON-SIMPLE' },           update: {}, create: { country: 'France',       region: 'Auvergne-Rhône-Alpes',   city: 'Lyon',        type: AddressType.SIMPLE, latitude: 45.7640, longitude: 4.8357,   addressHash: 'FR-AURA-LYON-SIMPLE'           } }),
    prisma.address.upsert({ where: { addressHash: 'FR-OCC-TOULOUSE-SIMPLE' },        update: {}, create: { country: 'France',       region: 'Occitanie',              city: 'Toulouse',    type: AddressType.SIMPLE, latitude: 43.6047, longitude: 1.4442,   addressHash: 'FR-OCC-TOULOUSE-SIMPLE'        } }),
    prisma.address.upsert({ where: { addressHash: 'FR-NAQ-BORDEAUX-SIMPLE' },        update: {}, create: { country: 'France',       region: 'Nouvelle-Aquitaine',     city: 'Bordeaux',    type: AddressType.SIMPLE, latitude: 44.8378, longitude: -0.5792,  addressHash: 'FR-NAQ-BORDEAUX-SIMPLE'        } }),
    prisma.address.upsert({ where: { addressHash: 'FR-HDF-LILLE-SIMPLE' },           update: {}, create: { country: 'France',       region: 'Hauts-de-France',        city: 'Lille',       type: AddressType.SIMPLE, latitude: 50.6292, longitude: 3.0573,   addressHash: 'FR-HDF-LILLE-SIMPLE'           } }),
    prisma.address.upsert({ where: { addressHash: 'MA-CASABLANCA-CASABLANCA-SIMPLE'},update: {}, create: { country: 'Maroc',        region: 'Casablanca-Settat',      city: 'Casablanca',  type: AddressType.SIMPLE, latitude: 33.5731, longitude: -7.5898,  addressHash: 'MA-CASABLANCA-CASABLANCA-SIMPLE'} }),
    prisma.address.upsert({ where: { addressHash: 'CI-ABIDJAN-ABIDJAN-SIMPLE' },     update: {}, create: { country: "Côte d'Ivoire",region: 'Abidjan',               city: 'Abidjan',     type: AddressType.SIMPLE, latitude: 5.3599,  longitude: -4.0083,  addressHash: 'CI-ABIDJAN-ABIDJAN-SIMPLE'     } }),
    prisma.address.upsert({ where: { addressHash: 'ML-BAMAKO-BAMAKO-SIMPLE' },       update: {}, create: { country: 'Mali',         region: 'District de Bamako',     city: 'Bamako',      type: AddressType.SIMPLE, latitude: 12.6392, longitude: -8.0029,  addressHash: 'ML-BAMAKO-BAMAKO-SIMPLE'       } }),
    prisma.address.upsert({ where: { addressHash: 'GN-CONAKRY-CONAKRY-SIMPLE' },     update: {}, create: { country: 'Guinée',       region: 'Conakry',                city: 'Conakry',     type: AddressType.SIMPLE, latitude: 9.6412,  longitude: -13.5784, addressHash: 'GN-CONAKRY-CONAKRY-SIMPLE'     } }),
    prisma.address.upsert({ where: { addressHash: 'ES-MADRID-MADRID-SIMPLE' },       update: {}, create: { country: 'Espagne',      region: 'Communauté de Madrid',   city: 'Madrid',      type: AddressType.SIMPLE, latitude: 40.4168, longitude: -3.7038,  addressHash: 'ES-MADRID-MADRID-SIMPLE'       } }),
    prisma.address.upsert({ where: { addressHash: 'GB-LONDON-LONDON-SIMPLE' },       update: {}, create: { country: 'Royaume-Uni',  region: 'Greater London',         city: 'Londres',     type: AddressType.SIMPLE, latitude: 51.5074, longitude: -0.1278,  addressHash: 'GB-LONDON-LONDON-SIMPLE'       } }),
    prisma.address.upsert({ where: { addressHash: 'BE-BRUSSELS-BRUSSELS-SIMPLE' },   update: {}, create: { country: 'Belgique',     region: 'Bruxelles-Capitale',     city: 'Bruxelles',   type: AddressType.SIMPLE, latitude: 50.8503, longitude: 4.3517,   addressHash: 'BE-BRUSSELS-BRUSSELS-SIMPLE'   } }),
  ])
  console.log('✅ Adresses créées')

  // ─── Persons ──────────────────────────────────────────────────────────────
  const [personAdmin, personGP1, personGP2, personClient1, personClient2, personClient3, relayPerson] = await Promise.all([
    prisma.person.upsert({ where: { mobile: '+33612345678' }, update: {}, create: { firstName: 'Ousmane',  lastName: 'Diallo', mobile: '+33612345678', personTypeId: ptSimple.id    } }),
    prisma.person.upsert({ where: { mobile: '+33698765432' }, update: {}, create: { firstName: 'Mamadou',  lastName: 'Sarr',   mobile: '+33698765432', personTypeId: ptPartner.id   } }),
    prisma.person.upsert({ where: { mobile: '+33677889900' }, update: {}, create: { firstName: 'Aissatou', lastName: 'Ba',     mobile: '+33677889900', personTypeId: ptPartner.id   } }),
    prisma.person.upsert({ where: { mobile: '+33655443322' }, update: {}, create: { firstName: 'Fatou',    lastName: 'Ndiaye', mobile: '+33655443322', personTypeId: ptEtudiant.id  } }),
    prisma.person.upsert({ where: { mobile: '+33611223344' }, update: {}, create: { firstName: 'Ibrahim',  lastName: 'Sow',    mobile: '+33611223344', personTypeId: ptCommercial.id} }),
    prisma.person.upsert({ where: { mobile: '+33644556677' }, update: {}, create: { firstName: 'Aminata',  lastName: 'Camara', mobile: '+33644556677', personTypeId: ptSimple.id    } }),
    prisma.person.upsert({ where: { mobile: '+33699001122' }, update: {}, create: { firstName: 'Mariama',  lastName: 'Diop',   mobile: '+33699001122', personTypeId: ptRelais.id    } }),
  ])
  console.log('✅ Persons créées')

  // ─── Accounts ─────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Password123!', 10)

  const [accountAdmin] = await Promise.all([
    prisma.account.upsert({ where: { personId: personAdmin.id   }, update: {}, create: { email: 'admin@yobbalgp.com',           password: hashedPassword, personId: personAdmin.id,   roleId: roleAdmin.id  } }),
    prisma.account.upsert({ where: { personId: personGP1.id     }, update: {}, create: { email: 'mamadou.sarr@yobbalgp.com',    password: hashedPassword, personId: personGP1.id,     roleId: roleClient.id } }),
    prisma.account.upsert({ where: { personId: personGP2.id     }, update: {}, create: { email: 'aissatou.ba@yobbalgp.com',     password: hashedPassword, personId: personGP2.id,     roleId: roleClient.id } }),
    prisma.account.upsert({ where: { personId: personClient1.id }, update: {}, create: { email: 'fatou.ndiaye@yobbalgp.com',    password: hashedPassword, personId: personClient1.id, roleId: roleClient.id } }),
    prisma.account.upsert({ where: { personId: personClient2.id }, update: {}, create: { email: 'ibrahim.sow@yobbalgp.com',     password: hashedPassword, personId: personClient2.id, roleId: roleClient.id } }),
    prisma.account.upsert({ where: { personId: personClient3.id }, update: {}, create: { email: 'aminata.camara@yobbalgp.com',  password: hashedPassword, personId: personClient3.id, roleId: roleClient.id } }),
  ])
  console.log('✅ Accounts créés — mot de passe : Password123!')

  // ─── Relay ────────────────────────────────────────────────────────────────
  const existingRelay = await prisma.relay.findFirst({ where: { name: 'Relais Château Rouge' } })
  const relay = existingRelay ?? await prisma.relay.create({
    data: { name: 'Relais Château Rouge', addressId: addrRelaisParis.id, personId: relayPerson.id },
  })
  console.log('✅ Relay créé')

  // ─── Natures ──────────────────────────────────────────────────────────────
  const [natureVetements, natureElectro, natureAlim, natureCosmetique, natureMedicament] = await Promise.all([
    prisma.nature.upsert({ where: { name: 'Vêtements'   }, update: {}, create: { name: 'Vêtements',   unitPrice: 2.5 } }),
    prisma.nature.upsert({ where: { name: 'Électronique'}, update: {}, create: { name: 'Électronique', unitPrice: 6.0 } }),
    prisma.nature.upsert({ where: { name: 'Alimentaire' }, update: {}, create: { name: 'Alimentaire',  unitPrice: 1.5 } }),
    prisma.nature.upsert({ where: { name: 'Cosmétique'  }, update: {}, create: { name: 'Cosmétique',   unitPrice: 3.0 } }),
    prisma.nature.upsert({ where: { name: 'Médicament'  }, update: {}, create: { name: 'Médicament',   unitPrice: 4.0 } }),
  ])
  console.log('✅ Natures créées')

  // ─── RoutePrices ──────────────────────────────────────────────────────────
  type RPKey = { departureCountry: string; departureRegion: string; destinationCountry: string; destinationRegion: string }
  const rp = (k: RPKey & { basePrice: number }) =>
    prisma.routePrice.upsert({
      where: { departureCountry_departureRegion_destinationCountry_destinationRegion: { departureCountry: k.departureCountry, departureRegion: k.departureRegion, destinationCountry: k.destinationCountry, destinationRegion: k.destinationRegion } },
      update: {},
      create: k,
    })

  await Promise.all([
    rp({ departureCountry: 'France',      departureRegion: 'Île-de-France',       destinationCountry: 'Sénégal',       destinationRegion: 'Dakar',               basePrice: 8.0  }),
    rp({ departureCountry: 'France',      departureRegion: 'PACA',                destinationCountry: 'Sénégal',       destinationRegion: 'Dakar',               basePrice: 8.0  }),
    rp({ departureCountry: 'France',      departureRegion: 'Auvergne-Rhône-Alpes',destinationCountry: 'Sénégal',       destinationRegion: 'Dakar',               basePrice: 8.5  }),
    rp({ departureCountry: 'France',      departureRegion: 'Hauts-de-France',     destinationCountry: 'Sénégal',       destinationRegion: 'Dakar',               basePrice: 8.5  }),
    rp({ departureCountry: 'France',      departureRegion: 'Occitanie',           destinationCountry: 'Sénégal',       destinationRegion: 'Dakar',               basePrice: 8.5  }),
    rp({ departureCountry: 'France',      departureRegion: 'Nouvelle-Aquitaine',  destinationCountry: 'Sénégal',       destinationRegion: 'Dakar',               basePrice: 8.5  }),
    rp({ departureCountry: 'France',      departureRegion: 'Île-de-France',       destinationCountry: "Côte d'Ivoire", destinationRegion: 'Abidjan',             basePrice: 10.0 }),
    rp({ departureCountry: 'France',      departureRegion: 'Île-de-France',       destinationCountry: 'Mali',          destinationRegion: 'District de Bamako',  basePrice: 10.0 }),
    rp({ departureCountry: 'France',      departureRegion: 'Île-de-France',       destinationCountry: 'Guinée',        destinationRegion: 'Conakry',             basePrice: 10.5 }),
    rp({ departureCountry: 'Belgique',    departureRegion: 'Bruxelles-Capitale',  destinationCountry: 'Sénégal',       destinationRegion: 'Dakar',               basePrice: 9.0  }),
    rp({ departureCountry: 'Espagne',     departureRegion: 'Communauté de Madrid',destinationCountry: 'Sénégal',       destinationRegion: 'Dakar',               basePrice: 8.5  }),
    rp({ departureCountry: 'Royaume-Uni', departureRegion: 'Greater London',      destinationCountry: 'Sénégal',       destinationRegion: 'Dakar',               basePrice: 9.5  }),
  ])
  console.log('✅ RoutePrices créés')

  // ─── RoutePartners ────────────────────────────────────────────────────────
  const [existingRP1, existingRP2] = await Promise.all([
    prisma.routePartner.findFirst({ where: { personId: personGP1.id } }),
    prisma.routePartner.findFirst({ where: { personId: personGP2.id } }),
  ])
  await Promise.all([
    existingRP1 ? Promise.resolve() : prisma.routePartner.create({ data: { personId: personGP1.id, departureAddressId: addrParis.id,     destinationAddressId: addrDakar.id, frequency: Frequency.MENSUEL   } }),
    existingRP2 ? Promise.resolve() : prisma.routePartner.create({ data: { personId: personGP2.id, departureAddressId: addrMarseille.id, destinationAddressId: addrDakar.id, frequency: Frequency.BIMENSUEL } }),
  ])
  console.log('✅ RoutePartners créés')

  // ─── DepartureGps ─────────────────────────────────────────────────────────
  const [existingDep1, existingDep2, existingDep3, existingDep4] = await Promise.all([
    prisma.departureGp.findFirst({ where: { departureDate: new Date('2024-11-01T08:00:00Z') } }),
    prisma.departureGp.findFirst({ where: { departureDate: new Date('2025-02-15T10:00:00Z') } }),
    prisma.departureGp.findFirst({ where: { departureDate: new Date('2025-09-20T08:00:00Z') } }),
    prisma.departureGp.findFirst({ where: { departureDate: new Date('2026-04-10T08:00:00Z') } }),
  ])

  const [dep1, dep2, dep3, dep4] = await Promise.all([
    existingDep1 ?? prisma.departureGp.create({ data: {
      departureDate: new Date('2024-11-01T08:00:00Z'), deadline: new Date('2024-10-25T23:59:59Z'), arrivalDate: new Date('2024-11-03T14:00:00Z'),
      price: 8.0, priceGp: 5.0, currencyId: eur.id, departureAddressId: addrParis.id,     destinationAddressId: addrDakar.id,
      personId: personGP1.id, creatorId: accountAdmin.id, insurancePrice: 1.5, isClosed: true,
    }}),
    existingDep2 ?? prisma.departureGp.create({ data: {
      departureDate: new Date('2025-02-15T10:00:00Z'), deadline: new Date('2025-02-08T23:59:59Z'), arrivalDate: new Date('2025-02-17T16:00:00Z'),
      price: 8.0, priceGp: 5.0, currencyId: eur.id, departureAddressId: addrMarseille.id, destinationAddressId: addrDakar.id,
      personId: personGP2.id, creatorId: accountAdmin.id, isClosed: true,
    }}),
    existingDep3 ?? prisma.departureGp.create({ data: {
      departureDate: new Date('2025-09-20T08:00:00Z'), deadline: new Date('2025-09-13T23:59:59Z'), arrivalDate: new Date('2025-09-22T12:00:00Z'),
      price: 9.0, priceGp: 6.0, currencyId: eur.id, departureAddressId: addrParis.id,     destinationAddressId: addrDakar.id,
      personId: personGP1.id, creatorId: accountAdmin.id, insurancePrice: 2.0, isClosed: true,
    }}),
    existingDep4 ?? prisma.departureGp.create({ data: {
      departureDate: new Date('2026-04-10T08:00:00Z'), deadline: new Date('2026-04-03T23:59:59Z'), arrivalDate: new Date('2026-04-12T14:00:00Z'),
      price: 9.0, priceGp: 6.0, currencyId: eur.id, departureAddressId: addrParis.id,     destinationAddressId: addrDakar.id,
      personId: personGP2.id, creatorId: accountAdmin.id, isClosed: true,
    }}),
  ])
  console.log('✅ DepartureGps créés')

  // ─── DepartureStatuses (EN_ATTENTE → EN_TRANSIT → ARRIVE) ────────────────
  await seedDepartureStatuses(dep1.id, new Date('2024-10-20T09:00:00Z'), new Date('2024-11-01T08:00:00Z'), new Date('2024-11-03T14:00:00Z'))
  await seedDepartureStatuses(dep2.id, new Date('2025-02-01T10:00:00Z'), new Date('2025-02-15T10:00:00Z'), new Date('2025-02-17T16:00:00Z'))
  await seedDepartureStatuses(dep3.id, new Date('2025-09-08T08:00:00Z'), new Date('2025-09-20T08:00:00Z'), new Date('2025-09-22T12:00:00Z'))
  await seedDepartureStatuses(dep4.id, new Date('2026-03-28T08:00:00Z'), new Date('2026-04-10T08:00:00Z'), new Date('2026-04-12T14:00:00Z'))
  console.log('✅ DepartureStatuses créés (tous en état ARRIVE)')

  // ─── Packages ─────────────────────────────────────────────────────────────
  // dep1 (isClosed=true, ARRIVE) → LIVRE  | dep2 (isClosed=true, ARRIVE) → LIVRE
  // dep3 (isClosed=true, ARRIVE) → ARRIVE | dep4 (isClosed=true, ARRIVE) → ARRIVE

  const [pkg1, pkg2, pkg3, pkg4, pkg5, pkg6, pkg7, pkg8, pkg9] = await Promise.all([

    // ── dep1 ──
    prisma.package.upsert({
      where: { reference: 'YBL-2024-001' }, update: {},
      create: {
        reference: 'YBL-2024-001', weight: 5.0, currentState: PackageState.LIVRE, isCompleted: true,
        personId: personClient1.id, creatorId: accountAdmin.id, departureGpId: dep1.id,
        natures:  { create: [{ natureId: natureVetements.id, quantity: 3, price: 7.5 }, { natureId: natureAlim.id, quantity: 2, price: 3.0 }] },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }, { state: PackageState.EN_TRANSIT }, { state: PackageState.ARRIVE }, { state: PackageState.LIVRE }] },
      },
    }),
    prisma.package.upsert({
      where: { reference: 'YBL-2024-002' }, update: {},
      create: {
        reference: 'YBL-2024-002', weight: 3.5, currentState: PackageState.LIVRE, isCompleted: true,
        personId: personClient2.id, creatorId: accountAdmin.id, departureGpId: dep1.id, relayId: relay.id,
        natures:  { create: [{ natureId: natureElectro.id, quantity: 1, price: 6.0 }] },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }, { state: PackageState.EN_TRANSIT }, { state: PackageState.ARRIVE }, { state: PackageState.LIVRE }] },
      },
    }),

    // ── dep2 ──
    prisma.package.upsert({
      where: { reference: 'YBL-2025-001' }, update: {},
      create: {
        reference: 'YBL-2025-001', weight: 7.0, currentState: PackageState.LIVRE, isCompleted: true,
        personId: personClient3.id, creatorId: accountAdmin.id, departureGpId: dep2.id,
        natures:  { create: [{ natureId: natureCosmetique.id, quantity: 4, price: 12.0 }, { natureId: natureAlim.id, quantity: 3, price: 4.5 }] },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }, { state: PackageState.EN_TRANSIT }, { state: PackageState.ARRIVE }, { state: PackageState.LIVRE }] },
      },
    }),
    prisma.package.upsert({
      where: { reference: 'YBL-2025-002' }, update: {},
      create: {
        reference: 'YBL-2025-002', weight: 4.0, currentState: PackageState.LIVRE, isCompleted: true,
        personId: personClient1.id, creatorId: accountAdmin.id, departureGpId: dep2.id,
        natures:  { create: [{ natureId: natureVetements.id, quantity: 5, price: 12.5 }] },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }, { state: PackageState.EN_TRANSIT }, { state: PackageState.ARRIVE }, { state: PackageState.LIVRE }] },
      },
    }),

    // ── dep3 ──
    prisma.package.upsert({
      where: { reference: 'YBL-2025-003' }, update: {},
      create: {
        reference: 'YBL-2025-003', weight: 8.0, currentState: PackageState.ARRIVE,
        personId: personClient1.id, creatorId: accountAdmin.id, departureGpId: dep3.id,
        natures:  { create: [{ natureId: natureVetements.id, quantity: 5, price: 12.5 }, { natureId: natureElectro.id, quantity: 1, price: 6.0 }] },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }, { state: PackageState.EN_TRANSIT }, { state: PackageState.ARRIVE }] },
      },
    }),
    prisma.package.upsert({
      where: { reference: 'YBL-2025-004' }, update: {},
      create: {
        reference: 'YBL-2025-004', weight: 3.0, currentState: PackageState.ARRIVE,
        personId: personClient2.id, creatorId: accountAdmin.id, departureGpId: dep3.id, relayId: relay.id,
        natures:  { create: [{ natureId: natureMedicament.id, quantity: 2, price: 8.0 }] },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }, { state: PackageState.EN_TRANSIT }, { state: PackageState.ARRIVE }] },
      },
    }),

    // ── dep4 ──
    prisma.package.upsert({
      where: { reference: 'YBL-2026-001' }, update: {},
      create: {
        reference: 'YBL-2026-001', weight: 6.0, currentState: PackageState.ARRIVE,
        personId: personClient3.id, creatorId: accountAdmin.id, departureGpId: dep4.id,
        natures:  { create: [{ natureId: natureElectro.id, quantity: 2, price: 12.0 }, { natureId: natureCosmetique.id, quantity: 1, price: 3.0 }] },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }, { state: PackageState.EN_TRANSIT }, { state: PackageState.ARRIVE }] },
      },
    }),
    prisma.package.upsert({
      where: { reference: 'YBL-2026-002' }, update: {},
      create: {
        reference: 'YBL-2026-002', weight: 5.5, currentState: PackageState.ARRIVE,
        personId: personClient1.id, creatorId: accountAdmin.id, departureGpId: dep4.id,
        natures:  { create: [{ natureId: natureAlim.id, quantity: 6, price: 9.0 }, { natureId: natureVetements.id, quantity: 2, price: 5.0 }] },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }, { state: PackageState.EN_TRANSIT }, { state: PackageState.ARRIVE }] },
      },
    }),
    prisma.package.upsert({
      where: { reference: 'YBL-2026-003' }, update: {},
      create: {
        reference: 'YBL-2026-003', weight: 2.5, currentState: PackageState.ARRIVE,
        personId: personClient2.id, creatorId: accountAdmin.id, departureGpId: dep4.id, relayId: relay.id,
        natures:  { create: [{ natureId: natureMedicament.id, quantity: 1, price: 4.0 }, { natureId: natureCosmetique.id, quantity: 2, price: 6.0 }] },
        statuses: { create: [{ state: PackageState.EN_ATTENTE }, { state: PackageState.EN_TRANSIT }, { state: PackageState.ARRIVE }] },
      },
    }),
  ])
  console.log('✅ Packages créés (9 colis)')

  // ─── Payments ─────────────────────────────────────────────────────────────
  await Promise.all([
    // dep1 — LIVRE
    seedPaymentIfAbsent(pkg1.id, { amount: 10.5, currencyId: eur.id, exchangeRate: EUR_TO_XOF, paymentMethodId: pmCash.id,         creatorId: accountAdmin.id, insurancePrice: 1.5 }),
    seedPaymentIfAbsent(pkg2.id, { amount:  6.0, currencyId: eur.id, exchangeRate: EUR_TO_XOF, paymentMethodId: pmWave.id,         creatorId: accountAdmin.id, priceRelay: 2.0     }),
    // dep2 — LIVRE
    seedPaymentIfAbsent(pkg3.id, { amount: 16.5, currencyId: eur.id, exchangeRate: EUR_TO_XOF, paymentMethodId: pmOrangeMoney.id,  creatorId: accountAdmin.id                      }),
    seedPaymentIfAbsent(pkg4.id, { amount: 12.5, currencyId: eur.id, exchangeRate: EUR_TO_XOF, paymentMethodId: pmVirement.id,     creatorId: accountAdmin.id, remise: 10.0        }),
    // dep3 — ARRIVE
    seedPaymentIfAbsent(pkg5.id, { amount: 18.5, currencyId: eur.id, exchangeRate: EUR_TO_XOF, paymentMethodId: pmCash.id,         creatorId: accountAdmin.id, insurancePrice: 2.0 }),
    seedPaymentIfAbsent(pkg6.id, { amount:  8.0, currencyId: eur.id, exchangeRate: EUR_TO_XOF, paymentMethodId: pmWave.id,         creatorId: accountAdmin.id, priceRelay: 2.0     }),
    // dep4 — ARRIVE
    seedPaymentIfAbsent(pkg7.id, { amount: 15.0, currencyId: eur.id, exchangeRate: EUR_TO_XOF, paymentMethodId: pmOrangeMoney.id,  creatorId: accountAdmin.id                      }),
    seedPaymentIfAbsent(pkg8.id, { amount: 14.0, currencyId: eur.id, exchangeRate: EUR_TO_XOF, paymentMethodId: pmCash.id,         creatorId: accountAdmin.id                      }),
    seedPaymentIfAbsent(pkg9.id, { amount: 10.0, currencyId: eur.id, exchangeRate: EUR_TO_XOF, paymentMethodId: pmWave.id,         creatorId: accountAdmin.id, priceRelay: 2.0     }),
  ])
  console.log('✅ Payments créés (9 paiements)')

  console.log('\n📋 Résumé des données créées :')
  console.log('   - 5 PersonTypes : simple, commercial, etudiant (remise 10%), relais, partner')
  console.log('   - 2 Roles : ADMIN, CLIENT')
  console.log('   - 3 Currencies : EUR, XOF, USD')
  console.log('   - 4 PaymentMethods : CASH, VIREMENT, ORANGE_MONEY, WAVE')
  console.log('   - 15 Addresses (14 SIMPLE, 1 RELAIS)')
  console.log('   - 7 Persons (1 admin, 2 GP/partners, 2 clients, 1 etudiant, 1 relais)')
  console.log('   - 6 Accounts — mdp: Password123!')
  console.log('   - 1 Relay : Château Rouge')
  console.log('   - 5 Natures : Vêtements (2.5€), Électronique (6€), Alimentaire (1.5€), Cosmétique (3€), Médicament (4€)')
  console.log('   - 12 RoutePrices')
  console.log('   - 2 RoutePartners')
  console.log('   - 4 DepartureGps (tous fermés — tous état ARRIVE)')
  console.log('   - 12 DepartureStatuses (EN_ATTENTE → EN_TRANSIT → ARRIVE par départ)')
  console.log('   - 9 Packages (4 LIVRE sur dép. fermés, 5 ARRIVE sur dép. ouverts)')
  console.log('   - 9 Payments (EUR → XOF taux 655.957)')
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
