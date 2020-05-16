export class Credito {

    constructor(
        idCredito,
        idUsuario_fk,
        CantidadCredito,
        moneda,
        fechaAlta
) {
    this.idCredito = idCredito;
    this.idUsuario_fk = idUsuario_fk;
    this.CantidadCredito = CantidadCredito;
    this.moneda = moneda;
    this.fechaAlta = fechaAlta;
}

idCredito: number;
idUsuario_fk: number;
CantidadCredito: number;
moneda: string;
fechaAlta: string;

}
