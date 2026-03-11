export class Account {
    constructor(props) {
        if ('id' in props)
            this.id = props.id;
        if ('createdAt' in props)
            this.createdAt = props.createdAt;
        if ('role' in props)
            this.role = props.role;
        if ('person' in props)
            this.person = props.person;
        this.email = props.email;
        this.password = props.password;
        this.personId = props.personId;
        this.roleId = props.roleId;
    }
    getFullName() {
        return this.person
            ? `${this.person.firstName} ${this.person.lastName}`
            : '';
    }
    isAdmin() {
        var _a;
        return ((_a = this.role) === null || _a === void 0 ? void 0 : _a.name) === 'ADMIN';
    }
    isClient() {
        var _a;
        return ((_a = this.role) === null || _a === void 0 ? void 0 : _a.name) === 'CLIENT';
    }
}
//# sourceMappingURL=Account.js.map