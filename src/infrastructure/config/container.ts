import { PrismaPackageRepository } from "../database/PrismaPackageRepository.js";
import { PrismaDepartureRepository } from "../database/PrismaDepartureRepository.js";
import { PrismaPersonRepository } from "../database/PrismaPersonRepository.js";
import { PrismaAccountRepository } from "../database/PrismaAccountRepository.js";
import { PrismaNatureRepository } from "../database/PrismaNatureRepository.js";
import { PrismaRelayRepository } from "../database/PrismaRelayRepository.js";
import { PrismaPaymentRepository } from "../database/PrismaPaymentRepository.js";
import { PrismaAddressRepository } from "../database/PrismaAddressRepository.js";
import { PrismaCurrencyRepository } from "../database/PrismaCurrencyRepository.js";
import { PrismaPaymentMethodRepository } from "../database/PrismaPaymentMethodRepository.js";
import { PrismaRoleRepository } from "../database/PrismaRoleRepository.js";
import { BullMQJobScheduler } from "../jobs/BullMQJobScheduler.js";
import { PdfRenderer } from "../pdf/PdfRenderer.js";
import { PdfService } from "../../shared/services/PdfService.js";
import { CreatePackageUseCase } from "../../application/package/CreatePackageUseCase.js";
import { ListPackagesUseCase } from "../../application/package/ListPackagesUseCase.js";
import { GetPackageByIdUseCase } from "../../application/package/GetPackageByIdUseCase.js";
import { UpdatePackageStatusUseCase } from "../../application/package/UpdatePackageStatusUseCase.js";
import { ArchivePackageUseCase } from "../../application/package/ArchivePackageUseCase.js";
import { DeletePackageUseCase } from "../../application/package/DeletePackageUseCase.js";
import { AddNatureToPackageUseCase } from "../../application/package/AddNatureToPackageUseCase.js";
import { RemoveNatureFromPackageUseCase } from "../../application/package/RemoveNatureFromPackageUseCase.js";
import { GenerateQuoteUseCase } from "../../application/package/GenerateQuoteUseCase.js";
import { DeleteExpiredPackageUseCase } from "../../application/package/DeleteExpiredPackageUseCase.js";
import { CreateDepartureUseCase } from "../../application/departure/CreateDepartureUseCase.js";
import { ListDeparturesUseCase } from "../../application/departure/ListDeparturesUseCase.js";
import { GetDepartureByIdUseCase } from "../../application/departure/GetDepartureByIdUseCase.js";
import { CloseDepartureUseCase } from "../../application/departure/CloseDepartureUseCase.js";
import { UpdateDepartureStatusUseCase } from "../../application/departure/UpdateDepartureStatusUseCase.js";
import { AutoCloseDepartureUseCase } from "../../application/departure/AutoCloseDepartureUseCase.js";
import { CreatePersonUseCase } from "../../application/person/CreatePersonUseCase.js";
import { ListPersonsUseCase } from "../../application/person/ListPersonsUseCase.js";
import { GetPersonByIdUseCase } from "../../application/person/GetPersonByIdUseCase.js";
import { CreateAccountUseCase } from "../../application/account/CreateAccountUseCase.js";
import { LoginUseCase } from "../../application/account/LoginUseCase.js";
import { RefreshTokenUseCase } from "../../application/account/RefreshTokenUseCase.js";
import { CreatePaymentUseCase } from "../../application/payment/CreatePaymentUseCase.js";
import { ListPaymentsUseCase } from "../../application/payment/ListPaymentsUseCase.js";
import { AcceptPaymentUseCase } from "../../application/payment/AcceptPaymentUseCase.js";
import { RefundPaymentUseCase } from "../../application/payment/RefundPaymentUseCase.js";
import { GetPaymentByIdUseCase } from "../../application/payment/GetPaymentByIdUseCase.js";
import { GenerateInvoiceUseCase } from "../../application/payment/GenerateInvoiceUseCase.js";
import { CreateRelayUseCase } from "../../application/relay/CreateRelayUseCase.js";
import { ListRelaysUseCase } from "../../application/relay/ListRelaysUseCase.js";
import { GetRelayByIdUseCase } from "../../application/relay/GetRelayByIdUseCase.js";
import { GetDashboardUseCase } from "../../application/dashboard/GetDashboardUseCase.js";
import { CreateAddressUseCase } from "../../application/address/CreateAddressUseCase.js";
import { ListAddressesUseCase } from "../../application/address/ListAddressesUseCase.js";
import { GetAddressByIdUseCase } from "../../application/address/GetAddressByIdUseCase.js";
import { ListCurrenciesUseCase } from "../../application/reference/ListCurrenciesUseCase.js";
import { ListPaymentMethodsUseCase } from "../../application/reference/ListPaymentMethodsUseCase.js";
import { ListRolesUseCase } from "../../application/reference/ListRolesUseCase.js";
import { ListNaturesUseCase } from "../../application/reference/ListNaturesUseCase.js";
import { PackageController } from "../http/controllers/PackageController.js";
import { DepartureController } from "../http/controllers/DepartureController.js";
import { AccountController } from "../http/controllers/AccountController.js";
import { AddressController } from "../http/controllers/AddressController.js";
import { AuthController } from "../http/controllers/AuthController.js";
import { PaymentController } from "../http/controllers/PaymentController.js";
import { PersonController } from "../http/controllers/PersonController.js";
import { RelayController } from "../http/controllers/RelayController.js";
import { ReferenceController } from "../http/controllers/ReferenceController.js";
import { DashboardController } from "../http/controllers/DashboardController.js";

// ── Infrastructure services
const jobScheduler = new BullMQJobScheduler();
const pdfService = new PdfService(new PdfRenderer());

// ── Repositories
const packageRepository = new PrismaPackageRepository();
const departureRepository = new PrismaDepartureRepository();
const accountRepository = new PrismaAccountRepository();
const personRepository = new PrismaPersonRepository();
const natureRepository = new PrismaNatureRepository();
const relayRepository = new PrismaRelayRepository();
const paymentRepository = new PrismaPaymentRepository();
const addressRepository = new PrismaAddressRepository();
const currencyRepository = new PrismaCurrencyRepository();
const paymentMethodRepository = new PrismaPaymentMethodRepository();
const roleRepository = new PrismaRoleRepository();

// ── Package Use Cases
const createPackageUseCase = new CreatePackageUseCase(packageRepository,departureRepository,natureRepository,jobScheduler,paymentRepository,);
const listPackagesUseCase = new ListPackagesUseCase(packageRepository);
const getPackageByIdUseCase = new GetPackageByIdUseCase(packageRepository);
const updatePackageStatusUseCase = new UpdatePackageStatusUseCase(packageRepository,departureRepository,);
const archivePackageUseCase = new ArchivePackageUseCase(packageRepository);
const deletePackageUseCase = new DeletePackageUseCase(packageRepository);
const addNatureToPackageUseCase = new AddNatureToPackageUseCase(packageRepository,natureRepository,);
const removeNatureFromPackageUseCase = new RemoveNatureFromPackageUseCase(packageRepository,);
const generateQuoteUseCase = new GenerateQuoteUseCase(packageRepository,pdfService,);
const deleteExpiredPackageUseCase = new DeleteExpiredPackageUseCase(packageRepository,);

// ── Departure Use Cases
const createDepartureUseCase = new CreateDepartureUseCase(departureRepository,jobScheduler,);
const listDeparturesUseCase = new ListDeparturesUseCase(departureRepository);
const getDepartureByIdUseCase = new GetDepartureByIdUseCase(departureRepository,);
const closeDepartureUseCase = new CloseDepartureUseCase(departureRepository);
const updateDepartureStatusUseCase = new UpdateDepartureStatusUseCase(departureRepository,packageRepository,);
const autoCloseDepartureUseCase = new AutoCloseDepartureUseCase(departureRepository,);

// ── Person Use Cases
const createPersonUseCase = new CreatePersonUseCase(personRepository);
const listPersonsUseCase = new ListPersonsUseCase(personRepository);
const getPersonByIdUseCase = new GetPersonByIdUseCase(personRepository);

// ── Account Use Cases
const createAccountUseCase = new CreateAccountUseCase(accountRepository);
const loginUseCase = new LoginUseCase(accountRepository);
const refreshTokenUseCase = new RefreshTokenUseCase(accountRepository);

// ── Payment Use Cases
const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository,packageRepository,);
const listPaymentsUseCase = new ListPaymentsUseCase(paymentRepository);
const getPaymentByIdUseCase = new GetPaymentByIdUseCase(paymentRepository);
const acceptPaymentUseCase = new AcceptPaymentUseCase(paymentRepository);
const refundPaymentUseCase = new RefundPaymentUseCase(paymentRepository);
const generateInvoiceUseCase = new GenerateInvoiceUseCase(paymentRepository,pdfService,);

// ── Relay Use Cases
const createRelayUseCase = new CreateRelayUseCase(relayRepository);
const listRelaysUseCase = new ListRelaysUseCase(relayRepository);
const getRelayByIdUseCase = new GetRelayByIdUseCase(relayRepository);

// ── Dashboard
const getDashboardUseCase = new GetDashboardUseCase(packageRepository,paymentRepository,personRepository,);

// ── Address Use Cases
const createAddressUseCase = new CreateAddressUseCase(addressRepository);
const listAddressesUseCase = new ListAddressesUseCase(addressRepository);
const getAddressByIdUseCase = new GetAddressByIdUseCase(addressRepository);

// ── Reference Use Cases
const listCurrenciesUseCase = new ListCurrenciesUseCase(currencyRepository);
const listPaymentMethodsUseCase = new ListPaymentMethodsUseCase(paymentMethodRepository,);
const listRolesUseCase = new ListRolesUseCase(roleRepository);
const listNaturesUseCase = new ListNaturesUseCase(natureRepository);

export const container = {
  // Package
  createPackageUseCase,
  listPackagesUseCase,
  getPackageByIdUseCase,
  updatePackageStatusUseCase,
  archivePackageUseCase,
  deletePackageUseCase,
  addNatureToPackageUseCase,
  removeNatureFromPackageUseCase,
  generateQuoteUseCase,
  deleteExpiredPackageUseCase,

  // Departure
  createDepartureUseCase,
  listDeparturesUseCase,
  getDepartureByIdUseCase,
  closeDepartureUseCase,
  updateDepartureStatusUseCase,
  autoCloseDepartureUseCase,

  // Person
  createPersonUseCase,
  listPersonsUseCase,
  getPersonByIdUseCase,

  // Account
  createAccountUseCase,
  loginUseCase,
  refreshTokenUseCase,

  // Payment
  createPaymentUseCase,
  listPaymentsUseCase,
  getPaymentByIdUseCase,
  acceptPaymentUseCase,
  refundPaymentUseCase,
  generateInvoiceUseCase,

  // Relay
  createRelayUseCase,
  listRelaysUseCase,
  getRelayByIdUseCase,

  // Dashboard
  getDashboardUseCase,

  // Address
  createAddressUseCase,
  listAddressesUseCase,
  getAddressByIdUseCase,

  // Reference
  listCurrenciesUseCase,
  listPaymentMethodsUseCase,
  listRolesUseCase,
  listNaturesUseCase,

  // Controllers
  packageController: new PackageController(),
  departureController: new DepartureController(),
  accountController: new AccountController(),
  dadressController: new AddressController(),
  authController: new AuthController(),
  paymentController: new PaymentController(),
  personController: new PersonController(),
  relayController: new RelayController(),
  referenceController: new ReferenceController(),
  dashboardController: new DashboardController(),

};
