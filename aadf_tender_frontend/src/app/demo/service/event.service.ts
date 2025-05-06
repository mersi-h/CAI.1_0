import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";

@Injectable()
export class EventService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
    }

    getEvents() {
        return this.http.get('assets/demo/data/calendarevents.json')
            .toPromise()
            .then((res: any) => res.data) // Assuming the response structure has a 'data' property
            .catch(error => {
                console.error('An error occurred', error); // Handle error properly
                throw error; // Rethrow the error to propagate it
            });
    }
}
