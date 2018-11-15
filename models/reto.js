
/**-------------------------------------------------------------
 * @fileoverview reto.js, Modelo para la clase reto
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

// Reto Model
   let RetoModel = {};

/*--------------------------------------------------------------
 * getRetos: Obtiene todos los retos
 * @param  
 * @return  {retos}
 --------------------------------------------------------------
 */

   RetoModel.getRetos = (callback) =>{
       if(connection){
           connection.query('SELECT * from reto', 
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
 * getReto: Obtiene reto por id
 * @param  id
 * @return  {retos}
 --------------------------------------------------------------
 */

   
RetoModel.getReto = function(id,callback) 
{
    if (connection) 
    {
        var sql = 'SELECT *  FROM reto WHERE Id = ' + connection.escape(id);
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
 * insertReto: inserta un reto
 * @param  retoData
 * @return  {callback}
 --------------------------------------------------------------
 */


   RetoModel.insertReto= (retoData, callback) =>{
    if(connection){
        connection.query('INSERT INTO reto SET ?', retoData, 
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

/*--------------------------------------------------------------
 * updateReto: Actualizar un reto pasando la id a actualizar
 * @param  retoData
 * @return  {callback}
 --------------------------------------------------------------
 */

RetoModel.updateReto = function(retoData, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM reto WHERE Id = ' + connection.escape(retoData.Id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del reto a actualizar
            if(row.length > 0)
            {
                
                var sql = 'UPDATE reto SET ' + 
                'Nombre = ' + connection.escape(retoData.Nombre) + ',' +  
                'Descripcion = ' + connection.escape(retoData.Descripcion) + ',' +  
                'FechaInicio = ' + connection.escape(retoData.FechaInicio) + ',' +  
                'FechaFin = ' + connection.escape(retoData.FechaFin) + ',' +  
                'Puntaje = ' + connection.escape(retoData.Puntaje) + ',' + 
                'Estado = ' + connection.escape(retoData.Estado) + 
                ' WHERE Id = ' + retoData.Id;
 
                connection.query(sql, function(error, result)  
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"actualizado reto " + retoData.Id});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"No Existe reto "  + retoData.Id});
            }
        });
    }
}


/*--------------------------------------------------------------
 * deleteReto: Eliminar un reto pasando la id a eliminar
 * @param  id
 * @return  {callback}
 --------------------------------------------------------------
 */
RetoModel.deleteReto = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM reto WHERE Id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del reto a eliminar
            if(row.length > 0)
            {
                var sql = 'DELETE FROM reto WHERE Id = ' + connection.escape(id);
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
                callback(null,{"msg":"No Existe reto " + id});
            }
        });
    }
}

// Exportamos el RetoModel
module.exports = RetoModel;
