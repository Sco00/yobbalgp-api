import { PackageStates } from "../../enums/PackageStates.js";
export class Package {
    constructor(props) {
        var _a, _b, _c;
        if ('id' in props)
            this.id = props.id;
        this.reference = props.reference;
        this.weight = props.weight;
        if ('isCompleted' in props)
            this.isCompleted = props.isCompleted;
        if ('isArchived' in props)
            this.isArchived = props.isArchived;
        this.creatorId = props.creatorId;
        this.personId = props.personId;
        this.relayId = (_a = props.relayId) !== null && _a !== void 0 ? _a : null;
        this.departureGpId = props.departureGpId;
        if ('createdAt' in props)
            this.createdAt = props.createdAt;
        if ('natures' in props)
            this.natures = (_b = props.natures) !== null && _b !== void 0 ? _b : [];
        if ('statuses' in props)
            this.statuses = (_c = props.statuses) !== null && _c !== void 0 ? _c : [];
    }
    getCurrentStatus() {
        if (!this.statuses || this.statuses.length === 0)
            return PackageStates.EN_ATTENTE;
        const sorted = [...this.statuses].sort((a, b) => { var _a, _b, _c, _d; return ((_b = (_a = b.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = a.createdAt) === null || _c === void 0 ? void 0 : _c.getTime()) !== null && _d !== void 0 ? _d : 0); });
        return sorted[0].state;
    }
    canBeArchived() {
        const current = this.getCurrentStatus();
        return (current === PackageStates.LIVRE || current === PackageStates.RETOURNE);
    }
    canBeDeleted() {
        return this.getCurrentStatus() === PackageStates.EN_ATTENTE;
    }
}
//# sourceMappingURL=Package.js.map