import { type IPersonRepository } from '../../domain/repositories/IPersonRepository.js'
import { type PersonDetailWithRelations } from '../../domain/entities/Person/person.types.js'
import { NotFoundError } from '../../shared/errors/NotFoundError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

export class GetPersonByIdUseCase {
  constructor(private readonly personRepo: IPersonRepository) {}

  async execute(id: string): Promise<PersonDetailWithRelations> {
    const person = await this.personRepo.findDetailById(id)
    if (!person) throw new NotFoundError(ErrorsMessages.PERSON_INTROUVABLE)
    return person
  }
}
