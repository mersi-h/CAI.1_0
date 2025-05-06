import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class BaseService {

    public BASE_URL = 'http://localhost:8080/teamFinder';

    constructor(public http: HttpClient) { }

    protected replacer(key, value) {
        if (value instanceof Object) {
            const remoteClass: string = value.constructor.prototype.remoteclass;
            if (remoteClass) {
                value['remote_class'] = remoteClass;
            }
        }
        return value;
    }
}
