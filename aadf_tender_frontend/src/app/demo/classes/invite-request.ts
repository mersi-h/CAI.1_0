import {User} from "../../model/user";
import {Status} from "./status";

export class InviteRequest {
    public id: number;
    public sender: User;
    public receiver: User;
    public status: Status;

    constructor() {
    }
}
