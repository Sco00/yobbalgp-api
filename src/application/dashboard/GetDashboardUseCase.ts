import { type IPackageRepository } from '../../domain/repositories/IPackageRepository.js'
import { type IPaymentRepository } from '../../domain/repositories/IPaymentRepository.js'
import { type IPersonRepository }  from '../../domain/repositories/IPersonRepository.js'
import { type DashboardData }       from '../../domain/entities/Dashboard/dashboard.types.js'

export class GetDashboardUseCase {
  constructor(
    private readonly packageRepository:  IPackageRepository,
    private readonly paymentRepository:  IPaymentRepository,
    private readonly personRepository:   IPersonRepository,
  ) {}

  async execute(): Promise<DashboardData> {
    const [
      packageStats,
      chiffreAffaires,
      totalClients,
      caMensuel,
      colisParRoute,
      repartitionClients,
      statutsParMois,
      derniersColis,
      topClients,
    ] = await Promise.all([
      this.packageRepository.getDashboardPackageStats(),
      this.paymentRepository.getChiffreAffaires(),
      this.personRepository.getTotalClients(),
      this.paymentRepository.getCaMensuel(),
      this.packageRepository.getColisParRoute(),
      this.personRepository.getRepartitionClients(),
      this.packageRepository.getStatutsParMois(),
      this.packageRepository.getDerniersColis(),
      this.personRepository.getTopClients(),
    ])

    return {
      kpis: {
        totalColis:      packageStats.totalColis,
        totalKg:         packageStats.totalKg,
        totalClients,
        chiffreAffaires,
      },
      caMensuel,
      colisParRoute,
      repartitionClients,
      statutsParMois,
      derniersColis,
      topClients,
    }
  }
}
