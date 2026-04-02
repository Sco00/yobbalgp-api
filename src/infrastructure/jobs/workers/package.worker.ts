import { Worker }    from 'bullmq'
import { redis }     from '../../config/redis.js'
import { container } from '../../config/container.js'

export function startPackageWorker(): void {
  new Worker(
    'package',
    async (job) => {
      if (job.name !== 'delete-unpaid-package') return

      const { packageId } = job.data as { packageId: string }
      await container.deleteExpiredPackageUseCase.execute(packageId)
    },
    { connection: redis }
  )
}
