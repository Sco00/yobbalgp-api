import { PrismaPackageRepository } from "../database/PrismaPackageRepository.js";
import { PrismaDepartureRepository } from "../database/PrismaDepartureRepository.js";
// import { PrismaAccountRepository }   from '../database/PrismaAccountRepository.js'
// import { PrismaPersonRepository }    from '../database/PrismaPersonRepository.js'
// import { PrismaRelayRepository }     from '../database/PrismaRelayRepository.js'
// import { PrismaPaymentRepository }   from '../database/PrismaPaymentRepository.js'
import { CreatePackageUseCase } from "../../application/package/CreatePackageUseCase.js";
import { ListPackagesUseCase } from "../../application/package/ListPackagesUseCase.js";
import { GetPackageByIdUseCase } from "../../application/package/GetPackageByIdUseCase.js";
import { UpdatePackageStatusUseCase } from "../../application/package/UpdatePackageStatusUseCase.js";
import { ArchivePackageUseCase } from "../../application/package/ArchivePackageUseCase.js";
import { DeletePackageUseCase } from "../../application/package/DeletePackageUseCase.js";
import { PackageController } from "../http/controllers/PackageController.js";
import { CreatePersonUseCase } from "../../application/person/CreatePersonUseCase.js";
import { PrismaPersonRepository } from "../database/PrismaPersonRepository.js";
import { PrismaAccountRepository } from "../database/PrismaAccountRepository.js";
import { CreateAccountUseCase } from "../../application/account/CreateAccountUseCase.js";
import { LoginUseCase } from "../../application/account/LoginUseCase.js";
import { ListPersonsUseCase } from "../../application/person/ListPersonsUseCase.js";
import { PrismaNatureRepository } from "../database/PrismaNatureRepository.js";
import { CreateDepartureUseCase } from "../../application/departure/CreateDepartureUseCase.js";
import { ListDeparturesUseCase } from "../../application/departure/ListDeparturesUseCase.js";
import { GetDepartureByIdUseCase } from "../../application/departure/GetDepartureByIdUseCase.js";
import { CloseDepartureUseCase } from "../../application/departure/CloseDepartureUseCase.js";
import { DepartureController } from "../http/controllers/DepartureController.js";
import { AddNatureToPackageUseCase } from "../../application/package/AddNatureToPackageUseCase.js";
import { RemoveNatureFromPackageUseCase } from "../../application/package/RemoveNatureFromPackageUseCase.js";
// ── Repositories
const packageRepository = new PrismaPackageRepository();
const departureRepository = new PrismaDepartureRepository();
const accountRepository = new PrismaAccountRepository();
const personRepository = new PrismaPersonRepository();
const natureRepository = new PrismaNatureRepository();
// const relayRepository     = new PrismaRelayRepository()
// const paymentRepository   = new PrismaPaymentRepository()
// ── Use Cases
const createPackageUseCase = new CreatePackageUseCase(packageRepository, departureRepository, natureRepository);
const listPackagesUseCase = new ListPackagesUseCase(packageRepository);
const getPackageByIdUseCase = new GetPackageByIdUseCase(packageRepository);
const updatePackageStatusUseCase = new UpdatePackageStatusUseCase(packageRepository);
const archivePackageUseCase = new ArchivePackageUseCase(packageRepository);
const deletePackageUseCase = new DeletePackageUseCase(packageRepository);
const createPersonUseCase = new CreatePersonUseCase(personRepository);
const createAccountUseCase = new CreateAccountUseCase(accountRepository);
const loginUseCase = new LoginUseCase(accountRepository);
const listPersonsUseCase = new ListPersonsUseCase(personRepository);
// ── Departure Use Cases
const createDepartureUseCase = new CreateDepartureUseCase(departureRepository);
const listDeparturesUseCase = new ListDeparturesUseCase(departureRepository);
const getDepartureByIdUseCase = new GetDepartureByIdUseCase(departureRepository);
const closeDepartureUseCase = new CloseDepartureUseCase(departureRepository);
const addNatureToPackageUseCase = new AddNatureToPackageUseCase(packageRepository, natureRepository);
const removeNatureFromPackageUseCase = new RemoveNatureFromPackageUseCase(packageRepository);
export const container = {
    // Repositories
    // packageRepository,
    // departureRepository,
    //   accountRepository,
    //   personRepository,
    //   relayRepository,
    //   paymentRepository,
    // Package Use Cases
    createPackageUseCase,
    listPackagesUseCase,
    getPackageByIdUseCase,
    updatePackageStatusUseCase,
    archivePackageUseCase,
    deletePackageUseCase,
    createPersonUseCase,
    createAccountUseCase,
    loginUseCase,
    listPersonsUseCase,
    addNatureToPackageUseCase,
    removeNatureFromPackageUseCase,
    // Departure Use Cases
    createDepartureUseCase,
    listDeparturesUseCase,
    getDepartureByIdUseCase,
    closeDepartureUseCase,
    packageController: new PackageController(),
    departureController: new DepartureController(),
};
//# sourceMappingURL=container.js.map