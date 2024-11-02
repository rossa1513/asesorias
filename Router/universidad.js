const  {Router} = require('express');
const Universidad = require('../Models/Universidad');
const{ validationResult, check} = require('express-validator');

const router = Router();

//Crear Universidad

router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('direccion', 'invalid.direccion').not().isEmpty(),
    check('telefono', 'invalid.telefono').not().isEmpty(),
], async function (req, res) {

    try {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});
        }
        let universidad = new Universidad();
        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaCreacion = new Date;
        universidad.fechaActualizacion = new Date;

        universidad = await universidad.save();
        res.send(universidad);

    } catch (error) {
        console.log(error);
    }
    
  });

  //Listar universidad

  router.get('/', async function(req, res){
    try {
        const universidad = await Universidad.find();
        res.send(universidad);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al crear universidad');    
    }
    
} );
//Actualizar Universidad
router.put('/:universidadId',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('direccion', 'invalid.direccion').not().isEmpty(),
    check('telefono', 'invalid.telefono').not().isEmpty()

], async function (req, res) {

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});

        }  

        let universidad = await Universidad.findById(req.params.universidadId)
        if(!universidad){
            return res.status(400).send('Universidad no existe');
        }
    
        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaCreacion = new Date;
        universidad.fechaActualizacion = new Date;

        universidad = await universidad.save();
        res.send(universidad);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al actualizar universidad');
    }
    
  });

  module.exports = router;