import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent {

    options: any;

    overlays: any[];


    constructor(public layoutService: LayoutService, public router: Router) {
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 12
        };
    }

}
