import { type IPackageRepository } from '../../domain/repositories/IPackageRepository.js'

export class DeleteExpiredPackageUseCase {
  constructor(private readonly packageRepo: IPackageRepository) {}

  async execute(packageId: string): Promise<void> {
    const pkg = await this.packageRepo.findById(packageId)
    if (!pkg || pkg.isArchived) return

    const hasValidPayment = pkg.payments.some(p => p.accepted && !p.refunded)
    if (hasValidPayment) return

    await this.packageRepo.delete(packageId)
  }
}
