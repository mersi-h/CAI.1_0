import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {TokenStorageService} from "./service/token-storage.service";
import {Role} from "../model/role";
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    items: MenuItem[] = [];
    private role: Role;

    constructor(public layoutService: LayoutService,
                private readonly tokenStorage: TokenStorageService,) {
    }

    ngOnInit() {
        this.tokenStorage.userRole$.subscribe(role => {
            console.log(role);
            this.items = this.getMenuItems(role);
        });
        console.log(this.role);

    }

    private getMenuItems(role: Role): MenuItem[] {
        this.model = [
            {
                label: 'Home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard']}
                ]
            },
            ...(role === Role.ADMIN
                    ? [{
                        label: 'Procurement Officers',
                        items: [
                            { label: 'Users', icon: 'pi pi-users', routerLink: ['/home/users'] }
                        ]
                    }]
                    : []
            ),
            {
                label: 'Tender Management',
                items: [
                    // {label: 'New Tender', icon: 'pi pi-fw pi-users', routerLink: ['/home/tenders/new']},
                    ...(role === Role.PROCUREMENT_OFFICER
                            ? [{ label: 'New Tender', icon: 'pi pi-fw pi-users', routerLink: ['/home/tenders/new'] }]
                            : []
                    ),
                    {label: 'Active Tenders', icon: 'pi pi-fw pi-users', routerLink: ['/home/tenders/active']},
                    // {label: 'Completed Tenders', icon: 'pi pi-fw pi-map', routerLink: ['/home/tenders/completed']},
                    ...(role === Role.PROCUREMENT_OFFICER
                            ? [{ label: 'Completed Tenders', icon: 'pi pi-fw pi-map', routerLink: ['/home/tenders/completed'] }]
                            : []
                    )
                ]
            },
            {
                label: 'Evaluation',
                items: [
                    {
                        label: 'Pending Reviews',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/home/evaluation/pending-reviews']
                    },
                    {
                        label: 'Evaluation Dashboard',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/home/evaluation/evaluation-dashboard']
                    },
                    {
                        label: 'Generate Reports',
                        icon: 'pi pi-fw pi-map',
                        routerLink: ['/home/evaluation/generate-reports']
                    },
                ]
            },{
                        label: 'Vendors',
                        items: [
                            {
                                label: 'Vendor Directory',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/home/vendors/vendor-directory']
                            },
                            {
                                label: 'Submissions',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/home/vendors/submissions']
                            },
                            {label: 'My offers', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/home/vendors/my-offers']},
                        ]
                    },

            {
                label: 'Settings',
                items: [
                    {label: 'Audit Log', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/home/audit-logs']},
                ]
            },
        ];
        return this.model;
    }
}
