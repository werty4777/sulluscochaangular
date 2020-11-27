import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CardsServiceService {

    const
    URL = 'https://b18e5634e8b2.ngrok.io/inventario/';

    constructor(private http: HttpClient) {
    }

    getCountRequerimientos() {



        return this.http.get(this.URL + 'requerimiento/count');

    }

    getCountProductos(): Observable<any> {

        return this.http.get(this.URL + 'product/count');
    }

    getCountEntradas() {
        return this.http.get(this.URL + 'movimientos/count/entrada');
    }

    getCountSalidas() {

        return this.http.get(this.URL + 'movimientos/count/salida');
    }

}
