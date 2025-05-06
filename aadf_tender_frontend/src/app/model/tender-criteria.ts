import {Tender} from "./Tender";
import {Criterion} from "./criterion";
import {BaseEntity} from "./base-entity";

export class TenderCriteria extends BaseEntity {

    tender: Tender;

    criterion: Criterion;
}
