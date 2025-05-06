import {Role} from "./role";

export class RegisterRequest {

    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: Role;
}
