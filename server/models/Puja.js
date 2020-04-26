const mongoose = require('mongoose');
const { Schema } = mongoose;

const PujaSchema = new Schema({
    idPuja: { type: Number, required: true},
    idSubasta_fk: { type: Number, required: true},
    idUsuario_fk: { type: Number, required: true},
    CantidadPuja: { type: String, required: true},
    fechaAlta: { type: Date, required: true }
});

module.exports = mongoose.model('Puja', PujaSchema);