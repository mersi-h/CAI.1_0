import {m} from "@fullcalendar/core/internal-common";
import {TeamTheme} from "./team-theme";
import {User} from "../../model/user";

export class Team {
    public id: number;
    public nrMembers: number;
    public projectNam: string;
    public description: string;
    public theme: TeamTheme;

    constructor() {
    }
}
