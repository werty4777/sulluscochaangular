import {detallesCompraRequerimientoNoStock} from './noStockCompraRequerimiento';

export interface NoStockTrasladoRequerimiento {
    idAlmacenEntrega: number;
    fechaEmision: string;
    fechaEntrega: string;
    condicionRequerimiento: string;
    detallesRequerimiento: detallesCompraRequerimientoNoStock[];
    observaciones: string;
}

