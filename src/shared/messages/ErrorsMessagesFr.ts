export enum ErrorsMessages {
  // ── Génériques ──────────────────────────────────────────────────────────────
  ERREUR_INTERNE = "Erreur interne du serveur",
  ERREUR_VALIDATION = "Données invalides",
  RESSOURCE_INTROUVABLE = "Ressource introuvable",
  ACCES_REFUSE = "Accès refusé — droits insuffisants",
  NON_AUTHENTIFIE = "Vous devez être connecté pour effectuer cette action",

  // ── JWT / Auth ───────────────────────────────────────────────────────────────
  TOKEN_MANQUANT = "Token d'authentification manquant",
  TOKEN_INVALIDE = "Token invalide",
  TOKEN_EXPIRE = "Token expiré — veuillez vous reconnecter",
  SECRET_KEY_MANQUANTE = "Clé secrète non définie",

  // ── Account ──────────────────────────────────────────────────────────────────
  ACCOUNT_INTROUVABLE = "Compte introuvable",
  ACCOUNT_DEJA_EXISTANT = "Un compte existe déjà avec cet email",
  IDENTIFIANTS_INCORRECTS = "Email ou mot de passe incorrect",
  EMAIL_OBLIGATOIRE = "L'email est obligatoire",
  MOT_DE_PASSE_OBLIGATOIRE = "Le mot de passe est obligatoire",
  MOT_DE_PASSE_TROP_COURT = "Le mot de passe doit contenir au moins 8 caractères",

  // ── Person ───────────────────────────────────────────────────────────────────
  PERSON_INTROUVABLE = "Personne introuvable",
  PERSON_DEJA_EXISTANTE = "Une personne existe déjà avec ces informations",
  PERSON_TYPE_INTROUVABLE = "Type de personne introuvable",

  // ── Colis ────────────────────────────────────────────────────────────────────
  COLIS_INTROUVABLE = "Colis introuvable",
  COLIS_DEJA_ARCHIVE = "Ce colis est déjà archivé",
  COLIS_NON_ARCHIVABLE = "Ce colis ne peut pas être archivé — statut incompatible",
  COLIS_NON_SUPPRIMABLE = "Seul un colis en attente peut être supprimé",
  COLIS_NATURE_OBLIGATOIRE = "Un colis doit avoir au moins une nature",
  COLIS_POIDS_INVALIDE = "Le poids du colis doit être supérieur à 0",
  COLIS_STATUT_INVALIDE = "Statut de colis invalide",
  COLIS_STATUT_IDENTIQUE = "Le colis a déjà ce statut",
  COLIS_DEADLINE_NON_ATTEINTE = "Le statut ne peut pas être modifié avant la deadline du départ",
  COLIS_MODIFICATION_IMPOSSIBLE = "Le colis ne peut être modifié que lorsque le GP est arrivé",
  COLIS_REFERENCE_INTROUVABLE = "Référence de colis introuvable",

  // ── Départ GP ────────────────────────────────────────────────────────────────
  DEPART_INTROUVABLE = "Départ GP introuvable",
  DEPART_DEJA_FERME = "Ce départ GP est déjà fermé",
  DEPART_FERME = "Ce départ GP est fermé — impossible d'y ajouter des colis",
  DEPART_DATE_INVALIDE = "La date de départ doit être dans le futur",
  DEPART_DEADLINE_INVALIDE = "La deadline doit être antérieure à la date de départ",
  DEPART_GP_OBLIGATOIRE = "Le voyageur GP est obligatoire",
  DEPART_STATUT_IDENTIQUE = "Ce départ a déjà cet état",
  DEPART_TRANSITION_INVALIDE = "Cette transition d'état n'est pas autorisée",

  // ── Paiement ─────────────────────────────────────────────────────────────────
  PAIEMENT_INTROUVABLE = "Paiement introuvable",
  PAIEMENT_DEJA_ACCEPTE = "Ce paiement a déjà été accepté",
  PAIEMENT_DEJA_REMBOURSE = "Ce paiement a déjà été remboursé",
  PAIEMENT_MONTANT_INVALIDE = "Le montant du paiement doit être supérieur à 0",
  PAIEMENT_DEVISE_INTROUVABLE = "Devise introuvable",
  PAIEMENT_MOYEN_INTROUVABLE = "Moyen de paiement introuvable",
  TAUX_CHANGE_INDISPONIBLE = "Impossible de récupérer le taux de change",
  PAIEMENT_NON_ACCEPTE     = "Le paiement doit être accepté avant de générer une facture",

  // ── Relais ───────────────────────────────────────────────────────────────────
  RELAIS_INTROUVABLE = "Point relais introuvable",
  RELAIS_DEJA_EXISTANT = "Un relais existe déjà à cette adresse",

  // ── Adresse ──────────────────────────────────────────────────────────────────
  ADRESSE_INTROUVABLE = "Adresse introuvable",
  ADRESSE_DEJA_EXISTANTE = "Cette adresse existe déjà",

  // ── Nature ───────────────────────────────────────────────────────────────────
  NATURE_INTROUVABLE = "Nature de colis introuvable",
  NATURE_DEJA_EXISTANTE = "Une nature existe déjà avec ce nom",

  // ── Validation champs ────────────────────────────────────────────────────────
  ROLE_OBLIGATOIRE      = "Le rôle est obligatoire",
  ROLE_ID_INVALIDE      = "Identifiant rôle invalide",
  RELAIS_NOM_OBLIGATOIRE     = "Le nom du relais est obligatoire",
  RELAIS_PERSONNE_OBLIGATOIRE = "La personne est obligatoire",
  RELAIS_ADRESSE_OBLIGATOIRE = "L'adresse est obligatoire",

  // ── Route / Tarif ────────────────────────────────────────────────────────────
  ROUTE_INTROUVABLE = "Route introuvable",
  TARIF_INTROUVABLE = "Tarif introuvable pour cette route",
  TARIF_DEJA_EXISTANT = "Un tarif existe déjà pour cette route",
  PARTENAIRE_INTROUVABLE = "Partenaire GP introuvable",
}
