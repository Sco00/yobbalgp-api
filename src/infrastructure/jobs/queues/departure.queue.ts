import { Queue } from 'bullmq'
import { redis } from '../../config/redis.js'
import { DepartureStates } from '../../../domain/enums/DepartureStates.js'

const departureQueue = new Queue('departure', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 }
  }
})

export async function scheduleDepartureJobs(
  departureId: string,
  departureDate: Date,
  arrivalDate: Date,
  deadline: Date,
): Promise<void> {
  const transitDelay  = departureDate.getTime() - Date.now()
  const arrivalDelay  = arrivalDate.getTime()   - Date.now()
  const deadlineDelay = deadline.getTime()       - Date.now()

  if (transitDelay > 0) {
    await departureQueue.add(
      'departure-transit',
      { departureId, state: DepartureStates.EN_TRANSIT },
      { delay: transitDelay, jobId: `transit-${departureId}` },
    )
  }

  if (arrivalDelay > 0) {
    await departureQueue.add(
      'departure-arrive',
      { departureId, state: DepartureStates.ARRIVE },
      { delay: arrivalDelay, jobId: `arrive-${departureId}` },
    )
  }

  if (deadlineDelay > 0) {
    await departureQueue.add(
      'departure-close',
      { departureId },
      { delay: deadlineDelay, jobId: `close-${departureId}` },
    )
  }
}
