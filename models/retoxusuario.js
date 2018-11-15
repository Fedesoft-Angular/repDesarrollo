
/**-------------------------------------------------------------
 * @fileoverview retosxusuario.js, Modelo para la clase Usuario
 * @version  0.0
 * @author Jaime Cortes <jaimecortes9@gmail.com>
 * Versiones:
 * v0.0 – Primera version del modelo
 * --------------------------------------------------------------
 */


// Constantes
const mysql = require('mysql');
var conection = require('./conection');

// Conexion
connection = mysql.createConnection(conection);

// RetoxUsuario Model
   let retosxusuarioModel = {};

/*--------------------------------------------------------------
 * getRetosxUsuario: Obtiene todos los retosxusuario
 * @param  
 * @return  {retosxusuario}
 --------------------------------------------------------------
 */

   retosxusuarioModel.getRetosxUsuario = (callback) =>{
       if(connection){
           connection.query('SELECT * from retosxusuario', 
                (error, rows) => {
                    if(error){
                        throw error;
                    }
                    else{
                        callback(null,rows)
                    }
                }
           )
       }
       else{
           callback("No hay Conexion a la BD", null);
       }
   };


/*--------------------------------------------------------------
 * getRetoxUsuario: Obtiene retosxusuario por id
 * @param  id
 * @return  {retosxusuario}
 --------------------------------------------------------------
 */

   
retosxusuarioModel.getRetoxUsuario = function(idUsuario, idReto, callback) 
{
    if (connection) 
    {
        var sql = 'SELECT * FROM retosxusuario WHERE IdUsuario = ' + connection.escape(idUsuario) + ' AND idReto = ' + connection.escape(idReto) ;
        connection.query(sql, function(error, row) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

/*--------------------------------------------------------------
 * getValidateRetoxUsuario: Valida si un retosxusuario existe por clave y nombre
 * @param  Nombre, Clave
 * @return  {retosxusuario}
 --------------------------------------------------------------
 */

   
/*retosxusuarioModel.getValidateRetoxUsuario = function(Nombre, Clave,callback) 
{
    if (connection) 
    {
        var sql = 'SELECT * FROM retosxusuario WHERE ' + Nombre + ' AND ' +  Clave; 
        connection.query(sql, function(error, rows) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                if( rows == 0){
                    callback(null,null)
                }else{
                    callback(null,rows)
                    
                }
            }
        });
    }           
}
*/

/*--------------------------------------------------------------
 * insertRetoxUsuario: inserta un retosxusuario
 * @param  retosxusuarioData
 * @return  {callback}
 --------------------------------------------------------------
 


   retosxusuarioModel.insertRetoxUsuario= (retosxusuarioData, callback) =>{
    if(connection){
        connection.query('INSERT INTO retosxusuario SET ?', retosxusuarioData, 
             (error, result) => {
                 if(error){
                     throw error;
                 }
                 else{
                     callback(null, {
                         'insertId' :result.insertId

                     })
                 }
             }
        )
    }
    else{
        callback("No hay Conexion a la BD", null);
    }
};
*/

/*--------------------------------------------------------------
 * insertRetoxUsuario: inserta un retosxusuario
 * @param  retosxusuarioData
 * @return  {callback}
 --------------------------------------------------------------
 */


retosxusuarioModel.insertRetoxUsuario= (retosxusuarioData, callback) =>{
    if(connection)
    {

        var sqlExists = 'SELECT * FROM retosxusuario WHERE IdUsuario = ' + connection.escape(retosxusuarioData.IdUsuario) + ' AND idReto = ' + connection.escape(retosxusuarioData.IdReto) ;
        connection.query(sqlExists, function(err, row) 
        {
            //si no existe el retosxusuario si se inserta
            if(row.length == 0)
            {
                if(connection){
                    connection.query('INSERT INTO retosxusuario SET ?', retosxusuarioData, 
                         (error, result) => {
                             if(error){
                                 throw error;
                             }
                             else{
                                 callback(null, {
                                     'insertIdRetoUsuario' :retosxusuarioData.IdUsuario,
                                     'insertIdReto' :retosxusuarioData.IdReto 
                                 })
                             }
                         }
                    )
                }
                else{
                    callback("No hay Conexion a la BD", null);
                }
            }
            else
            {
                callback(null,{"msg":"Usuario ya Existe, retosxusuario "  + retosxusuarioData.IdUsuario});
            }
        });
    }
};


/*--------------------------------------------------------------
 * updateRetoxUsuario: Actualizar un retosxusuario pasando la id a actualizar
 * @param  retosxusuarioData
 * @return  {callback}
 --------------------------------------------------------------
 */

retosxusuarioModel.updateRetoxUsuario = function(retosxusuarioData, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM retosxusuario WHERE IdUsuario = ' + connection.escape(retosxusuarioData.IdUsuario) + ' AND idReto = ' + connection.escape(retosxusuarioData.IdReto) ;
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del retosxusuario a actualizar
            if(row.length > 0)
            {
                var sql = 'UPDATE retosxusuario SET Fecha = ' + connection.escape(retosxusuarioData.Fecha) + ',' +  
                'PuntajeObtenido = ' + connection.escape(retosxusuarioData.PuntajeObtenido) + ',' +  
                'EvidenciaReto = ' + connection.escape(retosxusuarioData.EvidenciaReto) + ',' +  
                'Estado = ' + connection.escape(retosxusuarioData.Estado) +  
                'WHERE IdUsuario = ' + retosxusuarioData.IdUsuario + ' AND idReto = ' + retosxusuarioData.IdReto ;
 
                connection.query(sql, function(error, result)  
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"actualizado usuario: " + retosxusuarioData.IdUsuario + " Reto:  " + retosxusuarioData.IdReto});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"No existe usuario: " + retosxusuarioData.IdUsuario + " Reto:  " + retosxusuarioData.IdReto});
            }
        });
    }
}


/*--------------------------------------------------------------
 * deleteRetoxUsuario: Eliminar un retosxusuario pasando la id a eliminar
 * @param  id
 * @return  {callback}
 --------------------------------------------------------------
 */
retosxusuarioModel.deleteRetoxUsuario = function(idUsuario, idReto, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM retosxusuario WHERE IdUsuario = ' + idUsuario + ' AND idReto = ' + idReto ;
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del retosxusuario a eliminar
            if(row.length > 0)
            {
                var sql = 'DELETE FROM retosxusuario WHERE IdUsuario = ' + idUsuario + ' AND idReto = ' + idReto ;
                connection.query(sql, function(error, result) 
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"No Existe: " + idUsuario + " Reto:  " + idReto});
            }
        });
    }
}

// Exportamos el retosxusuarioModel
module.exports = retosxusuarioModel;
