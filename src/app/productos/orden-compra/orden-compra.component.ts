import {Component, OnInit} from '@angular/core';
import {OrderServiceService} from '../../Services/product/orderProduct/order-service.service';
import {RequerimientoService} from '../../Services/Requerimiento/requerimiento.service';
import {DetallesOrden, OrdenCompra} from '../../model/ordenCompra';
import {DetallesOrdenNostock, OrdenCompraNoStock} from '../../model/ordenCompraNoStock';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-orden-compra',
    templateUrl: './orden-compra.component.html',
    styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {

    displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'precioUnitario', 'descuento', 'subtotal', 'confirmar'];

    tipoRequerimiento: any;


    selectedValue: string;
    monedas: string[] = ['PEN', 'USD'];

    requerimientoSeleccionado;
    comboRequerimientos: any;
    datareq: any = [];
    compra: DetallesOrden[] = [];
    nostock: DetallesOrdenNostock[] = [];


    grupo: FormGroup = new FormGroup({

        codigo: new FormControl(),
        numeroComprobante: new FormControl(),
        fecha: new FormControl(),
        fechaEntrega: new FormControl(),
        direccionEntrega: new FormControl(),
        moneda: new FormControl(),
        condicionPago: new FormControl(),
        formaPago: new FormControl(),
        observaciones: new FormControl(),
        ruc: new FormControl(),
        nombre: new FormControl(),
        correo: new FormControl(),
        telefono: new FormControl(),
        direccion: new FormControl(),
        req: new FormControl()

    });

    constructor(public dialog: MatDialog, private http: OrderServiceService, private requerimentoService: RequerimientoService) {


    }

    async ngOnInit() {


        await this.cargarComboRequerimiento();

    }

    async cargarDetallesRequerimiento(req) {

        this.compra = [];
        this.nostock = [];


        await this.requerimentoService.buscarRequerimiento(req.codigo).subscribe(value => {


            this.datareq = value;
            this.tipoRequerimiento = req.tipoOrden;
            console.log(this.datareq)
            console.log(this.tipoRequerimiento)

        })


    }

    async cargarComboRequerimiento() {


        await this.requerimentoService.cargarRequerimientoOrdenDeCompraListCombo().subscribe(value => {

            this.comboRequerimientos = value;

        })
    }

         confirmarOrden() {

        const fechatemp = new Date();
        const fecha = fechatemp.getFullYear() + '/' + fechatemp.getMonth() + '/' + fechatemp.getDay();


        const fechaentrega = new Date(this.grupo.controls.fechaEntrega.value);
        const fechanueva = fechaentrega.getFullYear() + '/' + fechaentrega.getMonth() + '/' + fechaentrega.getDay();

        if (this.tipoRequerimiento === 'NECESIDAD') {

            const dato: OrdenCompra = {
                detallesOrdenNuevo: this.compra,
                proveedor: {
                    nombre: this.grupo.controls.nombre.value,
                    correo: this.grupo.controls.correo.value,
                    phone: this.grupo.controls.telefono.value,
                    ruc: this.grupo.controls.ruc.value,
                    telefono: this.grupo.controls.telefono.value,
                    direccion: this.grupo.controls.direccion.value

                },
                codigoRequerimiento: this.grupo.controls.req.value,
                condicionPago: this.grupo.controls.condicionPago.value,
                direccionEntrega: this.grupo.controls.direccionEntrega.value,
                fecha: fecha,
                fechaEntrega: fechanueva,
                formaPago: this.grupo.controls.formaPago.value,
                moneda: this.grupo.controls.moneda.value,
                numeroComprobante: this.grupo.controls.numeroComprobante.value,
                observaciones: this.grupo.controls.observaciones.value,


            }

            console.log(dato);
             this.http.ordenCompraNuevo(dato).subscribe(value => {
                 alert("Orden Confirmada");

            })
            this.dialog.closeAll();
        }

        if (this.tipoRequerimiento === 'NOSTOCKCOMPRA') {

            const dato: OrdenCompraNoStock = {
                detallesOrdenNoStocks: this.nostock,
                proveedor: {
                    nombre: this.grupo.controls.nombre.value,
                    correo: this.grupo.controls.correo.value,
                    phone: this.grupo.controls.telefono.value,
                    ruc: this.grupo.controls.ruc.value,
                    telefono: this.grupo.controls.telefono.value,
                    direccion: this.grupo.controls.direccion.value

                },
                codigoRequerimiento: this.grupo.controls.req.value,
                condicionPago: this.grupo.controls.condicionPago.value,
                direccionEntrega: this.grupo.controls.direccionEntrega.value,
                fecha: fecha,
                fechaEntrega: fechanueva,
                formaPago: this.grupo.controls.formaPago.value,
                moneda: this.grupo.controls.moneda.value,
                numeroComprobante: this.grupo.controls.numeroComprobante.value,
                observaciones: this.grupo.controls.observaciones.value,

            }


             this.http.ordenNoStockNuevo(dato).subscribe(value => {
                alert("Orden Confirmada");
            });
            this.dialog.closeAll();
        }

    }

    test(precio: HTMLInputElement, descuento: HTMLInputElement, boton: HTMLInputElement, codigo, iddetalle, index, codigonuevo) {


        //compra


        console.log()
        console.log(descuento.disabled)


        if (descuento.disabled == false && precio.disabled == false) {
            descuento.disabled = true;
            precio.disabled = true;

            boton.value = 'desconfirmar';

            if (this.tipoRequerimiento == 'NECESIDAD') {
                this.compra.push({
                    idDetalleRequerimiento: iddetalle,
                    descuento: Number(descuento.value),
                    idProducto: codigonuevo,
                    precioUnitario: Number(precio.value)

                });
            }

            if (this.tipoRequerimiento == 'NOSTOCKCOMPRA') {
                this.nostock.push({
                    idDetalle: iddetalle,
                    descuento: Number(descuento.value),
                    precioUnitario: Number(precio.value)
                })

                console.log(this.nostock);
            }


        } else if (descuento.disabled == true && precio.disabled == true) {
            descuento.disabled = false;
            precio.disabled = false;
            boton.value = 'confirmar';

            if (this.tipoRequerimiento === 'NECESIDAD') {
                this.compra = this.compra.filter((value, index1) => {

                    if (index1 == index) {
                        return false;
                    } else {
                        return true;
                    }

                });
            }
            if (this.tipoRequerimiento === 'NOSTOCKCOMPRA') {
                this.nostock = this.nostock.filter((value, index1) => {
                    if (index1 == index) {
                        return false;
                    } else {
                        return true;
                    }
                });


            }

        }

        console.log(this.compra);
        console.log(this.nostock);
    }
}
