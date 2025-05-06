import {BaseEntity} from "./base-entity";

export class Criterion extends BaseEntity {
    name: string;
    description: string;
    weight: number;

}
