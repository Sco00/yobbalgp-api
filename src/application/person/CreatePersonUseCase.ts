import { type IPersonRepository } from '../../domain/repositories/IPersonRepository.js'
import { type Person } from '@prisma/client'
import { type CreatePersonDTO } from '../../infrastructure/http/validators/person.validator.js'
import { ConflictError } from '../../shared/errors/ConflictError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

export class CreatePersonUseCase {
  constructor(private readonly personRepo: IPersonRepository) {}

  async execute(dto: CreatePersonDTO, throwIfExisjs = true): Promise<Person> {
    if (dto.mobile) {
      const existing = await this.personRepo.findByMobile(dto.mobile)

      if (existing) {
        if (throwIfExisjs) throw new ConflictError(ErrorsMessages.PERSON_DEJA_EXISTANTE)
        return existing
      }
    }

    return await this.personRepo.save(dto)
  }
}