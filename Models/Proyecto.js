const {Schema, model} = require('mongoose');

const ProyectoSchema = Schema({
   numero: {type: String, required: true, unique: true},
   titulo: {type: String, required: true},
   valor: {type: String, required: true},
   fechaInicio: {type: Date, required: true},
   fechaCreacion: {type: Date, required: true},
   fechaActualizacion: {type: Date, required: true},
   cliente: {
      type: Schema.Types.ObjectId,
      ref:'Cliente',
      required: true
   },
   etapa:{
      type: Schema.Types.ObjectId,
      ref:'Etapa',
      required: true
   },
   tipoProyecto:{
      type: Schema.Types.ObjectId,
      ref: 'TipoProyecto',
      required: true
   },
   universidad: {
      type: Schema.Types.ObjectId,
      ref:'Universidad',
      required: true
   }

});
module.exports = model('Proyecto', ProyectoSchema)    