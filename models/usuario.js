
/**-------------------------------------------------------------
 * @fileoverview usuario.js, Modelo para la clase Usuario
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

// User Model
   let userModel = {};

/*--------------------------------------------------------------
 * getUsers: Obtiene todos los usuarios
 * @param  
 * @return  {usuarios}
 --------------------------------------------------------------
 */

   userModel.getUsers = (callback) =>{
       if(connection){
           connection.query('SELECT * from usuarios', 
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
 * getUser: Obtiene usuario por id
 * @param  id
 * @return  {usuarios}
 --------------------------------------------------------------
 */

   
userModel.getUser = function(id,callback) 
{
    if (connection) 
    {
        var sql = 'SELECT * FROM usuarios WHERE Id = ' + connection.escape(id);
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
 * getValidateUser: Valida si un usuario existe por clave y nombre
 * @param  Nombre, Clave
 * @return  {usuarios}
 --------------------------------------------------------------
 */

   
userModel.getValidateUser = function(Nombre, Clave,callback) 
{
    if (connection) 
    {
        var sql = 'SELECT * FROM usuarios WHERE ' + Nombre + ' AND ' +  Clave; 
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


/*--------------------------------------------------------------
 * insertUser: inserta un usuario
 * @param  userData
 * @return  {callback}
 --------------------------------------------------------------
 


   userModel.insertUser= (userData, callback) =>{
    if(connection){
        connection.query('INSERT INTO usuarios SET ?', userData, 
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
 * insertUser: inserta un usuario
 * @param  userData
 * @return  {callback}
 --------------------------------------------------------------
 */


userModel.insertUser= (userData, callback) =>{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM usuarios WHERE Usuario = ' + connection.escape(userData.Usuario);
        connection.query(sqlExists, function(err, row) 
        {
            //si no existe el usuario si se inserta
            if(row.length == 0)
            {
                if(connection){
                    connection.query('INSERT INTO usuarios SET ?', userData, 
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
            }
            else
            {
                callback(null,{"msg":"Usuario ya Existe, usuario "  + userData.Usuario});
            }
        });
    }
};


/*--------------------------------------------------------------
 * updateUser: Actualizar un usuario pasando la id a actualizar
 * @param  userData
 * @return  {callback}
 --------------------------------------------------------------
 */

userModel.updateUser = function(userData, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM usuarios WHERE Id = ' + connection.escape(userData.Id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del usuario a actualizar
            if(row.length > 0)
            {
                var sql = 'UPDATE usuarios SET Nombre = ' + connection.escape(userData.Nombre) + ',' +  
                'Clave = ' + connection.escape(userData.Clave) +
                'WHERE Id = ' + userData.Id;
 
                connection.query(sql, function(error, result)  
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"actualizado usuario " + userData.Id});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"No Existe usuario "  + userData.Id});
            }
        });
    }
}


/*--------------------------------------------------------------
 * deleteUser: Eliminar un usuario pasando la id a eliminar
 * @param  id
 * @return  {callback}
 --------------------------------------------------------------
 */
userModel.deleteUser = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM usuarios WHERE Id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del usuario a eliminar
            if(row.length > 0)
            {
                var sql = 'DELETE FROM usuarios WHERE Id = ' + connection.escape(id);
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
                callback(null,{"msg":"No Existe usuario " + id});
            }
        });
    }
}

// Exportamos el userModel
module.exports = userModel;
