import { Component } from '@angular/core';
import {Team} from "../../../classes/team";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CalendarModule} from "primeng/calendar";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-team-create',
  standalone: true,
    imports: [
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputGroupAddonModule,
        InputGroupModule,
        InputMaskModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        MultiSelectModule,
        ReactiveFormsModule,
        FormsModule
    ],
  templateUrl: './team-create.component.html',
  styleUrl: './team-create.component.scss'
})
export class TeamCreateComponent {

    public team: Team = new Team();



}
