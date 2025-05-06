import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {LoginRequest} from "../../model/LoginRequest";
import {RegisterRequest} from "../../model/RegisterRequest";


@Injectable({
    providedIn: 'root'
})
export class LogInService extends BaseService {

    private API_PRODUCT = '/auth/login';
    private API_REGISTER = '/auth/register';

    constructor(http: HttpClient) {
        super(http);
    }

    public authenticateUser(loginRequest: LoginRequest): Observable<any> {
        return this.http.post<any>(this.BASE_URL + this.API_PRODUCT, loginRequest);
    }

    registerUser(registerRequest: RegisterRequest): Observable<any> {
        return this.http.post<any>(this.BASE_URL + this.API_REGISTER, registerRequest);
    }

    getToken(): string | null {
        return sessionStorage.getItem('jwtToken');
    }

}
