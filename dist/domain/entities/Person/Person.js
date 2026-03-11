export class Person {
    constructor(props) {
        var _a;
        if ('id' in props)
            this.id = props.id;
        if ('createdAt' in props)
            this.createdAt = props.createdAt;
        if ('personType' in props)
            this.personType = props.personType;
        if ('account' in props)
            this.account = props.account;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.mobile = (_a = props.mobile) !== null && _a !== void 0 ? _a : null;
        this.personTypeId = props.personTypeId;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    hasAccount() {
        return !!this.account;
    }
}
//# sourceMappingURL=Person.js.map