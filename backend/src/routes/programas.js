
const express = require('express');
const router= express.Router();
const db = require('../db');


router.get('/', (req, res) => {
    db.query('SELECT * FROM programa', (error, resultados) =>{
        if(error) return res.serverStatus(500).json({error:'Error al consultar la BD'});
        res.json(resultados);
    })
});
module.exports = router;