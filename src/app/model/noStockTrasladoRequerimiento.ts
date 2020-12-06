import {detallesCompraRequerimientoNoStock} from './noStockCompraRequerimiento';

export interface NoStockTrasladoRequerimiento {
    idArea: number;
    idAlmacenEntrega: number;
    fechaEmision: string;
    fechaEntrega: string;
    condicionRequerimiento: string;
    detallesRequerimiento: detallesCompraRequerimientoNoStock[];
    observaciones: string;
}

