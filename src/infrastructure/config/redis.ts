const redis = process.env['REDIS_URL']
  ? {
      url: process.env['REDIS_URL'],
      token: process.env['REDIS_TOKEN'],
      maxRetriesPerRequest: null,
    }
  : {
      host: process.env['REDIS_HOST'] ?? '127.0.0.1',
      port: Number(process.env['REDIS_PORT'] ?? 6379),
      maxRetriesPerRequest: null,
    }

export { redis }