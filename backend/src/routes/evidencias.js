const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/evidencias
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM evidencia';

    db.query(sql, (error, resultados) => {
        if (error){
            console.log('ERROR EXACTO:', error);
            return res.status(500).json({error: 'Error al consultar la base de datos'})
        }
        res.json(resultados)
    })
})

//GET /api/evidencias/1
router.get('/:id',  (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM evidencia WHERE idevidencia = ?';

    db.query(sql, [id], (error, resultados) => {
        if(error) {
            return res.status(404).json ({error:'evidencia no encontrada'});
        }
        res.json(resultado[0]);
    })

});

//POST /api/evidencias
router.post('/', (req, res) => {
    const {nombre, url, fecha_limite, idcomponente, idaprendiz} = req.body;

    if(!nombre) {
        return res.status(400).json({ error:'El nombre es obligatorio'});
    }
    const sql = `INSERT INTO evidencia (nombre, url, fecha_limite, idcomponente, idaprendiz) VALUE (?,?,?,?,?)`;
    db.query(sql, [nombre, url, fecha_limite, idcomponente, idaprendiz], (error, resultado) => {
        if(error){
            return res.status(500).json({ error:'Error al crear la evidencia'});
        }
        res.status(201).json({
            mensaje: 'Evidencia correctamente creada',
            id:resultado.insertid
        });

    });

});

router.put('/:id', (req, res) =>{
    const {id} = req.params
    const { estatus, comentario, url_evidencia, url_clase, } = req.body;

    const sql = `UPDATE evidencia
                SET estatus = ?, comentario = ?, url_evidencia=?, url_clase = ?
                WHERE idevidencia = ?`;
    
    db.query(sql, [estatus, comentario, url_evidencia, url_clase, id], (error, resultado) => {
        if(error){
            return res.status(500).json({error: 'Error al actualizar'});          
        }
        if(resultado.affectedRows === 0) {
            return res.status(404).json({error:'Evidencia no encontrada'});
        }
        res.json({mensaje: 'Evidencia correctamente actualizada'});
    });

});

//DELETE /api/evidencias

router.delete('/:id', (req, res)=>{
    const { id } = req.params;
    const sql = 'DELETE FROM evidencia WHERE idevidencia = ?';

    db.query(sql, [id], (error, resultado) => {
        if (error){
            return res.status(500).json({ error:'Error al eliminar',  detalle: error.message});
        }
        if (resultado.affectedRows === 0){
            return res.status(404).json({erro: 'Evidencia no encontrada'});
        }
        res.json({mensaje:'Evidencia eliminada correctamente'});
    });
});

module.exports = router;

