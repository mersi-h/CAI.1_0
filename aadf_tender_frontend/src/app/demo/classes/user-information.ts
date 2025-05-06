import {User} from "../../model/user";

export class UserInformation {

    public id: number;
    public age: number;
    public gender: string;
    public qualification: string;
    public education: string;
    public profession: string;
    public position: string;
    public company: string;
    public experience: number;
    public location: string;
    public user: User;

    constructor() {
    }
}
