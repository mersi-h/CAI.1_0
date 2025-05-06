import {User} from "./user";
import {BaseEntity} from "./base-entity";
import {a} from "@fullcalendar/core/internal-common";

export class Tender extends BaseEntity {

    subject: string;
    scope: string;
    subcontracting: any; // assume this is an enum in TS
    jointVentures: any;   // assume this is an enum in TS
    progressPayments: string;
    siteVisit: string;
    numBidsAllowed: number;
    bidOpen: Date;
    deadline: Date;
    ceilingFund: number;
    description: string;
    area: any;
    qualifications: any[];
    companyExperience: string;
    published: boolean;
    createdBy: User;

    // linked vendor
    vendorWinner: any;
    startedDate: Date
    finishedDate: Date;
    winningBid: any;
    status: any;

}
