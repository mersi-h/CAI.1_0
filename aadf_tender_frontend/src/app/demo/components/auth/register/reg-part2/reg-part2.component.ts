import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {RouterOutlet} from "@angular/router";
import {StepsModule} from "primeng/steps";
import {MenuItem} from "primeng/api";
import {UserInformation} from "../../../../classes/user-information";

@Component({
  selector: 'app-reg-part2',
  standalone: true,
    imports: [
        ButtonModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        RouterOutlet,
        StepsModule
    ],
  templateUrl: './reg-part2.component.html',
  styleUrl: './reg-part2.component.scss'
})
export class RegPart2Component {

    routeItems: MenuItem[] = [
        { label: 'Personal Information', routerLink: 'personal' },
        { label: 'Skills', routerLink: 'skills' },
        { label: 'Confirmation', routerLink: 'confirmation' },
    ];

    public userInformation: UserInformation = new UserInformation();

    constructor() {

    }

    onRegister() {

    }

    redirectToLogin() {

    }
}
