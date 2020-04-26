const mongoose = require('mongoose');
const { Schema } = mongoose;

const CreditoSchema = new Schema({
    idCredito: { type: Number, required: true},
    idUsuario_fk: { type: Number, required: true},
    CantidadCredito: { type: String, required: true},
    moneda: { type: String, required: true},
    fechaAlta: { type: Date, required: true }
});

module.exports = mongoose.model('Credito', CreditoSchema);