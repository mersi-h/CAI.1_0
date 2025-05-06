import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from "@angular/router";
import {Role} from "../../model/role";
import {User} from "../../model/user";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor(private router: Router) {
        TokenStorageService.loggedIn.next(!!sessionStorage.getItem(TOKEN_KEY));
    }

    public static loggedIn: Subject<any> = new Subject;

    private userRoleSubject = new BehaviorSubject<Role | null>(null);
    userRole$ = this.userRoleSubject.asObservable();
    signOut(): void {
        this.userRoleSubject.next(null);
        window.sessionStorage.clear();
        TokenStorageService.loggedIn.next(!!sessionStorage.getItem(TOKEN_KEY));
        window.sessionStorage.removeItem(TOKEN_KEY);
        this.router.navigate(['login']);
    }

    public saveToken(token: string): void {
        sessionStorage.setItem('jwtToken', token)
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return sessionStorage.getItem(TOKEN_KEY);

    }
    logout(): void {
        localStorage.removeItem('token');
    }

    public saveUser(user): void {
        console.log(user);
        // window.sessionStorage.clear();
        // window.sessionStorage.removeItem(TOKEN_KEY);
        // window.sessionStorage.removeItem(USER_KEY);
        this.userRoleSubject.next(user.role ? user.role : null);
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): User {
        const user = sessionStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }
}
