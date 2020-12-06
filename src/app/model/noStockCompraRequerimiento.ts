import {detallesCompraRequerimientoNecesidad} from './necesidadCompraRequerimiento';

export interface NoStockCompraRequerimiento {
    fechaEmision: string;
    fechaEntrega: string;
    condicionRequerimiento: string;
    detallesRequerimiento: detallesCompraRequerimientoNoStock[];
    observaciones: string;
}
export interface detallesCompraRequerimientoNoStock {
    codigoProducto: string;
    cantidad: number;

}

