export var ErrorsMessages;
(function (ErrorsMessages) {
    // ── Génériques ──────────────────────────────────────────────────────────────
    ErrorsMessages["ERREUR_INTERNE"] = "Erreur interne du serveur";
    ErrorsMessages["ERREUR_VALIDATION"] = "Donn\u00E9es invalides";
    ErrorsMessages["RESSOURCE_INTROUVABLE"] = "Ressource introuvable";
    ErrorsMessages["ACCES_REFUSE"] = "Acc\u00E8s refus\u00E9 \u2014 droits insuffisants";
    ErrorsMessages["NON_AUTHENTIFIE"] = "Vous devez \u00EAtre connect\u00E9 pour effectuer cette action";
    // ── JWT / Auth ───────────────────────────────────────────────────────────────
    ErrorsMessages["TOKEN_MANQUANT"] = "Token d'authentification manquant";
    ErrorsMessages["TOKEN_INVALIDE"] = "Token invalide";
    ErrorsMessages["TOKEN_EXPIRE"] = "Token expir\u00E9 \u2014 veuillez vous reconnecter";
    ErrorsMessages["SECRET_KEY_MANQUANTE"] = "Cl\u00E9 secr\u00E8te non d\u00E9finie";
    // ── Account ──────────────────────────────────────────────────────────────────
    ErrorsMessages["ACCOUNT_INTROUVABLE"] = "Compte introuvable";
    ErrorsMessages["ACCOUNT_DEJA_EXISTANT"] = "Un compte existe d\u00E9j\u00E0 avec cet email";
    ErrorsMessages["IDENTIFIANTS_INCORRECTS"] = "Email ou mot de passe incorrect";
    ErrorsMessages["EMAIL_OBLIGATOIRE"] = "L'email est obligatoire";
    ErrorsMessages["MOT_DE_PASSE_OBLIGATOIRE"] = "Le mot de passe est obligatoire";
    ErrorsMessages["MOT_DE_PASSE_TROP_COURT"] = "Le mot de passe doit contenir au moins 8 caract\u00E8res";
    // ── Person ───────────────────────────────────────────────────────────────────
    ErrorsMessages["PERSON_INTROUVABLE"] = "Personne introuvable";
    ErrorsMessages["PERSON_DEJA_EXISTANTE"] = "Une personne existe d\u00E9j\u00E0 avec ces informations";
    ErrorsMessages["PERSON_TYPE_INTROUVABLE"] = "Type de personne introuvable";
    // ── Colis ────────────────────────────────────────────────────────────────────
    ErrorsMessages["COLIS_INTROUVABLE"] = "Colis introuvable";
    ErrorsMessages["COLIS_DEJA_ARCHIVE"] = "Ce colis est d\u00E9j\u00E0 archiv\u00E9";
    ErrorsMessages["COLIS_NON_ARCHIVABLE"] = "Ce colis ne peut pas \u00EAtre archiv\u00E9 \u2014 statut incompatible";
    ErrorsMessages["COLIS_NON_SUPPRIMABLE"] = "Seul un colis en attente peut \u00EAtre supprim\u00E9";
    ErrorsMessages["COLIS_NATURE_OBLIGATOIRE"] = "Un colis doit avoir au moins une nature";
    ErrorsMessages["COLIS_POIDS_INVALIDE"] = "Le poids du colis doit \u00EAtre sup\u00E9rieur \u00E0 0";
    ErrorsMessages["COLIS_STATUT_INVALIDE"] = "Statut de colis invalide";
    ErrorsMessages["COLIS_STATUT_IDENTIQUE"] = "Le colis a d\u00E9j\u00E0 ce statut";
    ErrorsMessages["COLIS_REFERENCE_INTROUVABLE"] = "R\u00E9f\u00E9rence de colis introuvable";
    // ── Départ GP ────────────────────────────────────────────────────────────────
    ErrorsMessages["DEPART_INTROUVABLE"] = "D\u00E9part GP introuvable";
    ErrorsMessages["DEPART_DEJA_FERME"] = "Ce d\u00E9part GP est d\u00E9j\u00E0 ferm\u00E9";
    ErrorsMessages["DEPART_FERME"] = "Ce d\u00E9part GP est ferm\u00E9 \u2014 impossible d'y ajouter des colis";
    ErrorsMessages["DEPART_DATE_INVALIDE"] = "La date de d\u00E9part doit \u00EAtre dans le futur";
    ErrorsMessages["DEPART_DEADLINE_INVALIDE"] = "La deadline doit \u00EAtre ant\u00E9rieure \u00E0 la date de d\u00E9part";
    ErrorsMessages["DEPART_GP_OBLIGATOIRE"] = "Le voyageur GP est obligatoire";
    // ── Paiement ─────────────────────────────────────────────────────────────────
    ErrorsMessages["PAIEMENT_INTROUVABLE"] = "Paiement introuvable";
    ErrorsMessages["PAIEMENT_DEJA_ACCEPTE"] = "Ce paiement a d\u00E9j\u00E0 \u00E9t\u00E9 accept\u00E9";
    ErrorsMessages["PAIEMENT_DEJA_REMBOURSE"] = "Ce paiement a d\u00E9j\u00E0 \u00E9t\u00E9 rembours\u00E9";
    ErrorsMessages["PAIEMENT_MONTANT_INVALIDE"] = "Le montant du paiement doit \u00EAtre sup\u00E9rieur \u00E0 0";
    ErrorsMessages["PAIEMENT_DEVISE_INTROUVABLE"] = "Devise introuvable";
    ErrorsMessages["PAIEMENT_MOYEN_INTROUVABLE"] = "Moyen de paiement introuvable";
    ErrorsMessages["TAUX_CHANGE_INDISPONIBLE"] = "Impossible de r\u00E9cup\u00E9rer le taux de change";
    // ── Relais ───────────────────────────────────────────────────────────────────
    ErrorsMessages["RELAIS_INTROUVABLE"] = "Point relais introuvable";
    ErrorsMessages["RELAIS_DEJA_EXISTANT"] = "Un relais existe d\u00E9j\u00E0 \u00E0 cette adresse";
    // ── Adresse ──────────────────────────────────────────────────────────────────
    ErrorsMessages["ADRESSE_INTROUVABLE"] = "Adresse introuvable";
    ErrorsMessages["ADRESSE_DEJA_EXISTANTE"] = "Cette adresse existe d\u00E9j\u00E0";
    // ── Nature ───────────────────────────────────────────────────────────────────
    ErrorsMessages["NATURE_INTROUVABLE"] = "Nature de colis introuvable";
    ErrorsMessages["NATURE_DEJA_EXISTANTE"] = "Une nature existe d\u00E9j\u00E0 avec ce nom";
    // ── Route / Tarif ────────────────────────────────────────────────────────────
    ErrorsMessages["ROUTE_INTROUVABLE"] = "Route introuvable";
    ErrorsMessages["TARIF_INTROUVABLE"] = "Tarif introuvable pour cette route";
    ErrorsMessages["TARIF_DEJA_EXISTANT"] = "Un tarif existe d\u00E9j\u00E0 pour cette route";
    ErrorsMessages["PARTENAIRE_INTROUVABLE"] = "Partenaire GP introuvable";
})(ErrorsMessages || (ErrorsMessages = {}));
//# sourceMappingURL=ErrorsMessagesFr.js.map