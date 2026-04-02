import { IDepartureRepository, DepartureFilters } from '../../domain/repositories/IDepartureRepository.js'
import { type DepartureListItem } from '../../domain/entities/DepartureGp/departure.types.js'

interface ListDeparturesResult {
  props:  DepartureListItem[]
  total: number
  page:  number
  limit: number
}

export class ListDeparturesUseCase {
  constructor(private readonly departureRepo: IDepartureRepository) {}

  async execute(filters: DepartureFilters): Promise<ListDeparturesResult> {
    const { props, total } = await this.departureRepo.findAll(filters)
    return {
      props,
      total,
      page:  filters.page  ?? 1,
      limit: filters.limit ?? 10,
    }
  }
}
