import {Component, OnInit} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import {DataView} from 'primeng/dataview';
import {Product} from 'src/app/demo/api/product';
import {ProductService} from 'src/app/demo/service/product.service';
import {TeamsService} from "../../../service/teams.service";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector:'app-list-demo',
    templateUrl: './listdemo.component.html',
    providers: [MessageService]
})
export class ListDemoComponent implements OnInit {

    users: any[] = [];
    userTeams: any[] = [];
    prod: Product[] = [];
    searchName = '';

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];
    displayDialog = false;
    selectedDialog: any = {};
    representatives: any;
    statuses: any;
    activityValues: any;

    bestTeam: boolean = false;
    constructor(private productService: ProductService,
                private messageService: MessageService,
                private userService: UserService,
                private teamsService: TeamsService,
                private readonly router: Router,
                private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {

        this.activatedRoute.queryParams.subscribe(data => {
            if (data['bestTeam']) {
                this.bestTeam = data['bestTeam'] === 'true';
                this.getBestTeams();
            } else {
                this.bestTeam = false;
            }
        })

        this.productService.getProducts().then(data => this.users = data);

        this.sortOptions = [
            {label: 'Sort by Age', value: 'age'},
            {label: 'Sort by Location', value: 'loc'},
            {label: 'Sort by Profession', value: 'prof'}
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    viewMembers(el) {
        this.displayDialog = true;
        this.selectedDialog = el;
        this.getUsers(el.id);
    }

    onGlobalFilter($event: Event) {

    }

    clear() {

    }

    getBestTeams() {
        this.teamsService.getGroupedMembers().subscribe({
            next: (data) => {
                this.userTeams = data;
                console.log(data)
            },
            error: (err) => console.log(err)
        })
    }

    getDescription(users: any[]): string {
        let descr: string = '';
        let professions: string[] = [];
        let iterationCount: number = 0;
        const maxIterations: number = 3;

        users.forEach((el: any) => {
            if (iterationCount >= maxIterations) {
                return;
            }

            if (!professions.includes(el.position)) {
                professions.push(el.position);
            }

            iterationCount++;
        });

        descr = professions.join(', ');
        return descr + ', etc.';
    }

    getTeamsByUsername() {
        this.userService.getTeamsByUsername(this.searchName).subscribe({
            next: (data) => {
                this.userTeams = data;
                this.userTeams.forEach(el => this.getRating(el.id))
            }
        })
    }

    getRating(id) {
        this.teamsService.getRatingsByTeamId(id).subscribe({
            next: (data) => {
                let perc = data?.likes / data?.likes + data?.dislikes;
                this.userTeams.find(el => el.id == id).rating = 5 * perc / 100;
            }
        });
    }

    getUsers(id) {
        this.teamsService.getUsersOfTeam(id).subscribe({
            next: (data) => this.users = data
        });
    }

    onSendRequest() {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Invitation Sent', life: 3000});
        this.displayDialog = false;
        this.userTeams = this.userTeams.filter(el => el.id != this.selectedDialog.id);
    }

    rateTeam(ev) {
        this.selectedDialog.rating = ev?.value;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Rating Sent', life: 3000});
        this.displayDialog = false;
    }
}
