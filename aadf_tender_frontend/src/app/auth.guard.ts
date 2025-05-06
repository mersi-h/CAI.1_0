import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {TokenStorageService} from "./layout/service/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: TokenStorageService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {


        if (this.authService.getUser() != null && this.authService.getToken()!=null) {
            return true;
        }

        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
