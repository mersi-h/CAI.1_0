import {BaseEntity} from "./base-entity";
import {User} from "./user";

export class AuditLog extends BaseEntity {
    username: string;
    action: string;

    details: string;

    tenderId: any;
    notes?: any;

    eventTime: Date;


}
