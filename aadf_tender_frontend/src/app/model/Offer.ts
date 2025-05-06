import {Tender} from "./Tender";
import {User} from "./user";
import {BaseEntity} from "./base-entity";

export class Offer extends BaseEntity {

    tender: Tender;
    vendor: User;
    documentUrl: string;
    submittedAt: string;
    visible: boolean;

}
