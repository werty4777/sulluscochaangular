export interface ProductModel {

    codigo;
    descripcion;
    modelo;
    colr;
    marca;
    talla;

    precio;
    tipo: TipoProduct;
}

export interface TipoProduct {
    idTipo;
    tipoproducto;
}
