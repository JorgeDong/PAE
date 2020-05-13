export class Credito {

    constructor(
        idCredito,
        idUsuario_fk,
        CantidadCredito,
        moneda,
) {
    this.idCredito = idCredito;
    this.idUsuario_fk = idUsuario_fk;
    this.CantidadCredito = CantidadCredito;
    this.moneda = moneda;
}

idCredito: number;
idUsuario_fk: number;
CantidadCredito: string;
moneda: string;
fechaAlta: string;

}
