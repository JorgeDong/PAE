export class Producto {

        constructor(
                    //idProducto,
                    idCategoria_fk,
                    idUsuario_fk,
                    nombre,
                    marca,
                    accesorios,
                    descripcion,
                    estadoDelProducto,
                    Valor,
                    PujaInicial,
                    Tiempo,
                    FechaInicio,
                    FechaFinal,
                    Envio,
                    Url
    ) {
       // this.idProducto = idProducto;
        this.idCategoria_fk = idCategoria_fk;
        this.idUsuario_fk = idUsuario_fk;
        this.nombre = nombre;
        this.marca = marca;
        this.accesorios = accesorios;
        this.descripcion = descripcion;
        this.estadoDelProducto = estadoDelProducto;
        this.Valor = Valor;    
        this.PujaInicial =  PujaInicial;
        this.Tiempo  = Tiempo;
        this.FechaInicio  =  FechaInicio;
        this.FechaFinal  = FechaFinal ;
        this.Envio  = Envio;
        this.Url  = Url;
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
    PujaInicial: string;
    Tiempo: string;
    FechaInicio: string;
    FechaFinal:string;
    Envio: string;
    Url: string;
}
