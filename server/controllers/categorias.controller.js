const Categoria = require('../models/Categoria');


const categoriaCtrl = {};

categoriaCtrl.getLastCategoria = async (req, res, next) => {
    const categoria = await Categoria.findOne({}, {}, { sort: { '_id' : -1 } });
    res.json(categoria);
};

categoriaCtrl.getCategorias = async (req, res, next) => {
    const categorias = await Categoria.find();
    res.json(categorias);
};

categoriaCtrl.createCategoria = async (req, res, next) => {
    Categoria.findOne({}, {}, { sort: { '_id' : -1 } }, async function(err, post) {
        if(post == null){
            const categoria = new Categoria({
                idCategoria: 1,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                fecha: new Date()
            });
            await categoria.save();
            res.json({status: 'Categoria created',categoria: categoria});
        }else{
            console.log(post);
            let lastCategoria = post.idCategoria;
            console.log(lastCategoria)
            lastCategoria++;
            console.log(lastCategoria)
             const categoria = new Categoria({
                 idCategoria: lastCategoria,
                 nombre: req.body.nombre,
                 descripcion: req.body.descripcion,
                 fecha: new Date()
             });
         await categoria.save();
         res.json({status: 'Categoria created',categoria: categoria});
        }
    });

};

categoriaCtrl.getCategoria = async (req, res, next) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);
    res.json(categoria);
};

categoriaCtrl.editCategoria = async (req, res, next) => {
    const { id } = req.params;

    const categoria = {
        idCategoria: req.body.idCategoria,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha: new Date()
    };

    await Categoria.findByIdAndUpdate(id, {$set: categoria}, {new: true});
    res.json({status: 'Categoria Updated'});
};

categoriaCtrl.deleteCategoria = async (req, res, next) => {
    await Categoria.findByIdAndRemove(req.params.id);
    res.json({status: 'Categoria Deleted'});
};

module.exports = categoriaCtrl;