// Injecte les variables d'environnement avant l'évaluation de ENV
// (setupFiles s'exécute avant tout import de test)
process.env['JWT_SECRET'] = 'test-secret-key'
process.env['JWT_REFRESH_SECRET'] = 'test-refresh-secret-key'
process.env['SECRET_KEY'] = 'test-secret-key'
