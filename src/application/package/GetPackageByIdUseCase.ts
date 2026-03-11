import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js";
import { type PackageWithRelations } from "../../domain/entities/Package/package.types.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js";

export class GetPackageByIdUseCase {
  constructor(private readonly packageRepo: IPackageRepository) {}

  async execute(id: string): Promise<PackageWithRelations> {
    const pkg = await this.packageRepo.findById(id);
    if (!pkg) throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE);
    return pkg;
  }
}
