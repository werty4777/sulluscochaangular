import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RequerimientoService} from '../../Services/Requerimiento/requerimiento.service';
import {detallesCompraRequerimientoNecesidad, NecesidadCompraRequerimiento} from '../../model/necesidadCompraRequerimiento';
import {DatosBuscador} from '../../model/datosBuscador';
import {detallesCompraRequerimientoNoStock, NoStockCompraRequerimiento} from '../../model/noStockCompraRequerimiento';
import {NoStockTrasladoRequerimiento} from '../../model/noStockTrasladoRequerimiento';

export interface SelectOption {
    id: number;
    requerimiento: string;
}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}


@Component({
    selector: 'app-modal-requerimiento',
    templateUrl: './modal-requerimiento.component.html',
    styleUrls: ['./modal-requerimiento.component.css']
})

export class ModalRequerimientoComponent implements OnInit {
    selectedValue: string;
    selectedValue2: string;
    selectedValue3: string;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

    columnasNecesidadCompra: string[] = ['nombre', 'cantidad', 'unidad', 'color', 'talla', 'marca', 'modelo', 'tipo', 'borrar'];
    columnasNecesidadCompraFields: string[] = ['nombre', 'cantidad', 'unidad', 'color', 'talla', 'marca', 'modelo', 'tipo'];

    columnasNoStockCompra: string[] = ['codigo', 'nombre', 'cantidad', 'borrar'];
    columnasNoStockCompraFields: string[] = ['codigo', 'nombre', 'cantidad'];


    myformArray = new FormArray([
        new FormGroup({
            nombre: new FormControl('uno'),
            cantidad: new FormControl('one'),
            unidad: new FormControl('one'),
            color: new FormControl('one'),
            talla: new FormControl('one'),
            marca: new FormControl('one'),
            modelo: new FormControl('one'),
            tipo: new FormControl('one'),


        }),
    ])

    myFormArrayNoStock = new FormArray([]);

    data = this.myformArray.controls;

    dataSource = this.myFormArrayNoStock.controls;

    requerimientos: SelectOption[] = [
        {
            id: 1,
            requerimiento: 'No stock'
        },
        {

            id: 2,
            requerimiento: 'Necesidad',

        },
        {

            id: 3,
            requerimiento: 'Pedir a otro almacen',
        }
    ];


    almacen: any;
    area: any;


    tipo: any;
    estadoBuscador: boolean = false;

    datosBuscador: DatosBuscador[] = [];

    constructor(public dialog: MatDialog, private requerimentoService: RequerimientoService) {
    }

    ngOnInit(): void {
        console.log(this.almacen);
        this.requerimentoService.getTipo().subscribe(value => {

            this.tipo = value;
        });


        this.requerimentoService.cargarAlmacen().subscribe(value => {
            console.log(value)
            this.almacen = value;
        })


    }

    agregarRequerimientoNecesidad(fechaentrega, observaciones) {

        const date = new Date(fechaentrega);
        console.log(date)
        const actual = new Date();
        const fecha = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay();
        const fechaActual = actual.getFullYear() + '/' + actual.getMonth() + '/' + actual.getDay();
        const array: detallesCompraRequerimientoNecesidad[] = [];

        console.log(this.myformArray)
        this.myformArray.controls.forEach(value => {

            // @ts-ignore
            const data = value.controls;
            let a: detallesCompraRequerimientoNecesidad = {
                cantidad: data.cantidad.value,
                color: data.color.value,
                marca: data.marca.value,
                modelo: data.modelo.value,
                descripcion: data.nombre.value,
                talla: data.talla.value,
                idTipo: data.tipo.value,
                unidadMedida: data.unidad.value
            }
            array.push(a);

        })
        console.log(array);

        const dataReq: NecesidadCompraRequerimiento = {
            condicionRequerimiento: 'NECESIDAD',
            detallesRequerimiento: array,
            fechaEmision: fecha,
            fechaEntrega: fechaActual,
            observaciones: observaciones
        }

        this.requerimentoService.agregarRequerimientoNecesidadCompra(dataReq).subscribe(value => {

        }, error => {

        })
        alert('REQUERIMIENTO GUARDADO CON EXITO')
        this.dialog.closeAll();

    }

    agregarRequerimientoNoStockCompra(fechaentrega, observaciones) {


        const date = new Date(fechaentrega);

        const actual = new Date();
        const fecha = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay();
        const fechaActual = actual.getFullYear() + '/' + actual.getMonth() + '/' + actual.getDay();
        const arrays: any[] = [];


        this.myFormArrayNoStock.controls.forEach(value => {

            // @ts-ignore
            let data = value.controls;
            let a: detallesCompraRequerimientoNoStock = {
                codigoProducto: data.codigo.value,
                cantidad: data.cantidad.value
            }
            arrays.push(a);

        })


        const dataReq: NoStockCompraRequerimiento = {
            condicionRequerimiento: 'NOSTOCKCOMPRA',
            detallesRequerimiento: arrays,
            fechaEmision: fecha,
            fechaEntrega: fechaActual,
            observaciones: observaciones
        }

        this.requerimentoService.agregarRequerimientoNoStockCompra(dataReq).subscribe(value => {

        }, error => {

        })
        alert('REQUERIMIENTO GUARDADO CON EXITO')
        this.dialog.closeAll();


    }


    agregarRequerimientoNoStockTraslado(fechaentrega, observaciones, almacenes) {

        const date = new Date(fechaentrega);

        const actual = new Date();
        const fecha = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay();
        const fechaActual = actual.getFullYear() + '/' + actual.getMonth() + '/' + actual.getDay();
        const arrays: any[] = [];


        this.myFormArrayNoStock.controls.forEach(value => {

            // @ts-ignore
            let data = value.controls;
            let a: detallesCompraRequerimientoNoStock = {
                codigoProducto: data.codigo.value,
                cantidad: data.cantidad.value
            }
            arrays.push(a);

        })


        const dataReq: NoStockTrasladoRequerimiento = {
            idAlmacenEntrega: almacenes,
            condicionRequerimiento: 'NOSTOCK',
            detallesRequerimiento: arrays,
            fechaEmision: fecha,
            fechaEntrega: fechaActual,
            observaciones: observaciones

        }

        this.requerimentoService.agregarRequerimientNoStockTraslado(dataReq).subscribe(value => {

        }, error => {

        })

        alert('requerimiento guardado con exito')
        this.dialog.closeAll();


    }


    delete(index: number) {
        this.myformArray.removeAt(index);
        this.data = [...this.myformArray.controls];

    }

    deleteNoStock(index: number) {
        this.myFormArrayNoStock.removeAt(index);
        this.dataSource = [...this.myFormArrayNoStock.controls];
    }

    add() {
        const newGroup = new FormGroup({});
        this.columnasNecesidadCompraFields.forEach(x => {
            newGroup.addControl(x, new FormControl())
        })
        this.myformArray.push(newGroup)

        this.data = [...this.myformArray.controls];
    }

    addNoStock(id, nombre, cantidad) {
        const newGroup = new FormGroup({});
        this.columnasNoStockCompraFields.forEach(x => {


            if (x == 'codigo') {
                newGroup.addControl(x, new FormControl({
                    value: id,
                    disabled: true
                }))
            }
            if (x == 'cantidad') {
                newGroup.addControl(x, new FormControl({
                    value: Number(cantidad),
                    disabled: false
                }, Validators.max(Number(cantidad))))
            }
            if (x == 'nombre') {
                newGroup.addControl(x, new FormControl({
                    value: nombre,
                    disabled: true
                }))
            }


        })
        this.myFormArrayNoStock.push(newGroup)

        this.dataSource = [...this.myFormArrayNoStock.controls];
    }

    buscar(datos) {

        const valor = {
            idProducto: datos.idFeatures.idProducto,
            talla: datos.idFeatures.talla,
            modelo: datos.idFeatures.modelo,
            marca: datos.idFeatures.marca,
            color: datos.idFeatures.color,
            nombre: datos.descripcion,
            cantidad: <number>datos.cantidad

        };
        this.datosBuscador.push(valor);
        console.log(datos);
        console.log(valor.cantidad)
        this.seleccionarProducto(valor.idProducto, valor.nombre, valor.cantidad);


    }

    seleccionarProducto(idProducto, nombre, cantidad) {

        this.addNoStock(idProducto, nombre, cantidad);

    }


}
