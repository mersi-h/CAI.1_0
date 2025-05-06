import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../model/LoginRequest";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TeamsService extends BaseService {
    public API_PRODUCT = '/teams-ml';
    public API_PRODUCT1 = '/teamFinder/team';
    public API_PRODUCT2 = '/teamFinder/user';

    constructor(http: HttpClient) {
        super(http);
    }

    public getGroupedMembers(): Observable<any> {
        return this.http.get<any>('http://localhost:8080' + this.API_PRODUCT + '/groups');
    }

    public getRatingsByTeamId(id): Observable<any> {
        return this.http.get<any>('http://localhost:8080' + this.API_PRODUCT1 + `/getRatings-team/${id}`);
    }

    public getUsersOfTeam(id): Observable<any> {
        return this.http.get<any>('http://localhost:8080' + this.API_PRODUCT2 + `/user-teams/${id}`);
    }
}
