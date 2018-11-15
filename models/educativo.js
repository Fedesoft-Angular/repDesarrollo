
/**-------------------------------------------------------------
 * @fileoverview educativo.js, Modelo para la clase educativo
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

// educativo Model
   let educativoModel = {};

/*--------------------------------------------------------------
 * geteducativos: Obtiene todos los educativos
 * @param  
 * @return  {educativos}
 --------------------------------------------------------------
 */

   educativoModel.getEducativos = (callback) =>{
       if(connection){
           connection.query('SELECT * from educativo', 
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
 * geteducativo: Obtiene educativo por id
 * @param  id
 * @return  {educativos}
 --------------------------------------------------------------
 */

   
educativoModel.getEducativo = function(id,callback) 
{
    if (connection) 
    {
        var sql = 'SELECT * FROM educativo WHERE Id = ' + connection.escape(id);
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
 * inserteducativo: inserta un educativo
 * @param  educativoData
 * @return  {callback}
 --------------------------------------------------------------
 */


   educativoModel.insertEducativo= (educativoData, callback) =>{
    if(connection){
        connection.query('INSERT INTO educativo SET ?', educativoData, 
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
 * updateeducativo: Actualizar un educativo pasando la id a actualizar
 * @param  educativoData
 * @return  {callback}
 --------------------------------------------------------------
 */

educativoModel.updateEducativo = function(educativoData, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM educativo WHERE Id = ' + connection.escape(educativoData.Id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del educativo a actualizar
            if(row.length > 0)
            {
                
                var sql = 'UPDATE educativo SET ' + 
                'NombreTema = ' + connection.escape(educativoData.NombreTema) + ',' +  
                'Descripcion = ' + connection.escape(educativoData.Descripcion) + ',' +  
                'Url = ' + connection.escape(educativoData.Url) + ',' +  
                'Foto = ' + connection.escape(educativoData.Foto) + ',' +  
                'Estado = ' + connection.escape(educativoData.Estado) + 
                ' WHERE Id = ' + educativoData.Id;
 
                connection.query(sql, function(error, result)  
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"actualizado educativo " + educativoData.Id});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"No Existe educativo "  + educativoData.Id});
            }
        });
    }
}


/*--------------------------------------------------------------
 * deleteeducativo: Eliminar un educativo pasando la id a eliminar
 * @param  id
 * @return  {callback}
 --------------------------------------------------------------
 */
educativoModel.deleteEducativo = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM educativo WHERE Id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del educativo a eliminar
            if(row.length > 0)
            {
                var sql = 'DELETE FROM educativo WHERE Id = ' + connection.escape(id);
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
                callback(null,{"msg":"No Existe educativo " + id});
            }
        });
    }
}

// Exportamos el educativoModel
module.exports = educativoModel;
