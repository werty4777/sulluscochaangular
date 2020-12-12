import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlAPI {


    getURL(): string {
        return '  https://8ee61499cdb2.ngrok.io/';
    }
}
