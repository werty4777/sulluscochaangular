import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlAPI {


    getURL(): string {
        return 'http://localhost:7890/';
    }
}
