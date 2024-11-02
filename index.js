const express = require('express')
const {getConnection} = require('./Db/conect-mongo')
const cors = require('cors');
require('dotenv').config();


const app = express()
const host= '0.0.0.0'
const port = process.env.PORT;

app.use(cors());

getConnection();

app.use(express.json());
app.use('/cliente', require('./router/cliente'));
app.use('/etapa', require('./router/etapa'));
app.use('/proyecto', require('./router/proyecto'));
app.use('/universidad', require('./router/universidad'));
app.use('/tipoProyecto', require('./router/tipoproyecto'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });