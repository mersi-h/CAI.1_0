import {Role} from "./role";

export class User {
    public id: number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public role: Role;
    public password: string;
    public email: string;

    constructor() {
    }
}
