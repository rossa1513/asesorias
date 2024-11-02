const {Schema, model} = require('mongoose');

const TipoProyectoSchema = Schema({
   nombre: {type: String, required: true}

});
module.exports = model('TipoProyecto', TipoProyectoSchema) 