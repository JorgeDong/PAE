const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImagenSchema = new Schema({
    idImagen: { type: Number, required: true},
    idProducto_fk: { type: Number, required: true},
    url: { type: String, required: true},
    descripcion: { type: String, required: true },
    fecha: { type: Date, required: true }
});

module.exports = mongoose.model('Imagen', ImagenSchema);