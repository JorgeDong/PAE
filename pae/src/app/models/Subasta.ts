export class Subasta {

    constructor(
                idProducto_fk,
                idUsuario_fk,
                PujaInicial,
                Tiempo,
                FechaInicio,
                FechaFinal,
                Descripcion,
                Envio
) {
    this.idProducto_fk = idProducto_fk;
    this.idUsuario_fk = idUsuario_fk;
    this.PujaInicial = PujaInicial;
    this.Tiempo = Tiempo;
    this.FechaInicio = FechaInicio;
    this.FechaFinal = FechaFinal;
    this.Descripcion = Descripcion;
    this.Envio = Envio;    
}

idSubasta: number;
idProducto_fk: number;
idUsuario_fk: number;
PujaInicial: string;
Tiempo: string;
FechaInicio: string;
FechaFinal: string;
Descripcion: string;
Envio: string;


}
