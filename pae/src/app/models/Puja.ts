export class Puja {

    constructor(
                idSubasta_fk,
                idUsuario_fk,
                CantidadPuja,
                Usuario
) {
    this.idSubasta_fk = idSubasta_fk;
    this.idUsuario_fk = idUsuario_fk;
    this.CantidadPuja = CantidadPuja;
    this.Usuario = Usuario;
}

idPuja: number;
idSubasta_fk: number;
idUsuario_fk: number;
CantidadPuja: string;
Usuario: string;
fechaAlta: string;

}
