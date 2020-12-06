import {Injectable} from '@angular/core';
import {UrlAPI} from '../urlAPI';
import {HttpClient} from '@angular/common/http';
import {NecesidadCompraRequerimiento} from '../../model/necesidadCompraRequerimiento';
import {NoStockCompraRequerimiento} from '../../model/noStockCompraRequerimiento';
import {NoStockTrasladoRequerimiento} from '../../model/noStockTrasladoRequerimiento';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequerimientoService {

    constructor(private url: UrlAPI, private http: HttpClient) {
    }


    agregarRequerimientoNoStockCompra(data: NoStockCompraRequerimiento) {
        return this.http.post(this.url.getURL() + 'inventario/requerimiento/nostock/compra', data);

    }

    agregarRequerimientoNecesidadCompra(data: NecesidadCompraRequerimiento) {

        return this.http.post(this.url.getURL() + 'inventario/requerimiento/necesidad/compra', data);

    }

    agregarRequerimientNoStockTraslado(data: NoStockTrasladoRequerimiento) {
        return this.http.post(this.url.getURL() + 'inventario/requerimiento/traslado', data);
    }

    getTipo() {

        return this.http.get(this.url.getURL() + 'inventario/tipo');

    }

    cargarAlmacen() {
        return this.http.get(this.url.getURL() + 'inventario/almacen');
    }

    cargarArea() {
        return this.http.get(this.url.getURL() + 'inventario/area');
    }


    buscarProducto(nombre) {


        return this.http.get(this.url.getURL() + 'inventario/product/search/' + nombre);

    }

    buscarRequerimiento(codigo) {

        return this.http.get(this.url.getURL() + 'inventario/requerimiento/' + codigo);
    }

    cargarRequerimientos() {


        return this.http.get(this.url.getURL() + 'inventario/requerimiento');
    }

    confirmarRequerimiento(codigo) {

        return this.http.get(this.url.getURL() + 'inventario/requerimiento/confirmar/' + codigo)
    }


    confirmarRequerimientoReciboTraslado(codigo) {

        return this.http.get(this.url.getURL() + 'inventario/requerimiento/confirmar/recibido/' + codigo);
    }


    cargarTodosRequerimientos(): Observable<any> {


        return this.http.get(this.url.getURL() + 'inventario/requerimiento/todo');
    }

    cargarSalida(): Observable<any> {

        return this.http.get(this.url.getURL() + 'inventario/salida');

    }

    cargarEntrada(): Observable<any> {
        return this.http.get(this.url.getURL() + 'inventario/entrada');
    }

    buscarSalida(codigo: string): Observable<any> {


        return this.http.get(this.url.getURL() + 'inventario/salida/' + codigo);
    }

    buscarEntrada(codigo, codigo2): Observable<any> {

        return this.http.get(this.url.getURL() + 'inventario/entrada/' + codigo + '/' + codigo2);
    }

    confirmarSalida(codigo, data) {
        return this.http.put(this.url.getURL() + 'inventario/salida/confirmar/' + codigo, data);
    }

    confirmarEntrada(codigo: number, s: string) {


        const empleado = {
            idEmpleado: s
        }

        return this.http.post(this.url.getURL() + 'inventario/entrada/confirmar/' + codigo, empleado);

    }
}
