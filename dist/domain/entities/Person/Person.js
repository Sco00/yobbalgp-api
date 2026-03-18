export class Person {
    constructor(props) {
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
        this.mobile = props.mobile;
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