require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');


const evidenciasRoutes = require('./routes/evidencias');
const usuariosRouter = require('./routes/usuarios');
const programasRouter = require('./routes/programas');


const app = express();

const path = require('path');
// Sirve los archivos del frontend como estáticos
app.use(express.static(path.join(__dirname, '../../frontend')));

//middlewares 
app.use(cors());
app.use(express.json());

//Configurar sesión
app.use(session({
 secret: process.env.SESSION_SECRET,
 resave:false,
 saveUninitialized: false,
 cookie: { 
 maxAge:1000 * 60 * 60 * 24,
 sameSite: 'lax', 
 secure: false    // false porque esta en localhost sin https
}
}));

//Rutas
app.use('/api/evidencias', evidenciasRoutes);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/programas', programasRouter);


//Ruta de pruebas
app.use('/', (req, res) =>{
    res.json({mensaje: 'API agenda de envidencias funcionando'});
});

//Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http:localhost:${PORT}`);
});