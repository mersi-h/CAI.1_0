import {BaseEntity} from "./base-entity";
import {Tender} from "./Tender";
import {Offer} from "./Offer";
import {User} from "./user";

export class Descision extends BaseEntity {

    tender: Tender;

    winningOffer: Offer;

    decidedBy: User;

    decidedAt: Date;

    comment: string;
}
