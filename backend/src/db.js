const mysql = require('mysql2');
require('dotenv').config();

const conexion = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'Adso_evidence',
    port: process.env.DB_PORT || 3306
});

conexion.connect((error) =>{
    if(error){
      console.log('X Error conectando a MySQL',error);
      return;
    }
    console.log('Conectado a MySQL correctamente');
});
module.exports = conexion;