import {BaseEntity} from "./base-entity";
import {Offer} from "./Offer";
import {User} from "./user";

export class Evaluation extends BaseEntity{

    offer: Offer;
    evaluator: User;
    criterionScores: { [criterionName: string]: number };
    comments: string;
    scoredAt: string;
}
