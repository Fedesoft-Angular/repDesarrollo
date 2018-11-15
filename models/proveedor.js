
/**-------------------------------------------------------------
 * @fileoverview proveedor.js, Modelo para la clase proveedor
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

// proveedor Model
   let proveedorModel = {};

/*--------------------------------------------------------------
 * getproveedores: Obtiene todos los proveedores
 * @param  
 * @return  {proveedores}
 --------------------------------------------------------------
 */

   proveedorModel.getProveedores = (callback) =>{
       if(connection){
           connection.query('SELECT * from proveedor', 
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
 * getproveedor: Obtiene proveedor por id
 * @param  id
 * @return  {proveedores}
 --------------------------------------------------------------
 */

   
proveedorModel.getProveedor = function(id,callback) 
{
    if (connection) 
    {
        var sql = 'SELECT * FROM proveedor WHERE Id = ' + connection.escape(id);
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
 * insertproveedor: inserta un proveedor
 * @param  proveedorData
 * @return  {callback}
 --------------------------------------------------------------
 */


   proveedorModel.insertProveedor= (proveedorData, callback) =>{
    if(connection){
        connection.query('INSERT INTO proveedor SET ?', proveedorData, 
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
 * updateproveedor: Actualizar un proveedor pasando la id a actualizar
 * @param  proveedorData
 * @return  {callback}
 --------------------------------------------------------------
 */

proveedorModel.updateProveedor = function(proveedorData, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM proveedor WHERE Id = ' + connection.escape(proveedorData.Id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del proveedor a actualizar
            if(row.length > 0)
            {
                
                var sql = 'UPDATE proveedor SET ' + 
                'Nombre = ' + connection.escape(proveedorData.Nombre) + ',' +  
                'Telefono = ' + connection.escape(proveedorData.Telefono) + ',' +  
                'Correo = ' + connection.escape(proveedorData.Correo) + ',' +  
                'Usuario = ' + connection.escape(proveedorData.Usuario) + ',' +  
                'Clave = ' + connection.escape(proveedorData.Clave) + ',' + 
                'Puntaje = ' + connection.escape(proveedorData.Puntaje) + ',' + 
                'FechaCreacion = ' + connection.escape(proveedorData.FechaCreacion) + ',' + 
                'FechaModificacion = ' + connection.escape(proveedorData.FechaModificacion) + ',' + 
                'Estado = ' + connection.escape(proveedorData.Estado) + 
                ' WHERE Id = ' + proveedorData.Id;
 
                connection.query(sql, function(error, result)  
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"actualizado proveedor " + proveedorData.Id});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"No Existe proveedor "  + proveedorData.Id});
            }
        });
    }
}


/*--------------------------------------------------------------
 * deleteproveedor: Eliminar un proveedor pasando la id a eliminar
 * @param  id
 * @return  {callback}
 --------------------------------------------------------------
 */
proveedorModel.deleteProveedor = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM proveedor WHERE Id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del proveedor a eliminar
            if(row.length > 0)
            {
                var sql = 'DELETE FROM proveedor WHERE Id = ' + connection.escape(id);
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
                callback(null,{"msg":"No Existe proveedor " + id});
            }
        });
    }
}

// Exportamos el proveedorModel
module.exports = proveedorModel;
