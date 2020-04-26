const Imagen = require('../models/Imagen');


const ImagenCtrl = {};

imagenCtrl.getLastImagen = async (req, res, next) => {
    const imagen = await Imagen.findOne({}, {}, { sort: { '_id' : -1 } });
    res.json(imagen);
};

imagenCtrl.getImagens = async (req, res, next) => {
    const imagen = await Imagen.find();
    res.json(imagen);
};

imagenCtrl.createImagen = async (req, res, next) => {
    Imagen.findOne({}, {}, { sort: { '_id' : -1 } }, async function(err, post) {
        if(post == null){
            const imagen = new Imagen({
                idImagen: 1,
                idProducto_fk: req.body.idProducto_fk,
                url: req.body.url,
                descripcion: req.body.descripcion,
                fecha: new Date()
            });
            await imagen.save();
            res.json({status: 'Imagen created',imagen: imagen});
        }else{
            let lastImagen = post.idImagen;
            lastImagen++;

            const imagen = new Imagen({
                idImagen: lastImagen,
                idProducto_fk: req.body.idProducto_fk,
                url: req.body.url,
                descripcion: req.body.descripcion,
                fecha: new Date()
            });
            await imagen.save();
            res.json({status: 'Imagen created',imagen: imagen});
        }
    });

};

imagenCtrl.getImagen = async (req, res, next) => {
    const { id } = req.params;
    const imagen = await Imagen.findById(id);
    res.json(imagen);
};

imagenCtrl.editImagen = async (req, res, next) => {
    const { id } = req.params;

    const imagen = {
        idImagen: req.body.idImagen,
        idProducto_fk: req.body.idProducto_fk,
        url: req.body.url,
        descripcion: req.body.descripcion,
        fecha: new Date()
    };

    await Imagen.findByIdAndUpdate(id, {$set: imagen}, {new: true});
    res.json({status: 'Imagen Updated'});
};

imagenCtrl.deleteImagen = async (req, res, next) => {
    await Imagen.findByIdAndRemove(req.params.id);
    res.json({status: 'Imagen Deleted'});
};

module.exports = imagenCtrl;