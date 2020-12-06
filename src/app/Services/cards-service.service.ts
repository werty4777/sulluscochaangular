import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlAPI} from './urlAPI';


@Injectable({
    providedIn: 'root'
})
export class CardsServiceService {



    constructor(private http: HttpClient, private URL: UrlAPI) {
    }

    getCountRequerimientos() {



        return this.http.get(this.URL.getURL() + 'inventario/requerimiento/count');

    }

    getCountProductos(): Observable<any> {

        return this.http.get(this.URL.getURL() + 'inventario/product/count');
    }

    getCountEntradas() {
        return this.http.get(this.URL.getURL() + 'inventario/movimientos/count/entrada');
    }

    getCountSalidas() {

        return this.http.get(this.URL.getURL() + 'inventario/movimientos/count/salida');
    }


}
