import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {RegPart2Component} from "./register/reg-part2/reg-part2.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login if no other params
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'register', component: RegisterComponent},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
