const express = require('express');
const router = express.Router();
const Usuario = require('../moldes/Usuario');

// GET /api/usuarios/sesion
router.get('/sesion', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ error: 'No hay sesión activa' });
    }
    res.json(req.session.usuario);
});

//POST /api/usuarios/registro
router.post('/registro', async (req, res) => {
    try {
        const { nombre, usuario, contraseña, idprograma } = req.body;

        if (!nombre || !usuario || !contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const nuevoUsuario = new Usuario(nombre, usuario, contraseña, idprograma);
        const id = await nuevoUsuario.guardar();

        res.status(201).json({ mensaje: 'Usuario creado correctamente', id });

    } catch (error) {
         // Error 1062 = usuario duplicado en MySQL
        if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }
    //console.log('ERROR REGISTRO:', error);
    res.status(500).json({ error: 'Error al crear el usuario PRUEBA' });
    }
});

//POST /api/usuarios/login
router.post('/login', async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;

        const encontrado = await Usuario.buscarPorUsuario(usuario);
        if (!encontrado) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const contraseñaCorrecta = await Usuario.verificarContraseña(contraseña, encontrado.contraseña);
        if (!contraseñaCorrecta) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        req.session.usuario = {
            id:      encontrado.idaprendiz,
            nombre:  encontrado.nombre,
            usuario: encontrado.usuario
        };

        req.session.save((err) => {
            if (err) {
                console.log('Error guardando sesión:', err);
                return res.status(500).json({ error: 'Error al guardar sesión' });
            }
            console.log('Sesión guardada:', req.session.usuario);
            res.json({ mensaje: 'Login exitoso', nombre: encontrado.nombre });
        });

    } catch (error) {
        console.log('ERROR LOGIN:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

//POST /api/usuarios/logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ mensaje: 'Sesión cerrada' });
});
   
module.exports = router;