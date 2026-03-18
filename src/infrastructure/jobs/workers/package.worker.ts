import { Worker } from 'bullmq'
import { redis } from '../../config/redis.js'
import { container } from '../../config/container.js'

export function startPackageWorker(): void {
  new Worker(
    'package',
    async (job) => {
      if (job.name !== 'delete-unpaid-package') return

      const { packageId } = job.data as { packageId: string }

      const pkg = await container.packageRepository.findById(packageId)
      if (!pkg || pkg.isArchived) return

      const hasValidPayment = pkg.payments.some(p => p.accepted && !p.refunded)
      if (hasValidPayment) {
        console.log(`[JOB] Colis ${packageId} conservé — paiement valide trouvé`)
        return
      }

      await container.packageRepository.delete(packageId)
      console.log(`[JOB] Colis ${packageId} supprimé — aucun paiement valide`)
    },
    { connection: redis }
  )
}
