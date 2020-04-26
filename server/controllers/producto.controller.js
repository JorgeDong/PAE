const Producto = require('../models/Producto');


const productoCtrl = {};

productoCtrl.getLastProducto = async (req, res, next) => {
    const producto = await Producto.findOne({}, {}, { sort: { '_id' : -1 } });
    res.json(producto);
};

productoCtrl.getProductos = async (req, res, next) => {
    const productos = await Producto.find();
    res.json(productos);
};

productoCtrl.createProducto = async (req, res, next) => {
    Producto.findOne({}, {}, { sort: { '_id' : -1 } }, async function(err, post) {
        if(post == null){
            const producto = new Producto({
                idProducto: 1,
                idCategoria_fk: req.body.idCategoria_fk,
                idUsuario_fk: req.body.idUsuario_fk,
                nombre: req.body.nombre,
                marca: req.body.marca,
                accesorios: req.body.accesorios,
                descripcion: req.body.descripcion,
                estadoDelProducto: req.body.estadoDelProducto,
                Valor: req.body.Valor,
                fechaAlta: new Date()
            });
            await producto.save();
            res.json({status: 'Producto created',Producto: producto});
        }else{
            let lastProducto = post.idProducto;
            lastProducto++;
            const producto = new Producto({
                idProducto: lastProducto,
                idCategoria_fk: req.body.idCategoria_fk,
                idUsuario_fk: req.body.idUsuario_fk,
                nombre: req.body.nombre,
                marca: req.body.marca,
                accesorios: req.body.accesorios,
                descripcion: req.body.descripcion,
                estadoDelProducto: req.body.estadoDelProducto,
                Valor: req.body.Valor,
                fechaAlta: new Date()
            });
         await producto.save();
         res.json({status: 'Producto created',Producto: producto});
        }
    });

};

productoCtrl.getProducto = async (req, res, next) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    res.json(producto);
};

productoCtrl.editProducto = async (req, res, next) => {
    const { id } = req.params;

    const producto = {
        idProducto: req.body.idProducto,
        idCategoria_fk: req.body.idCategoria_fk,
        idUsuario_fk: req.body.idUsuario_fk,
        nombre: req.body.nombre,
        marca: req.body.marca,
        accesorios: req.body.accesorios,
        descripcion: req.body.descripcion,
        estadoDelProducto: req.body.estadoDelProducto,
        Valor: req.body.Valor,
        fechaAlta: new Date()
    };

    await Producto.findByIdAndUpdate(id, {$set: producto}, {new: true});
    res.json({status: 'Producto Updated'});
};

productoCtrl.deleteProducto = async (req, res, next) => {
    await Producto.findByIdAndRemove(req.params.id);
    res.json({status: 'Producto Deleted'});
};

module.exports = productoCtrl;