/**-------------------------------------------------------------
 * @fileoverview usuario.js, Modelo para la clase Usuario
 * @version  0.0
 * @author Andres Cequera <Andrescequera@gmail.com>
 * Versiones:
 * v0.0 – Primera version del modelo
 * --------------------------------------------------------------
 */
var conection = require('./conection');

const mysql = require('mysql');
connection = mysql.createConnection(conection);
let model = {};

model.get = (callback) => {
    if (connection) {
        connection.query('select * from juego',
            (error, rows) => {
                if (error) {
                    throw error;
                }
                else {
                    callback(null, rows);
                }
            }
        )
    }
};

// model.post = (userData, callback) => {
//     if (connection) {
//         connection.query('INSERT INTO usuario SET ?', userData,
//             (error, result) => {
//                 if (error) {
//                     throw error;
//                 }
//                 else {
//                     callback(null, {
//                         'id': result.insertId
//                     });
//                 }
//             }
//         )
//     }
// };

module.exports = model;