import { CreatePaymentProps, PaymentWithRelations } from "./payment.types.js";

export class Payment {
  id?: string;
  amount: number;
  currencyId: string;
  amountXof: number;
  exchangeRate: number;
  paymentMethodId: PaymentWithRelations["paymentMethodId"];
  accepted: PaymentWithRelations["accepted"];
  refunded: PaymentWithRelations["refunded"];
  packageId: PaymentWithRelations["packageId"];
  creatorId: PaymentWithRelations["creatorId"];
  linkInvoice?: PaymentWithRelations["linkInvoice"];
  remise?: PaymentWithRelations["remise"];
  remiseReason?: PaymentWithRelations["remiseReason"];
  priceRelay?: PaymentWithRelations["priceRelay"];
  insurancePrice?: PaymentWithRelations["insurancePrice"];
  createdAt: PaymentWithRelations["createdAt"] | undefined;

  currency?: PaymentWithRelations["currency"];
  paymentMethod?: PaymentWithRelations["paymentMethod"];
  package?: PaymentWithRelations["package"];

  constructor(props: CreatePaymentProps | PaymentWithRelations) {
    if ("id" in props) this.id = props.id;
    this.amount = props.amount;
    this.currencyId = props.currencyId;
    this.amountXof = props.amountXof;
    this.exchangeRate = props.exchangeRate;
    this.paymentMethodId = props.paymentMethodId;
    this.accepted = 'accepted' in props ? props.accepted : false
    this.refunded = 'refunded' in props ? props.refunded : false
    this.creatorId = props.creatorId;
    this.packageId = props.packageId;
    this.linkInvoice = props.linkInvoice ?? null;
    if ("insurancePrice" in props)
      this.insurancePrice = props.insurancePrice ?? 0;
    if ("remise" in props) this.remise = props.remise ?? 0;
    if ("remiseReason" in props) this.remiseReason = props.remiseReason ?? null;
    if ("priceRelay" in props) this.priceRelay = props.priceRelay ?? 0;
    if ("createdAt" in props) this.createdAt = props.createdAt;
    if ("currency" in props) this.currency = props.currency;
    if ("paymentMethod" in props) this.paymentMethod = props.paymentMethod;
    if ("package" in props) this.package = props.package;
  }

  canBeAccepted(): boolean {
    return !this.accepted && !this.refunded;
  }

  canBeRefunded(): boolean {
    return this.accepted && !this.refunded;
  }
}
