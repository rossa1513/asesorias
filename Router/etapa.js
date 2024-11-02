const  {Router} = require('express');
const Etapa = require('../Models/Etapa');
const{ validationResult, check} = require('express-validator');

const router = Router();

//Crear Etapa

router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
], async function (req, res) {

    try {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});
        }
        let etapa = new Etapa();
        etapa.nombre = req.body.nombre;
        etapa.fechaCreacion = new Date;
        etapa.fechaActualizacion = new Date;

        etapa = await etapa.save();
        res.send(etapa);

    } catch (error) {
        console.log(error);
    }
    
  });

  //Listar etapa

  router.get('/', async function(req, res){
    try {
        const etapa = await Etapa.find();
        res.send(etapa);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al crear etapa');    
    }
    
} );
//Actualizar Etapa
router.put('/:etapaId',[
    check('nombre', 'invalid.nombre').not().isEmpty(),

], async function (req, res) {

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});

        }  

        let etapa = await Etapa.findById(req.params.etapaId)
        if(!etapa){
            return res.status(400).send('Etapa no existe');
        }
    
        etapa.nombre = req.body.nombre;
        etapa.fechaCreacion = new Date;
        etapa.fechaActualizacion = new Date;

        etapa = await etapa.save();
        res.send(etapa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al actualizar etapa');
    }
    
  });

  module.exports = router;