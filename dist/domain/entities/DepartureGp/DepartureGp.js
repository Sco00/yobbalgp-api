export class DepartureGp {
    constructor(props) {
        var _a, _b, _c, _d;
        if ('id' in props)
            this.id = props.id;
        this.departureDate = props.departureDate;
        this.deadline = props.deadline;
        this.price = props.price;
        this.priceGp = props.priceGp;
        this.currencyId = props.currencyId;
        this.departureAddressId = props.departureAddressId;
        this.destinationAddressId = props.destinationAddressId;
        this.personId = (_a = props.personId) !== null && _a !== void 0 ? _a : undefined;
        this.creatorId = props.creatorId;
        this.insurancePrice = (_b = props.insurancePrice) !== null && _b !== void 0 ? _b : undefined;
        if ('isClosed' in props)
            this.isClosed = props.isClosed;
        else
            this.isClosed = false;
        if ('arrivalDate' in props)
            this.arrivalDate = (_c = props.arrivalDate) !== null && _c !== void 0 ? _c : undefined;
        if ('createdAt' in props)
            this.createdAt = props.createdAt;
        if ('currency' in props)
            this.currency = props.currency;
        if ('departureAddress' in props)
            this.departureAddress = props.departureAddress;
        if ('destinationAddress' in props)
            this.destinationAddress = props.destinationAddress;
        if ('person' in props)
            this.person = (_d = props.person) !== null && _d !== void 0 ? _d : undefined;
        if ('creator' in props)
            this.creator = props.creator;
        if ('packages' in props)
            this.packages = props.packages;
    }
    canBeClosed() {
        return !this.isClosed;
    }
    isDeadlinePassed() {
        return this.deadline < new Date();
    }
    canAddPackage() {
        return !this.isClosed && !this.isDeadlinePassed();
    }
}
//# sourceMappingURL=DepartureGp.js.map