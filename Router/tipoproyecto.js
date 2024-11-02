const  {Router} = require('express');
const TipoProyecto = require('../Models/TipoProyecto');
const{ validationResult, check} = require('express-validator');

const router = Router();

//Crear TipoProyecto

router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
], async function (req, res) {

    try {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});
        }
        let tipoproyecto = new TipoProyecto();
        tipoproyecto.nombre = req.body.nombre;
        tipoproyecto.fechaCreacion = new Date;
        tipoproyecto.fechaActualizacion = new Date;

        tipoproyecto = await tipoproyecto.save();
        res.send(tipoproyecto);

    } catch (error) {
        console.log(error);
    }
    
  });

  //Listar tipoproyecto

  router.get('/', async function(req, res){
    try {
        const tipoproyecto = await TipoProyecto.find();
        res.send(tipoproyecto);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al crear tipoproyecto');    
    }
    
} );
//Actualizar TipoProyecto
router.put('/:tipoproyectoId',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    

], async function (req, res) {

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});

        }  

        let tipoproyecto = await TipoProyecto.findById(req.params.tipoproyectoId)
        if(!tipoproyecto){
            return res.status(400).send('TipoProyecto no existe');
        }
    
        tipoproyecto.nombre = req.body.nombre;
        tipoproyecto.fechaCreacion = new Date;
        tipoproyecto.fechaActualizacion = new Date;

        tipoproyecto = await tipoproyecto.save();
        res.send(tipoproyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al actualizar tipoproyecto');
    }
    
  });

  module.exports = router;