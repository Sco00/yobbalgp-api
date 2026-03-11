export var ErrorMessages;
(function (ErrorMessages) {
    // ── Génériques ──────────────────────────────────────────────────────────────
    ErrorMessages["ERREUR_INTERNE"] = "Erreur interne du serveur";
    ErrorMessages["ERREUR_VALIDATION"] = "Donn\u00E9es invalides";
    ErrorMessages["RESSOURCE_INTROUVABLE"] = "Ressource introuvable";
    ErrorMessages["ACCES_REFUSE"] = "Acc\u00E8s refus\u00E9 \u2014 droits insuffisants";
    ErrorMessages["NON_AUTHENTIFIE"] = "Vous devez \u00EAtre connect\u00E9 pour effectuer cette action";
    // ── JWT / Auth ───────────────────────────────────────────────────────────────
    ErrorMessages["TOKEN_MANQUANT"] = "Token d'authentification manquant";
    ErrorMessages["TOKEN_INVALIDE"] = "Token invalide";
    ErrorMessages["TOKEN_EXPIRE"] = "Token expir\u00E9 \u2014 veuillez vous reconnecter";
    ErrorMessages["SECRET_KEY_MANQUANTE"] = "Cl\u00E9 secr\u00E8te non d\u00E9finie";
    // ── Account ──────────────────────────────────────────────────────────────────
    ErrorMessages["ACCOUNT_INTROUVABLE"] = "Compte introuvable";
    ErrorMessages["ACCOUNT_DEJA_EXISTANT"] = "Un compte existe d\u00E9j\u00E0 avec cet email";
    ErrorMessages["IDENTIFIANTS_INCORRECTS"] = "Email ou mot de passe incorrect";
    ErrorMessages["EMAIL_OBLIGATOIRE"] = "L'email est obligatoire";
    ErrorMessages["MOT_DE_PASSE_OBLIGATOIRE"] = "Le mot de passe est obligatoire";
    ErrorMessages["MOT_DE_PASSE_TROP_COURT"] = "Le mot de passe doit contenir au moins 8 caract\u00E8res";
    // ── Person ───────────────────────────────────────────────────────────────────
    ErrorMessages["PERSON_INTROUVABLE"] = "Personne introuvable";
    ErrorMessages["PERSON_DEJA_EXISTANTE"] = "Une personne existe d\u00E9j\u00E0 avec ces informations";
    ErrorMessages["PERSON_TYPE_INTROUVABLE"] = "Type de personne introuvable";
    // ── Colis ────────────────────────────────────────────────────────────────────
    ErrorMessages["COLIS_INTROUVABLE"] = "Colis introuvable";
    ErrorMessages["COLIS_DEJA_ARCHIVE"] = "Ce colis est d\u00E9j\u00E0 archiv\u00E9";
    ErrorMessages["COLIS_NON_ARCHIVABLE"] = "Ce colis ne peut pas \u00EAtre archiv\u00E9 \u2014 statut incompatible";
    ErrorMessages["COLIS_NON_SUPPRIMABLE"] = "Seul un colis en attente peut \u00EAtre supprim\u00E9";
    ErrorMessages["COLIS_NATURE_OBLIGATOIRE"] = "Un colis doit avoir au moins une nature";
    ErrorMessages["COLIS_POIDS_INVALIDE"] = "Le poids du colis doit \u00EAtre sup\u00E9rieur \u00E0 0";
    ErrorMessages["COLIS_STATUT_INVALIDE"] = "Statut de colis invalide";
    ErrorMessages["COLIS_STATUT_IDENTIQUE"] = "Le colis a d\u00E9j\u00E0 ce statut";
    ErrorMessages["COLIS_REFERENCE_INTROUVABLE"] = "R\u00E9f\u00E9rence de colis introuvable";
    // ── Départ GP ────────────────────────────────────────────────────────────────
    ErrorMessages["DEPART_INTROUVABLE"] = "D\u00E9part GP introuvable";
    ErrorMessages["DEPART_DEJA_FERME"] = "Ce d\u00E9part GP est d\u00E9j\u00E0 ferm\u00E9";
    ErrorMessages["DEPART_FERME"] = "Ce d\u00E9part GP est ferm\u00E9 \u2014 impossible d'y ajouter des colis";
    ErrorMessages["DEPART_DATE_INVALIDE"] = "La date de d\u00E9part doit \u00EAtre dans le futur";
    ErrorMessages["DEPART_DEADLINE_INVALIDE"] = "La deadline doit \u00EAtre ant\u00E9rieure \u00E0 la date de d\u00E9part";
    ErrorMessages["DEPART_GP_OBLIGATOIRE"] = "Le voyageur GP est obligatoire";
    // ── Paiement ─────────────────────────────────────────────────────────────────
    ErrorMessages["PAIEMENT_INTROUVABLE"] = "Paiement introuvable";
    ErrorMessages["PAIEMENT_DEJA_ACCEPTE"] = "Ce paiement a d\u00E9j\u00E0 \u00E9t\u00E9 accept\u00E9";
    ErrorMessages["PAIEMENT_DEJA_REMBOURSE"] = "Ce paiement a d\u00E9j\u00E0 \u00E9t\u00E9 rembours\u00E9";
    ErrorMessages["PAIEMENT_MONTANT_INVALIDE"] = "Le montant du paiement doit \u00EAtre sup\u00E9rieur \u00E0 0";
    ErrorMessages["PAIEMENT_DEVISE_INTROUVABLE"] = "Devise introuvable";
    ErrorMessages["PAIEMENT_MOYEN_INTROUVABLE"] = "Moyen de paiement introuvable";
    ErrorMessages["TAUX_CHANGE_INDISPONIBLE"] = "Impossible de r\u00E9cup\u00E9rer le taux de change";
    // ── Relais ───────────────────────────────────────────────────────────────────
    ErrorMessages["RELAIS_INTROUVABLE"] = "Point relais introuvable";
    ErrorMessages["RELAIS_DEJA_EXISTANT"] = "Un relais existe d\u00E9j\u00E0 \u00E0 cette adresse";
    // ── Adresse ──────────────────────────────────────────────────────────────────
    ErrorMessages["ADRESSE_INTROUVABLE"] = "Adresse introuvable";
    ErrorMessages["ADRESSE_DEJA_EXISTANTE"] = "Cette adresse existe d\u00E9j\u00E0";
    // ── Nature ───────────────────────────────────────────────────────────────────
    ErrorMessages["NATURE_INTROUVABLE"] = "Nature de colis introuvable";
    ErrorMessages["NATURE_DEJA_EXISTANTE"] = "Une nature existe d\u00E9j\u00E0 avec ce nom";
    // ── Route / Tarif ────────────────────────────────────────────────────────────
    ErrorMessages["ROUTE_INTROUVABLE"] = "Route introuvable";
    ErrorMessages["TARIF_INTROUVABLE"] = "Tarif introuvable pour cette route";
    ErrorMessages["TARIF_DEJA_EXISTANT"] = "Un tarif existe d\u00E9j\u00E0 pour cette route";
    ErrorMessages["PARTENAIRE_INTROUVABLE"] = "Partenaire GP introuvable";
})(ErrorMessages || (ErrorMessages = {}));
//# sourceMappingURL=ErrorsMessagesFr.js.map