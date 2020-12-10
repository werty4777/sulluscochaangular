import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlAPI {


    getURL(): string {
        return ' https://3f5257d7dc34.ngrok.io/';
    }
}
