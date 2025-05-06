import { Component } from '@angular/core';
import {EventService} from "../../../service/event.service";
import {FullCalendarModule} from "@fullcalendar/angular";

@Component({
  selector: 'app-events',
  standalone: true,
    imports: [
        FullCalendarModule
    ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

    events: any[];

        constructor(private calendarService: EventService) { }

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents(): void {
        // this.calendarService.getEvents().subscribe(
        //     data => {
        //         this.events = data;
        //         console.log('Events fetched successfully:', this.events);
        //     },
        //     error => {
        //         console.error('Error fetching events:', error);
        //     }
        // );
    }

    // If you prefer to use async/await in the component
    async loadEventsAsync(): Promise<void> {
        try {
            // this.events = await this.calendarService.getEventsAsync();
            console.log('Events fetched successfully:', this.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

}
