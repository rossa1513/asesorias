const  {Router} = require('express');
const Proyecto = require('../Models/Proyecto');
const{ validationResult, check} = require('express-validator');

const router = Router();

//crear proyecto
router.post('/',[

    check('numero', 'invalid.numero').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('valor', 'invalid.valor').not().isEmpty(),
    check('cliente', 'invalid.cliente').not().isEmpty(),
    check('etapa', 'invalid.etapa').not().isEmpty(),
    check('tipoProyecto', 'invalid.tipoProyecto').not().isEmpty(),
    check('universidad', 'invalid.universidad').not().isEmpty(),


], async function(req, res){

try {

    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({mensaje: erros.array()});
    }
     const existeProyectoPorNumero =await Proyecto.findOne({numero: req.body.numero});

     if(existeProyectoPorNumero){
        return res.status(400).send('ya existe numero para otro equipo');
     }
    
     let proyecto = new Proyecto();

     proyecto.numero = req.body.numero;
     proyecto.titulo = req.body.titulo;
     proyecto.valor = req.body.valor;
     proyecto.fechaInicio = new Date;
     proyecto.cliente = req.body.cliente;
     proyecto.etapa = req.body.etapa;
     proyecto.tipoProyecto = req.body.tipoProyecto;
     proyecto.universidad = req.body.universidad;
     proyecto.fechaCreacion = new Date;
     proyecto.fechaActualizacion = new Date;

        proyecto = await proyecto.save();
        res.send(proyecto);


} catch (error) {
    console.log(error);
    res.status(500).send('Ocurrio un error en proyecto'); 
}
});
//LISTAR
router.get('/', async function(req, res){
try {
    const proyecto = await Proyecto.find();
    res.send(proyecto);

} catch (error) {
    console.log(error);
    res.status(500).send('Ocurrido un error al crear proyecto');    
}

});
//actualizar
router.put('/:proyectoId',[
    check('numero', 'invalid.numero').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('valor', 'invalid.valor').not().isEmpty(),
    check('cliente', 'invalid.cliente').not().isEmpty(),
    check('etapa', 'invalid.etapa').not().isEmpty(),
    check('tipoProyecto', 'invalid.tipoProyecto').not().isEmpty(),
    check('universidad', 'invalid.universidad').not().isEmpty(),
], async function (req, res) {

try {

    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({mensaje: erros.array()});

    }  

    let proyecto = await Proyecto.findById(req.params.proyectoId)
    if(!proyecto){
        return res.status(400).send('Usuario no existe');
    }


    
    proyecto.numero = req.body.numero;
    proyecto.titulo = req.body.titulo;
    proyecto.valor = req.body.valor;
    proyecto.fechaInicio = new Date;
    proyecto.cliente = req.body.cliente;
    proyecto.etapa = req.body.etapa;
    proyecto.tipoProyecto = req.body.tipoProyecto;
    proyecto.universidad = req.body.universidad;
    proyecto.fechaCreacion = new Date;
    proyecto.fechaActualizacion = new Date;

    proyecto = await proyecto.save();
    res.send(proyecto);

} catch (error) {
    console.log(error);
    res.status(500).send('Ocurrido un error al actualizar proyecto');
}

});

router.get('/:proyectoId', async function(req, res){
try{
    const proyecto =await Proyecto.findById(req.params.proyectoId);
    if(!proyecto){
        return res.status(484).send('la proyecto no existe');
    }
    res.send(proyecto);
    
}catch(error) {
    console.log(error);
    req.status(500).send('ocurrio un error al conaultar las peliculas')

}


});


module.exports = router;