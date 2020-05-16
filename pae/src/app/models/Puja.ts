export class Puja {

    constructor(
                idSubasta_fk,
                idUsuario_fk,
                CantidadPuja,
                Usuario,
                PujaInicial,
                NombreProducto
) {
    this.idSubasta_fk = idSubasta_fk;
    this.idUsuario_fk = idUsuario_fk;
    this.CantidadPuja = CantidadPuja;
    this.Usuario = Usuario;
    this.PujaInicial = PujaInicial;
    this.NombreProducto = NombreProducto;
}

idPuja: number;
idSubasta_fk: number;
idUsuario_fk: number;
CantidadPuja: string;
Usuario: string;
fechaAlta: string;
PujaInicial: string;
NombreProducto: string;

}
