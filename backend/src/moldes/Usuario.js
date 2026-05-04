const db = require('../db');
const bcrypt = require('bcrypt'); 

class usuario {

    constructor (nombre, usuario, contraseña, idprograma) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.idprograma = idprograma;
    }

    // Crea usuario nuevo (registro)

    async guardar() {
        const hash = await bcrypt.hash(this.contraseña, 10); 
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO aprendiz (nombre, usuario, contraseña, idprograma)
                         VALUES (?, ?, ?, ?)`; 
            db.query(sql, [this.nombre, this.usuario, hash, this.idprograma], (error, resultado) => {
                if (error) reject(error);
                else resolve(resultado.insertId);
            });
        });
    }
    
    //Buscar por nombre de usuario (para el login)
    static buscarPorUsuario(usuario){
        return new Promise((resolve, reject)=> {
            const sql = 'SELECT * FROM aprendiz WHERE usuario = ?';
            db.query(sql, [usuario], (error, resultado) =>{
                if (error) reject(error);
                else resolve(resultado[0]);
            })
        })
    }

    //Verificar contraseña
    static async verificarContraseña(contraseñaIngresada, hash) {
        return await bcrypt.compare(contraseñaIngresada, hash);
    }
}
module.exports = usuario;