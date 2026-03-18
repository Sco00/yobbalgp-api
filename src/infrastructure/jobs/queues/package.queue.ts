import { Queue } from 'bullmq'
import { redis } from '../../config/redis.js'

const packageQueue = new Queue('package', { connection: redis, defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 }
  } })

export async function schedulePackageDeletion(packageId: string, departureDate: Date): Promise<void> {
  const delay = departureDate.getTime() - Date.now()
  if (delay <= 0) return

  await packageQueue.add(
    'delete-unpaid-package',
    { packageId },
    { delay, jobId: `delete-${packageId}` },
  )
}
