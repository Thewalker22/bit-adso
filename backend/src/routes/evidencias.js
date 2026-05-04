const express = require('express');
const router = express.Router();
const Evidencia = require('../moldes/Evidencia');

// GET /api/evidencias
router.get('/', async (req, res) => {
    try {
        const evidencias = await Evidencia.obtenerTodas();
        res.json(evidencias);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar' });
    }
});

// GET /api/evidencias/resumen
router.get('/resumen', async (req, res) => {
    try {
        if (!req.session.usuario) {
            return res.status(401).json({ error: 'No autorizado' });
        }
        const idAprendiz = req.session.usuario.id;

        await Evidencia.actualizarVencida(idAprendiz);
        const resumen = await Evidencia.obtenerResumen(idAprendiz);
        res.json(resumen);
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Error al consultar resumen' });
    }
});

// GET /api/evidencias/mis-evidencias
router.get('/mis-evidencias', async (req, res) => {
    try {
        if (!req.session.usuario) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        //await Evidencia.actualizarVencidas(idAprendiz);
        const evidencias = await Evidencia.obtenerPorAprendiz(req.session.usuario.id);

        res.json(evidencias);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Error al consultar evidencias' });
    }
});

// GET /api/evidencias/:id  ← siempre al final
router.get('/:id', async (req, res) => {
    try {
        const evidencia = await Evidencia.obtenerPorId(req.params.id);
        if (!evidencia) return res.status(404).json({ error: 'Evidencia no encontrada' });
        res.json(evidencia);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar' });
    }
});

// POST /api/evidencias
router.post('/', async (req, res) => {
    try {
        console.log('Session ID:', req.sessionID);      
        console.log('Session completa:', req.session);    
        console.log('Usuario en sesión:', req.session.usuario);

        console.log('1. Body recibido:', req.body);          

        const { nombre, url, fecha_limite, url_material, url_clase } = req.body;
        if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

        console.log('3. Nombre válido, tomando idaprendiz...');

        // Toma el idaprendiz de la sesión
        const idaprendiz = req.session.usuario.id;
        console.log('4. idaprendiz:', idaprendiz);     

        const evidencia = new Evidencia(nombre, url, fecha_limite, idaprendiz, url_material, url_clase);
        console.log('5. Objeto creado, guardando...'); 

        const id = await evidencia.guardar();
        console.log('6. Guardado con id:', id); 

        res.status(201).json({ mensaje: 'Evidencia creada correctamente', id });
    } catch (error) {
        console.log('ERROR POST:', error);
        res.status(500).json({ error: 'Error al crear la evidencia' });
    }
});

// PUT /api/evidencias/:id
router.put('/:id', async (req, res) => {
    try {
        const filas = await Evidencia.actualizar(req.params.id, req.body);
        if (filas === 0) return res.status(404).json({ error: 'Evidencia no encontrada' });
        res.json({ mensaje: 'Evidencia actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
});

// DELETE /api/evidencias/:id
router.delete('/:id', async (req, res) => {
    try {
        const filas = await Evidencia.eliminar(req.params.id);
        if (filas === 0) return res.status(404).json({ error: 'Evidencia no encontrada' });
        res.json({ mensaje: 'Evidencia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

module.exports = router;