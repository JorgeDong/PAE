export class Comentario {

    constructor(
                idComentario,
                idUsuarioOrigen_fk,
                idUsuarioDestino_fk,
                idPuja_fk,
                Comentario,
                tipo,
) {
    this.idComentario = idComentario;
    this.idUsuarioOrigen_fk = idUsuarioOrigen_fk;
    this.idUsuarioDestino_fk = idUsuarioDestino_fk;
    this.idPuja_fk = idPuja_fk;
    this.Comentario = Comentario;
    this.tipo = tipo;
}

idComentario: number;
idUsuarioOrigen_fk: number;
idUsuarioDestino_fk: number;
idPuja_fk: number;
Comentario: string;
tipo: string;
fechaAlta: string;

}
