# YobbalGP — API V2

API REST d'une plateforme de gestion d'expéditions groupées (Grand Particulier). Elle couvre le cycle complet : création de colis, départs GP, paiements, génération de factures PDF et automatisations via des jobs en arrière-plan.

---

## Stack technique

| Catégorie | Technologie |
|---|---|
| Runtime | Node.js (ESM) + TypeScript 5 |
| Framework HTTP | Express 5 |
| ORM / Base de données | Prisma 6 + PostgreSQL |
| Authentification | JWT (jsonwebtoken) + bcryptjs |
| Validation | Zod 4 |
| Jobs / Queues | BullMQ + Redis (ioredis) |
| Génération PDF | PDFKit |
| Stockage fichiers | Cloudinary |
| Sécurité | Helmet + CORS |

---

## Architecture

Le projet suit une **Clean Architecture** en 4 couches. La règle de dépendance est stricte : les couches internes n'importent jamais les couches externes.

```
src/
├── domain/           # Entités, interfaces repository, enums — aucune dépendance externe
├── application/      # Use cases, DTOs — dépend uniquement du domain
├── infrastructure/   # Prisma, Express, BullMQ, PDF — implémente les interfaces domain
└── shared/           # Config ENV, erreurs, services transverses (JWT, PDF, réponses)
```

### Entités métier

| Entité | Description |
|---|---|
| `Account` | Compte utilisateur (email + mot de passe hashé, rôle) |
| `Person` | Individu (client, GP, responsable relais) |
| `DepartureGp` | Départ groupé avec dates, adresses, prix et état |
| `Package` | Colis rattaché à un départ, avec statuts et natures |
| `Payment` | Paiement d'un colis, avec devise, remise et facture |
| `Address` | Adresse géographique (simple ou point relais) |
| `Relay` | Point de collecte/dépôt associé à une adresse |
| `Nature` | Type de marchandise avec prix unitaire |
| `Currency` | Devise supportée (code, symbole) |
| `PaymentMethod` | Moyen de paiement (espèces, virement, etc.) |
| `Role` | Rôle d'accès (admin, client…) |

### États

```
Package  : EN_ATTENTE → EN_TRANSIT → ARRIVE → LIVRE | RETOURNE
DepartureGp : EN_ATTENTE → EN_TRANSIT → ARRIVE
```

---

## Endpoints

Tous les endpoints sont préfixés par `/api/yobbal/V2/`.
Les routes protégées nécessitent un header `Authorization: Bearer <token>`.

### Auth
| Méthode | Route | Accès | Description |
|---|---|---|---|
| `POST` | `/auth/login` | Public | Connexion |
| `POST` | `/auth/refresh` | Public | Renouvellement du token |

### Comptes
| Méthode | Route | Accès | Description |
|---|---|---|---|
| `POST` | `/accounts` | Admin | Créer un compte |

### Personnes
| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/persons` | Admin | Lister les personnes |
| `GET` | `/persons/:id` | Admin | Détail d'une personne |
| `GET` | `/persons/types` | Admin | Lister les types de personnes |
| `POST` | `/persons` | Admin | Créer une personne |

### Colis
| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/packages` | Auth | Lister les colis |
| `GET` | `/packages/:id` | Auth | Détail d'un colis |
| `GET` | `/packages/:id/quote` | Client | Générer un devis PDF |
| `POST` | `/packages` | Admin | Créer un colis |
| `PATCH` | `/packages/:id/status` | Admin | Changer le statut |
| `PATCH` | `/packages/:id/archive` | Admin | Archiver |
| `DELETE` | `/packages/:id` | Admin | Supprimer |
| `POST` | `/packages/:id/natures` | Admin | Ajouter une nature |
| `DELETE` | `/packages/:id/natures/:natureId` | Admin | Retirer une nature |

### Départs GP
| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/departures` | Client | Lister les départs |
| `GET` | `/departures/:id` | Client | Détail d'un départ |
| `POST` | `/departures` | Admin | Créer un départ |
| `PATCH` | `/departures/:id/close` | Admin | Fermer un départ |
| `PATCH` | `/departures/:id/state` | Admin | Changer l'état |

### Paiements
| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/payments` | Admin | Lister les paiements |
| `GET` | `/payments/:id` | Admin | Détail d'un paiement |
| `GET` | `/payments/:id/invoice` | Admin | Télécharger la facture PDF |
| `POST` | `/payments` | Admin | Enregistrer un paiement |
| `PATCH` | `/payments/:id/accept` | Admin | Accepter un paiement |
| `PATCH` | `/payments/:id/refund` | Admin | Rembourser |

### Relais
| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/relays` | Admin | Lister les relais |
| `GET` | `/relays/:id` | Admin | Détail d'un relais |
| `POST` | `/relays` | Admin | Créer un relais |

### Adresses
| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/addresses` | Admin | Lister les adresses |
| `GET` | `/addresses/:id` | Admin | Détail d'une adresse |
| `POST` | `/addresses` | Admin | Créer une adresse |

### Références & Dashboard
| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/ref/currencies` | Admin | Devises disponibles |
| `GET` | `/ref/payment-methods` | Admin | Moyens de paiement |
| `GET` | `/ref/roles` | Admin | Rôles utilisateurs |
| `GET` | `/natures` | Admin | Types de marchandises |
| `GET` | `/dashboard` | Auth | Statistiques générales |

---

## Jobs en arrière-plan

BullMQ + Redis gère deux queues qui automatisent les transitions d'état.

### Queue `departure`
| Job | Déclenchement | Action |
|---|---|---|
| `departure-transit` | À `departureDate` | Passe le départ en `EN_TRANSIT` |
| `departure-arrive` | À `arrivalDate` | Passe le départ en `ARRIVE` |
| `departure-close` | À `deadline` | Ferme automatiquement le départ |

### Queue `package`
| Job | Déclenchement | Action |
|---|---|---|
| `delete-unpaid-package` | À `departureDate` | Supprime les colis sans paiement valide |

---

## Variables d'environnement

Copier `.env.example` en `.env` et renseigner les valeurs :

```env
# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/yobbalgp
PRISMA_MIGRATE_SHADOW_DATABASE_URL=postgresql://user:password@localhost:5432/yobbalgp_shadow

# Serveur
PORT=4000

# JWT
SECRET_KEY=une_clé_secrète_longue_et_aléatoire

# Cloudinary (stockage PDF)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Redis (optionnel — défaut : localhost:6379)
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

## Installation et démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# Renseigner les valeurs dans .env

# 3. Appliquer les migrations
npx prisma migrate dev

# 4. Alimenter la base (données de référence)
npm run seed

# 5. Démarrer en développement
npm run dev
```

Le serveur démarre sur `http://localhost:4000` (ou la valeur de `PORT`).
Les workers BullMQ démarrent automatiquement avec le serveur.

---

## Scripts disponibles

| Script | Description |
|---|---|
| `npm run dev` | Démarrage avec rechargement automatique (nodemon + tsx) |
| `npm run build` | Compilation TypeScript (mode watch) |
| `npm run seed` | Insertion des données de référence |

---

## Format des réponses

Toutes les réponses suivent le même format :

```jsonc
// Succès
{
  "success": true,
  "message": "Opération effectuée avec succès",
  "data": { ... }
}

// Erreur métier
{
  "success": false,
  "error": {
    "code": "COLIS_INTROUVABLE",
    "message": "Colis introuvable"
  }
}

// Erreur de validation
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Données invalides",
    "fields": [{ "field": "weight", "message": "Expected number, received string" }]
  }
}
```
