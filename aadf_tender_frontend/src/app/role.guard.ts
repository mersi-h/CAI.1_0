import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, take} from "rxjs";
import {TokenStorageService} from "./layout/service/token-storage.service";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    constructor(private authService: TokenStorageService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        const expectedRole = route.data['expectedRole'];

        return this.authService.userRole$.pipe(
            take(1),
            map((role) => {
                if (role !== expectedRole) {
                    this.router.navigate(['access-denied']);
                    return false;
                }
                return true;
            })
        );
    }
}
