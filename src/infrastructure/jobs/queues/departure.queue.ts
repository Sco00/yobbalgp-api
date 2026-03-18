import { Queue } from 'bullmq'
import { redis } from '../../config/redis.js'

const departureQueue = new Queue('departure', { connection: redis, defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 }
  } })

export async function scheduleDepartureClose(departureId: string, departureDate: Date): Promise<void> {
  const delay = departureDate.getTime() - Date.now()
  if (delay <= 0) return

  await departureQueue.add(
    'close-departure',
    { departureId },
    { delay, jobId: `close-${departureId}` },
  )
}
