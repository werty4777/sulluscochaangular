import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {


    public alerta: Function;


    constructor() {
    }

    ngOnInit() {
        this.alerta = this.llamada.bind(this);
    }

    llamada() {
        alert('un mensaje');
    }


    agregarProducto(){

    }

}
