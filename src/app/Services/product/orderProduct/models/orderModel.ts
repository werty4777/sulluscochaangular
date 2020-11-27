export interface OrderModel {


    proveedor: Proveedor;
    fechaEntrega: string;
    direccionEntrega: string;
    moneda: string;
    condicionPago: string;
    formaPago: string;
    detallesOrden: DetallesOrden[];

}

export interface Proveedor {

    ruc: string;
    nombre: string;
    correo: string;
    telefono: string;
    fecha: string;

}

export interface DetallesOrden {

    descripcion: string;
    cantidad: number;
    unidadMedida: string;
    precioUnitario: number;
    descuento: number;
}
