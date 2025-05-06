import {User} from "../../model/user";

export class Skills {
    public id: number;
    public type: string;
    public experience: string;
    public qualification: string;
    public user: User;

    constructor() {
    }
}
