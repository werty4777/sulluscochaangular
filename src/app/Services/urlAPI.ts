import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlAPI {


    getURL(): string {
        return ' https://6cbb66ef66fe.ngrok.io/';
    }
}
