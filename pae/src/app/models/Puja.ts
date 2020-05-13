export class Puja {

    constructor(
                idPuja,
                idSubasta_fk,
                idUsuario_fk,
                CantidadPuja,
) {
    this.idPuja = idPuja;
    this.idSubasta_fk = idSubasta_fk;
    this.idUsuario_fk = idUsuario_fk;
    this.CantidadPuja = CantidadPuja;
}

idPuja: number;
idSubasta_fk: number;
idUsuario_fk: number;
CantidadPuja: string;
fechaAlta: string;

}
