import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderModel} from './models/orderModel';
import {Observable} from 'rxjs';
import {UrlAPI} from '../../urlAPI';

@Injectable({
    providedIn: 'root'
})
export class OrderServiceService {


    constructor(private http: HttpClient, private URL: UrlAPI) {
    }


    guardarOrdenCompra(orden: OrderModel): Observable<any> {

        return this.http.post(this.URL.getURL() + 'inventario/product/orden', orden);

    }

}
