import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {TeamCreateComponent} from "./demo/components/teams/team-create/team-create.component";
import {ListDemoComponent} from "./demo/components/uikit/list/listdemo.component";
import {JoinTeamComponent} from "./demo/components/explore/join-team/join-team.component";
import {LoginComponent} from "./demo/components/auth/login/login.component";
import {RegisterComponent} from "./demo/components/auth/register/register.component";
import {CrudComponent} from "./demo/components/pages/crud/crud.component";
import {AuthGuard} from "./auth.guard";
import {DashboardComponent} from "./demo/components/dashboard/dashboard.component";
import {EventsComponent} from "./demo/components/explore/events/events.component";
import {NewTenderComponent} from "./demo/components/new-tender/new-tender.component";
import {ActiveTendersComponent} from "./demo/components/active-tenders/active-tenders.component";
import {CompletedTendersComponent} from "./demo/components/completed-tenders/completed-tenders.component";
import {PendingReviewsComponent} from "./demo/components/pending-reviews/pending-reviews.component";
import {EvaluationDashboardComponent} from "./demo/components/evaluation-dashboard/evaluation-dashboard.component";
import {GenerateReportsComponent} from "./demo/components/generate-reports/generate-reports.component";
import {RoleGuard} from "./role.guard";
import {Role} from "./model/role";
import {VendorDirectoryComponent} from "./demo/components/vendor-directory/vendor-directory.component";
import {SubmissionsComponent} from "./demo/components/submissions/submissions.component";
import {MyOffersComponent} from "./demo/components/my-offers/my-offers.component";
import {SubmittedOffersComponent} from "./demo/components/submitted-offers/submitted-offers.component";
import {
    TenderManagementComponent
} from "./demo/components/tender-management/tender-management/tender-management.component";
import {ShareTendersComponent} from "./demo/components/tender-management/share-tenders/share-tenders.component";
import {UsersComponent} from "./demo/components/users/users.component";
import {AuditLogComponent} from "./demo/components/audit-log/audit-log.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    // { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
    // { path: 'team-create', component: TeamCreateComponent},
    // { path: 'invite-members', component: CrudComponent },
    // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule)},
    // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule)},
    // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule)},
    // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule)},
    // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule)},
    // { path: 'search-team', component: ListDemoComponent},
    // { path: 'join-team', component: JoinTeamComponent},
    // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)},
    // { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)},
    { path: 'register', component: RegisterComponent},
    { path: 'access-denied', component: NotfoundComponent},
    { path: 'home', component: AppLayoutComponent,canActivate: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'users', component: UsersComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: Role.ADMIN}},
                    { path: 'team-create', component: TeamCreateComponent},
                    { path: 'tenders/new', component: NewTenderComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: Role.PROCUREMENT_OFFICER}},
                    { path: 'tenders/active', component: ActiveTendersComponent},
                    { path: 'tenders/completed', component: CompletedTendersComponent,canActivate: [AuthGuard, RoleGuard], data: {expectedRole: Role.PROCUREMENT_OFFICER}},
                    // { path: 'tenders/completed', component: CompletedTendersComponent},
                    { path: 'evaluation/pending-reviews', component: PendingReviewsComponent},
                    { path: 'evaluation/evaluation-dashboard', component: EvaluationDashboardComponent},
                    { path: 'evaluation/generate-reports', component: GenerateReportsComponent},
                    { path: 'evaluation/generate-reports', component: GenerateReportsComponent},
                    { path: 'evaluation/generate-reports', component: GenerateReportsComponent},
                    { path: 'vendors/vendor-directory', component: VendorDirectoryComponent},
                    { path: 'vendors/submissions', component: SubmissionsComponent},
                    { path: 'vendors/my-offers', component: MyOffersComponent},
                    { path: 'invite-members', component: CrudComponent },
                    { path: 'event', component: EventsComponent },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule)},
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule)},
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule)},
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule)},
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule)},
                    { path: 'search-team', component: ListDemoComponent},
                    { path: 'join-team', component: JoinTeamComponent},
                    { path: 'event/submitted/offers', component: SubmittedOffersComponent},
                    { path: 'event/offers', component: MyOffersComponent},
                    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)},
                    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)},
                    { path: 'active-tenders', component: TenderManagementComponent},
                    { path: 'share-tender', component: ShareTendersComponent},
                    { path: 'audit-logs', component: AuditLogComponent},
                    // { path: 'search-members', component: SearchMembersComponent },
                ]},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes,  { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
