import { Worker } from 'bullmq'
import { redis } from '../../config/redis.js'
import { container } from '../../config/container.js'
import { DepartureStates } from '../../../domain/enums/DepartureStates.js'

export function startDepartureWorker(): void {
  new Worker(
    'departure',
    async (job) => {
      if (job.name !== 'departure-transit' && job.name !== 'departure-arrive') return

      const { departureId, state } = job.data as { departureId: string; state: DepartureStates }

      await container.updateDepartureStatusUseCase.execute(departureId, state)
      console.log(`[JOB] Départ ${departureId} → ${state}`)
    },
    { connection: redis }
  )
}
