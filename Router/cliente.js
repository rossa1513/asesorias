const  {Router} = require('express');
const Cliente = require('../Models/Cliente');
const{ validationResult, check} = require('express-validator');

const router = Router();

//Crear Cliente

router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),

], async function (req, res) {

    try {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});
        }
        let cliente = new Cliente();
        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fechaCreacion = new Date;
        cliente.fechaActualizacion = new Date;

        cliente = await cliente.save();
        res.send(cliente);

    } catch (error) {
        console.log(error);
    }
    
  });

  //Listar cliente

  router.get('/', async function(req, res){
    try {
        const cliente = await Cliente.find();
        res.send(cliente);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al crear cliente');    
    }
    
} );
//Actualizar Cliente
router.put('/:clienteId',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),

], async function (req, res) {

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});

        }  

        let cliente = await Cliente.findById(req.params.clienteId)
        if(!cliente){
            return res.status(400).send('Cliente no existe');
        }
    

        
        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fechaCreacion = new Date;
        cliente.fechaActualizacion = new Date;

        cliente = await cliente.save();
        res.send(cliente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al actualizar cliente');
    }
    
  });

  module.exports = router;