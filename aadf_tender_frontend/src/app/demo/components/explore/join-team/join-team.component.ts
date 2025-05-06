import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DataView, DataViewModule} from "primeng/dataview";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {NgForOf, NgIf} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {RippleModule} from "primeng/ripple";
import {SelectItem, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Product} from "../../../api/product";
import {ProductService} from "../../../service/product.service";
import {TokenStorageService} from "../../../../layout/service/token-storage.service";

@Component({
  selector: 'app-join-team',
  standalone: true,
    imports: [
        ButtonModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        MultiSelectModule,
        NgForOf,
        RatingModule,
        RippleModule,
        SharedModule,
        TableModule,
        NgIf
    ],
  templateUrl: './join-team.component.html',
  styleUrl: './join-team.component.scss'
})
export class JoinTeamComponent implements OnInit{

    users: any[] = [];
    prod: Product[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];
    displayDialog = false;
    representatives: any;
    statuses: any;
    activityValues: any;
    public role: string;


    c = Math.floor(Math.random()* (15 - 3 + 1)) + 3;


    constructor(private productService: ProductService,
                private readonly tokenStorage: TokenStorageService) {
    }

    ngOnInit() {

        this.role = this.tokenStorage.getUser().role;

        this.productService.getProducts().then(data => {
            this.users = data;
        });

        this.users.forEach(e => {
            const c = this.getRandomNumber(0,15);
            e.description = 'There are'+ c +'available spots.'

        })
        this.sortOptions = [
            {label: 'Sort by Age', value: 'age'},
            {label: 'Sort by Location', value: 'loc'},
            {label: 'Sort by Profession', value: 'prof'}
        ];
    }

    getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    viewMembers() {
        this.displayDialog = true;
    }

    onGlobalFilter($event: Event) {

    }

    clear() {

    }
}
