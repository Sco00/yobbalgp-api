export class Person {
    constructor(props) {
        var _a;
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.mobile = (_a = props.mobile) !== null && _a !== void 0 ? _a : null;
        this.personTypeId = props.personTypeId;
        this.createdAt = props.createdAt;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
//# sourceMappingURL=person.types.js.map