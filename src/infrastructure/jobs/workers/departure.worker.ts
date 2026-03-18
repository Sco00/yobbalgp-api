import { Worker } from 'bullmq'
import { redis } from '../../config/redis.js'
import { container } from '../../config/container.js'

export function startDepartureWorker(): void {
  new Worker(
    'departure',
    async (job) => {
      if (job.name !== 'close-departure') return

      const { departureId } = job.data as { departureId: string }

      const departure = await container.departureRepository.findById(departureId)
      if (!departure || departure.isClosed) return

      await container.departureRepository.close(departureId)
      console.log(`[JOB] Départ ${departureId} fermé automatiquement`)
    },
    { connection: redis }
  )
}
