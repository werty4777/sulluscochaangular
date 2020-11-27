import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-orden-compra',
    templateUrl: './orden-compra.component.html',
    styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {

    displayedColumns: string[] = ['item', 'codigo', 'descripcion', 'cantidad', 'medida', 'precio', 'descuento', 'subtotal', 'delete'];
    displayedHead: string[] = ['item', 'codigo', 'descripcion', 'cantidad', 'unidad de medida', 'precio Unitario', 'descuento', 'subtotal'];
    displayedFields: string[] = ['item', 'codigo', 'descripcion', 'cantidad', 'medida', 'precio', 'descuento', 'subtotal'];
    myformArray = new FormArray([
        new FormGroup({
            item: new FormControl(''),
            codigo: new FormControl(''),
            descripcion: new FormControl(''),
            cantidad: new FormControl(''),
            medida: new FormControl(''),
            unidad: new FormControl(''),
            precio: new FormControl(''),
            descuento: new FormControl(''),
            subtotal: new FormControl('')

        })

    ])

    dataSource = this.myformArray.controls;

    constructor() {
    }

    ngOnInit() {

    }

    delete(index
               :
               number
    ) {
        this.myformArray.removeAt(index);
        this.dataSource = [...this.myformArray.controls];

    }

    add() {
        const newGroup = new FormGroup({});
        this.displayedFields.forEach(x => {
            newGroup.addControl(x, new FormControl())
        })
        this.myformArray.push(newGroup)

        this.dataSource = [...this.myformArray.controls];
    }

    datos() {


        this.add();

    }


}
