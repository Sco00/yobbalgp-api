import { type IJobScheduler }        from '../../application/services/IJobScheduler.js'
import { scheduleDepartureJobs }     from './queues/departure.queue.js'
import { schedulePackageDeletion }   from './queues/package.queue.js'

export class BullMQJobScheduler implements IJobScheduler {
  async scheduleDepartureJobs(
    departureId:   string,
    departureDate: Date,
    arrivalDate:   Date,
    deadline:      Date,
  ): Promise<void> {
    await scheduleDepartureJobs(departureId, departureDate, arrivalDate, deadline)
  }

  async schedulePackageDeletion(packageId: string, departureDate: Date): Promise<void> {
    await schedulePackageDeletion(packageId, departureDate)
  }
}
