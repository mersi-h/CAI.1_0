import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../../api/customer";
import {BaseService} from "../base.service";
import {Observable} from "rxjs";
import {UserInformation} from "../../classes/user-information";
import {Tender} from "../../../model/Tender";

@Injectable({
    providedIn: 'root'
})
export class TenderService extends BaseService {

    public API_PRODUCT = '/api/tenders';


    public getTenderById(tenderId: number): Observable<any> {
        return this.http.get<any>(this.BASE_URL + this.API_PRODUCT + '/id' + tenderId);
    }

    public saveTenderInfo(tender: Tender): Observable<any> {
        return this.http.post<any>(this.BASE_URL + this.API_PRODUCT,  tender);
    }
}
