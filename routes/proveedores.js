/**-------------------------------------------------------------
 * @fileoverview proveedores.js, Route para la clase proveedores
 * @version  0.0
 * @author Jaime Cortes <jaimecortes9@gmail.com>
 * Versiones:
 * v0.0 – Primera version del route proveedores
 * --------------------------------------------------------------
 */

 // Variables
var express = require('express');
var router = express.Router();
var proveedor = require('../models/proveedor');

// Codigo necesario para llamar el route desde una pagina Angular
router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/*--------------------------------------------------------------
 * GET: VERBO GET proveedores
 * @param  
 * @return  {proveedores}
 --------------------------------------------------------------
 */
router.get('/', function(req, res, next) {
  //res.json({proveedores: [{name: 'Timmy'}]});
  proveedor.getProveedores((error, data)=>{
     res.status(200).json(data);
      })
});


/*--------------------------------------------------------------
 * GET: VERBO GET con parametro Id
 * @param id
 * @return  {proveedor}
 --------------------------------------------------------------
 */
router.get('/:Id', function(req, res) 
{
    var id = req.params.Id;
    //solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        proveedor.getProveedor(id,function(error, data)
        {
            //si existe el proveedor mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
               
               
            }
            //en otro caso mostramos un error
            else
            {
                res.status(404).json("msg: No Existe proveedor " + id );
            }
        });
    }
    //si la id no es numerica mostramos un error de servidor
    else
    {
        res.json(500,{"msg":"el id debe ser numerico"});
    }
});

/*--------------------------------------------------------------
 * POST: VERBO POST inserta un proveedor
 * @param  proveedorData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.post('/', function(req, res){
const proveedorData = {
  Id: null,
  Nombre: req.body.Nombre,
  Telefono: req.body.Telefono,
  Correo: req.body.Correo,
  Logo: req.body.Logo,
  Usuario: req.body.Usuario,
  Clave: req.body.Clave,
  PuntajePremio: req.body.PuntajePremio,
  DescripicionPremio: req.body.DescripicionPremio,
  FechaCreacion: req.body.FechaCreacion,  
  FechaModificacion: req.body.FechaModificacion,  
  Estado: req.body.Estado
};

  proveedor.insertProveedor(proveedorData,(error, data)=>{
    if(data && data.insertId){
      res.json({
        success: true,
        msg: "proveedor Creado",
        data: data
      })
    }
    else{
      res.json({
        success: false,
        msg: "Error en la creacion del proveedor",
        data: error
      })
    }
  }) 
});

/*--------------------------------------------------------------
 * PUT: VERBO PUT actualiza un proveedor
 * @param  proveedorData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.put('/', function(req, res)
{
    //almacenamos los datos del formulario en un objeto
   

    const proveedorData = {
      Id: req.body.Id,
      Nombre: req.body.Nombre,
      Telefono: req.body.Telefono,
      Correo: req.body.Correo,
      Usuario: req.body.Usuario,
      Clave: req.body.Clave,
      Puntaje: req.body.Puntaje,
      FechaCreacion: req.body.FechaCreacion,  
      FechaModificacion: req.body.FechaModificacion,  
      Estado: req.body.Estado
    };
    proveedor.updateProveedor(proveedorData,function(error, data)
    {
        //si el proveedor se ha actualizado correctamente mostramos un mensaje
        if(data && data.msg)
        {
            res.json({
            data: data
          });
          
        }
        else
        {
            res.json(500,{"msg":"Error"});
        }
    });
});



/*--------------------------------------------------------------
 * DELETE: VERBO DELETE borra un proveedor pasado por parametro
 * @param  Id por parametro
 * @return  {callback}
 --------------------------------------------------------------
 */

router.delete("/:Id", function(req, res)
{
    //id del proveedor a eliminar
    var id = req.params.Id;
    proveedor.deleteProveedor(id,function(error, data)
    {
        if(data && data.msg === "deleted" )
        {
          res.status(200).json({
            success: true,
            msg: "proveedor " + id +  " Borrado",
            data: data
          });
        }
        else
        {
            res.status(500).json({msg:data.msg});
        }
    });
})

// Exporta el Router
module.exports = router;
