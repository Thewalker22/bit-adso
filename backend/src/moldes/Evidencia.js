const db = require('../db');

class Evidencia {

    // Constructor — define los datos de una evidencia
    constructor(nombre, url, fecha_limite, idaprendiz, url_material, url_clase) {
        this.nombre = nombre;
        this.url = url;
        this.fecha_limite = fecha_limite;
        this.idaprendiz = idaprendiz;
        this.url_material = url_material;
        this.url_clase = url_clase;
    }

    // Método estático — obtener todas las evidencias
    // "static" significa que se necesita crear un objeto para usarlo
    static obtenerTodas() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM evidencia';
            db.query(sql, (error, resultados) => {
                if (error) reject(error);
                else resolve(resultados);
            });
        });
    }

    // Método estático — obtener una evidencia por id
    static obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM evidencia WHERE idevidencia = ?';
            db.query(sql, [id], (error, resultados) => {
                if (error) reject(error);
                else resolve(resultados[0]);
            });
        });
    }

    // Método de instancia — guardar esta evidencia en la base de datos
    guardar() {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO evidencia 
                        (nombre, url, fecha_limite, idaprendiz, url_material, url_clase) 
                        VALUES (?, ?, ?, ?, ?, ?)`;
            db.query(sql,
                [this.nombre, this.url, this.fecha_limite, this.idaprendiz,  this.url_material, this.url_clase],
                (error, resultado) => {
                    if (error) reject(error);
                    else resolve(resultado.insertId);
                }
            );
        });
    }

    // Método estático — actualizar una evidencia
    static actualizar(id, datos) {
        return new Promise((resolve, reject) => {
            const sql = ` UPDATE evidencia
            SET
                nombre       = COALESCE(?, nombre),
                url          = COALESCE(?, url),
                fecha_limite = COALESCE(?, fecha_limite),
                estatus      = COALESCE(?, estatus),
                url_material = COALESCE(?, url_material),
                url_clase    = COALESCE(?, url_clase)
            WHERE idevidencia = ?`;
            db.query(sql,
                [datos.nombre, datos.url, datos.fecha_limite, datos.estatus, datos.url_material, datos.url_clase, id],
                (error, resultado) => {
                    if (error) reject(error);
                    else resolve(resultado.affectedRows);
                }
            );
        });
    }

    // Método estático — eliminar una evidencia
    static eliminar(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM evidencia WHERE idevidencia = ?';
            db.query(sql, [id], (error, resultado) => {
                if (error) reject(error);
                else resolve(resultado.affectedRows);
            });
        });
    }

    //Metodo trae todas las evidencias por aprendiz

    static obtenerPorAprendiz(idaprendiz){
        return new Promise((resolve, reject)=>{
            const sql = 'SELECT * FROM evidencia WHERE idaprendiz =?';
            db.query(sql,[idaprendiz], (error, resultado)=>{
                if(error) reject(error);
                else resolve(resultado);
            });
        });
    }

    //Trae los conteos por estatus.
    static obtenerResumen(idaprendiz){
        return new Promise((resolve, reject)=>{
            const sql = 
            `SELECT
                COUNT(*) AS total,
                COALESCE (SUM(estatus = 'enviada'), 0) AS enviadas,
                COALESCE (SUM(estatus = 'pendiente'), 0) AS pendientes,
                COALESCE (SUM(estatus = 'vencida'), 0) AS vencidas
            FROM evidencia
            WHERE idaprendiz = ?`;
        db.query(sql,[idaprendiz], (error, resultados) =>{
            if(error) reject(error);
            else resolve(resultados[0]);
        })
        });
    };

    //Atualiza la evidencia a vencida si el estato es 'pendiente' y la fecha_limite es menor a la fecha actual
    static actualizarVencida (idaprendiz){
        return new Promise((resolve, reject) =>{
            const sql = `
                UPDATE evidencia 
                SET estatus = 'vencida'
                WHERE idaprendiz = ?
                AND fecha_limite < NOW()
                AND estatus = 'pendiente'
            `;
            db.query(sql, [idaprendiz], (error, resultado) =>{
                if (error) reject(error);
                else resolve(resultado.affectedRows);
            });
        });
    }


}

module.exports = Evidencia;