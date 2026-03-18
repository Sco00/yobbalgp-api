import { IPersonRepository, PersonFilters } from "../../domain/repositories/IPersonRepository.js"
import { PersonWithRelations } from "../../domain/entities/Person/person.types.js"

interface ListPackagesResult {
  props:  PersonWithRelations[]
  total: number
  page:  number
  limit: number
}

export class ListPersonsUseCase {
  constructor(private readonly packageRepo: IPersonRepository) {}

  async execute(filters: PersonFilters): Promise<ListPackagesResult> {
    const { props, total } = await this.packageRepo.findAll(filters)
    return {
      props,
      total,
      page:  filters.page  ?? 1,
      limit: filters.limit ?? 10,
    }
  }
}