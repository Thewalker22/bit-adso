const express = require('express');
const cors = require('cors');
require('dotenv').config();

const evidenciasRoutes = require('./routes/evidencias');

const app = express();

//middlewares 
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/evidencias', evidenciasRoutes)

//Ruta de pruebas
app.use('/', (req, res) =>{
    res.json({mensaje: 'API agenda de envidencias funcionando'});
});

//Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http:localhost:${PORT}`);
});