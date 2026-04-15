import type { IJobScheduler } from '../../services/IJobScheduler.js'

export class InMemoryJobScheduler implements IJobScheduler {
  scheduledDepartureJobs: Array<{
    departureId:   string
    departureDate: Date
    arrivalDate:   Date
    deadline:      Date
  }> = []

  scheduledPackageDeletions: Array<{
    packageId:     string
    departureDate: Date
  }> = []

  reset(): void {
    this.scheduledDepartureJobs    = []
    this.scheduledPackageDeletions = []
  }

  async scheduleDepartureJobs(
    departureId:   string,
    departureDate: Date,
    arrivalDate:   Date,
    deadline:      Date,
  ): Promise<void> {
    this.scheduledDepartureJobs.push({ departureId, departureDate, arrivalDate, deadline })
  }

  async schedulePackageDeletion(packageId: string, departureDate: Date): Promise<void> {
    this.scheduledPackageDeletions.push({ packageId, departureDate })
  }
}
