export const ENV = {
  JWT_SECRET:         process.env['JWT_SECRET'] ?? process.env['SECRET_KEY'] ?? '',
  JWT_REFRESH_SECRET: process.env['JWT_REFRESH_SECRET'] ?? process.env['SECRET_KEY'] ?? '',
  DATABASE_URL:       process.env['DATABASE_URL'] ?? '',
  REDIS_HOST:         process.env['REDIS_HOST'] ?? 'localhost',
  REDIS_PORT:         Number(process.env['REDIS_PORT'] ?? 6379),
  PORT:               Number(process.env['PORT'] ?? 4000),
}
