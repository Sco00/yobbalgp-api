import { startDepartureWorker } from './workers/departure.worker.js'
import { startPackageWorker }   from './workers/package.worker.js'

export function startAllWorkers(): void {
  startDepartureWorker()
  startPackageWorker()
  console.log('[WORKERS] Tous les workers BullMQ sont démarrés')
}
