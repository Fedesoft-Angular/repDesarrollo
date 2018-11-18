
/**-------------------------------------------------------------
 * @fileoverview premioredimido.js, Modelo para la clase Usuario
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

// PremioRedimido Model
   let premioredimidoModel = {};

/*--------------------------------------------------------------
 * getPremiosRedimidos: Obtiene todos los premiosredimidos
 * @param  
 * @return  {premiosredimidos}
 --------------------------------------------------------------
 */

   premioredimidoModel.getPremiosRedimidos = (callback) =>{
       if(connection){
           connection.query('SELECT * from premiosredimidos', 
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
 * getPremioRedimido: Obtiene premioredimido por id
 * @param  id
 * @return  {premiosredimidos}
 --------------------------------------------------------------
 */

   
/* premioredimidoModel.getPremioRedimido = function(id,callback) 
{
    if (connection) 
    {
        var sql = 'SELECT * FROM premiosredimidos WHERE Id = ' + connection.escape(id);
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
} */

/*--------------------------------------------------------------
 * getPremioRedimidoUsurio: Obtiene premioredimido por id
 * @param  id
 * @return  {premiosredimidos}
 --------------------------------------------------------------
 */

   
premioredimidoModel.getPremioRedimidoUsuario = function(idUsuario,callback) 
{
    if (connection) 
    {
        var sql = 'SELECT * FROM premiosredimidos WHERE Estado = 1 and IdUsuario = ' + connection.escape(idUsuario);
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
 * insertPremioRedimido: inserta un premioredimido
 * @param  premioredimidoData
 * @return  {callback}
 --------------------------------------------------------------
 */


premioredimidoModel.insertPremioRedimido= (premioredimidoData, callback) =>{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM premiosredimidos WHERE IdUsuario = ' + connection.escape(premioredimidoData.IdUsuario) + ' AND IdPRoveedor = ' + connection.escape(premioredimidoData.IdProveedor) ;
        connection.query(sqlExists, function(err, row) 
        {
            //si no existe el premioredimido si se inserta
            if(row.length == 0)
            {
                if(connection){
                    connection.query('INSERT INTO premiosredimidos SET ?', premioredimidoData, 
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
                callback(null,{"msg":"PremidoRedimido ya Reclamado"});
            }
        });
    }
};


/*--------------------------------------------------------------
 * updatePremioRedimido: Actualizar un premioredimido pasando la id a actualizar
 * @param  premioredimidoData
 * @return  {callback}
 --------------------------------------------------------------
 */

premioredimidoModel.updatePremioRedimido = function(premioredimidoData, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM premiosredimidos WHERE IdUsuario = ' + connection.escape(premioredimidoData.IdUsuario) + ' AND IdPRoveedor = ' + connection.escape(premioredimidoData.IdProveedor) ;
        
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del premioredimido a actualizar
            if(row.length > 0)
            {
                var sql = 'UPDATE premiosredimidos SET CodigoQR   = ' + connection.escape(premioredimidoData.CodigoQR) + ',' +  
                ' FechaRedencion = ' + connection.escape(premioredimidoData.FechaRedencion) +
                ' Estado = ' + connection.escape(premioredimidoData.Estado) +
                ' WHERE IdUsuario = ' + connection.escape(premioredimidoData.IdUsuario) + ' AND IdPRoveedor = ' + connection.escape(premioredimidoData.IdProveedor) ;
        
 
                connection.query(sql, function(error, result)  
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"actualizado premioredimido " + premioredimidoData.Id});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"No Existe premioredimido "  + premioredimidoData.Id});
            }
        });
    }
}


/*--------------------------------------------------------------
 * deletePremioRedimido: Eliminar un premioredimido pasando la id a eliminar
 * @param  id
 * @return  {callback}
 --------------------------------------------------------------
 */
premioredimidoModel.deletePremioRedimido = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM premiosredimidos WHERE Id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del premioredimido a eliminar
            if(row.length > 0)
            {
                var sql = 'DELETE FROM premiosredimidos WHERE Id = ' + connection.escape(id);
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
                callback(null,{"msg":"No Existe premioredimido " + id});
            }
        });
    }
}

// Exportamos el premioredimidoModel
module.exports = premioredimidoModel;
