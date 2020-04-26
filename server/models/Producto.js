const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    idProducto: { type: Number, required: true},
    idCategoria_fk: { type: Number, required: true},
    idUsuario_fk: { type: Number, required: true},
    nombre: { type: String, required: true},
    marca: { type: String, required: true},
    accesorios: { type: String, required: true},
    descripcion: { type: String, required: true },
    estadoDelProducto: { type: String, required: true},
    Valor: { type: String, required: true},
    fechaAlta: { type: Date, required: true }
});

module.exports = mongoose.model('Producto', ProductoSchema);