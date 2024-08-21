export class User {
    public id!: String;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public role: string
    ){}
}