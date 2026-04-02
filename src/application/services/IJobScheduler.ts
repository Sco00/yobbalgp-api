export interface IJobScheduler {
  scheduleDepartureJobs(
    departureId:   string,
    departureDate: Date,
    arrivalDate:   Date,
    deadline:      Date,
  ): Promise<void>

  schedulePackageDeletion(packageId: string, departureDate: Date): Promise<void>
}
