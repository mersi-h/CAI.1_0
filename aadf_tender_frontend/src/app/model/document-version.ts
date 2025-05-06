import {Offer} from "./Offer";
import {Tender} from "./Tender";
import {User} from "./user";
import {BaseEntity} from "./base-entity";

export class DocumentVersion extends BaseEntity {
    docType: string;
    url: string;
    version: number;
    uploadedAt: Date;
    uploadedBy: User;
    tender?: Tender;
    offer?: Offer;
}
