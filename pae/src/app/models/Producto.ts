export class Producto {

        constructor(idProducto,
                    idCategoria_fk,
                    idUsuario_fk,
                    nombre,
                    marca,
                    accesorios,
                    descripcion,
                    estadoDelProducto,
                    Valor
    ) {
        this.idProducto = idProducto;
        this.idCategoria_fk = idCategoria_fk;
        this.idUsuario_fk = idUsuario_fk;
        this.nombre = nombre;
        this.marca = marca;
        this.accesorios = accesorios;
        this.descripcion = descripcion;
        this.estadoDelProducto = estadoDelProducto;
        this.Valor = Valor;    
    }

    idProducto: number;
    idCategoria_fk: number;
    idUsuario_fk: number;
    nombre: string;
    marca: string;
    accesorios: string;
    descripcion: string;
    estadoDelProducto: string;
    Valor: string;

}
