import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {RequerimientoService} from '../../Services/Requerimiento/requerimiento.service';

export interface IdFeatures {
    idProducto: string;
    modelo: string;
    marca: string;
    color: string;
    talla: string;
}

export interface IdTypeProduct {
    idTipo: number;
    tipoProducto: string;
}

export interface IdAlmacen {
    idAlmacen: number;
    almacen: string;
}

export interface RootObject {
    codigo: string;
    cantidad: number;
    descripcion: string;
    idFeatures: IdFeatures;
    idTypeProduct: IdTypeProduct;
    precioUnitario: number;
    foto: string;
    idAlmacen: IdAlmacen;
    unidadMedida: string;
}

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

    @Input()
    idAlmacen: any = 0;

    public bankServerSideCtrl: FormControl = new FormControl();

    public bankServerSideFilteringCtrl: FormControl = new FormControl();

    public searching = false;

    public filteredServerSideBanks: ReplaySubject<RootObject[]> = new ReplaySubject<RootObject[]>(1);
    @Output() producto = new EventEmitter<any>();

    protected banks: RootObject[];

    protected _onDestroy = new Subject<void>();

    constructor(private req: RequerimientoService) {
    }

    ngOnInit(): void {


        this.bankServerSideFilteringCtrl.valueChanges.pipe(tap(x => {
            this.searching = true
        }), takeUntil(this._onDestroy))
            .subscribe(filteredBanks => {

                    this.req.buscarProducto(filteredBanks, this.idAlmacen).subscribe(value => {

                        this.banks = value;
                        this.searching = false;
                        this.filteredServerSideBanks.next(this.banks);
                    });


                },
                error => {
                    // no errors in our simulated example
                    this.searching = false;
                    // handle error...
                });


    }

    seleccionarProducto(producto: any) {
        this.producto.emit(producto);
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
