import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RequerimientoService} from '../../Services/Requerimiento/requerimiento.service';

@Component({
    selector: 'app-entrada-modal',
    templateUrl: './entrada-modal.component.html',
    styleUrls: ['./entrada-modal.component.css']
})
export class EntradaModalComponent implements OnInit {


    columnasCompra: string[] = ['item', ''];
    columnasTraslado: string[] = ['item', 'nombre', 'talla', 'marca', 'color', 'modelo', 'unidadMedida', 'cantidad', 'total'];


    @Input()
    tipoEntrada: number;

    @Input()
    codigo: number;

    data;

    constructor(public dialog: MatDialog, private req: RequerimientoService) {
    }

    ngOnInit(): void {
        this.cargarData();
    }

    cargarData() {

        this.req.buscarEntrada(this.codigo, this.tipoEntrada).subscribe(value => {

            this.data = value;
            console.log(this.data.data.detallesList);
            console.log(this.data.data.detallesList.length)

        })
    }

    confirmarEntrada() {
        this.req.confirmarEntrada(this.codigo, '113535745231940775004').subscribe(value => {

        });
        this.dialog.closeAll();
    }
}
