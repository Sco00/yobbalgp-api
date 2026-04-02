import { Worker }             from 'bullmq'
import { redis }              from '../../config/redis.js'
import { container }          from '../../config/container.js'
import { DepartureStates }    from '../../../domain/enums/DepartureStates.js'

export function startDepartureWorker(): void {
  new Worker(
    'departure',
    async (job) => {
      if (job.name === 'departure-transit' || job.name === 'departure-arrive') {
        const { departureId, state } = job.data as { departureId: string; state: DepartureStates }
        await container.updateDepartureStatusUseCase.execute(departureId, state)
        return
      }

      if (job.name === 'departure-close') {
        const { departureId } = job.data as { departureId: string }
        await container.autoCloseDepartureUseCase.execute(departureId)
      }
    },
    { connection: redis }
  )
}
