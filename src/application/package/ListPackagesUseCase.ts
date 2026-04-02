import { IPackageRepository, PackageFilters } from "../../domain/repositories/IPackageRepository.js"
import { PackageListItem } from "../../domain/entities/Package/package.types.js"

interface ListPackagesResult {
  props:  PackageListItem[]
  total: number
  page:  number
  limit: number
}

export class ListPackagesUseCase {
  constructor(private readonly packageRepo: IPackageRepository) {}

  async execute(filters: PackageFilters): Promise<ListPackagesResult> {
    const { props, total } = await this.packageRepo.findAll(filters)
    return {
      props,
      total,
      page:  filters.page  ?? 1,
      limit: filters.limit ?? 10,
    }
  }
}