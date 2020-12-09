import {DetallesOrdenNostock} from './ordenCompraNoStock';

export interface OrdenCompra {




    codigoRequerimiento;
    numeroComprobante;
    proveedor: DetallesProveedor;
    fecha;
    detallesOrdenNuevo: DetallesOrden[];
    fechaEntrega;
    direccionEntrega;
    moneda;
    condicionPago;
    formaPago;
    observaciones;


}

export interface DetallesProveedor {

    ruc;
    nombre;
    correo;
    telefono;
    phone;
    direccion;
}

export interface DetallesOrden {
    idProducto;
    idDetalleRequerimiento:number;
    precioUnitario:number;
    descuento:number;
}
