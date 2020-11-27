import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderModel} from './models/orderModel';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderServiceService {

    const
    URL = 'http://b18e5634e8b2.ngrok.io/inventario/';

    constructor(private http: HttpClient) {
    }


    guardarOrdenCompra(orden: OrderModel): Observable<any> {

        return this.http.post(this.URL + '/product/orden', orden);

    }

}
