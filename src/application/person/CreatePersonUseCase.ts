import { type IPersonRepository }    from '../../domain/repositories/IPersonRepository.js'
import { type PersonWithRelations }  from '../../domain/entities/Person/person.types.js'
import { type CreatePersonInput }    from '../dtos/person.dtos.js'
import { ConflictError }             from '../../shared/errors/ConflictError.js'
import { ErrorsMessages }            from '../../shared/messages/ErrorsMessagesFr.js'

export class CreatePersonUseCase {
  constructor(private readonly personRepo: IPersonRepository) {}

  async execute(dto: CreatePersonInput, throwIfExists = true): Promise<PersonWithRelations> {
    if (dto.mobile) {
      const existing = await this.personRepo.findByMobile(dto.mobile)

      if (existing) {
        if (throwIfExists) throw new ConflictError(ErrorsMessages.PERSON_DEJA_EXISTANTE)
        return existing
      }
    }

    return await this.personRepo.save(dto)
  }
}
