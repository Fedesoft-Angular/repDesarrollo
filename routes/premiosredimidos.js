/**-------------------------------------------------------------
 * @fileoverview premiosredimidos.js, Route para la clase PremiosRedimidos
 * @version  0.0
 * @author Jaime Cortes <jaimecortes9@gmail.com>
 * Versiones:
 * v0.0 – Primera version del route premiosredimidos
 * --------------------------------------------------------------
 */

 // Variables
var express = require('express');
var router = express.Router();
var premioredimido = require('../models/premioredimido');

// Codigo necesario para llamar el route desde una pagina Angular
router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/*--------------------------------------------------------------
 * GET: VERBO GET premiosredimidos
 * @param  
 * @return  {premiosredimidos}
 --------------------------------------------------------------
 */
router.get('/', function(req, res, next) {
  //res.json({premiosredimidos: [{name: 'Timmy'}]});
  premioredimido.getPremiosRedimidos((error, data)=>{
     res.status(200).json(data);
      })
});


/*--------------------------------------------------------------
 * GET: VERBO GET con parametro Id
 * @param id
 * @return  {premioredimido}
 --------------------------------------------------------------
 */
/* router.get('/:Id', function(req, res) 
{
    var id = req.params.Id;
    //solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        premioredimido.getPremioRedimido(id,function(error, data)
        {
            //si existe el premioredimido mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
               
               
            }
            //en otro caso mostramos un error
            else
            {
                res.status(404).json("msg: No Existe premioredimido " + id );
            }
        });
    }
    //si la id no es numerica mostramos un error de servidor
    else
    {
        res.json(500,{"msg":"el id debe ser numerico"});
    }
});
 */
/*--------------------------------------------------------------
 * GET: VERBO GET con parametro Id
 * @param idUsuario
 * @return  {premioredimido}
 --------------------------------------------------------------
 */
router.get('/:IdUsuario', function(req, res) 
{
    var idUsuario = req.params.IdUsuario;
    //solo actualizamos si la id es un número
    if(!isNaN(idUsuario))
    {
        premioredimido.getPremioRedimidoUsuario(idUsuario,function(error, data)
        {
            //si existe el premioredimido mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
               
               
            }
            //en otro caso mostramos un error
            else
            {
                res.status(404).json("msg: No Existe premioredimido del usuario " + idUsuario );
            }
        });
    }
    //si la id no es numerica mostramos un error de servidor
    else
    {
        res.json(500,{"msg":"el idUsuario debe ser numerico"});
    }
});

 



/*--------------------------------------------------------------
 * POST: VERBO POST inserta un premioredimido
 * @param  premioredimidoData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.post('/', function(req, res){
const premioredimidoData = {
  Id: null,
  IdUsuario: req.body.IdUsuario,
  IdProveedor: req.body.IdProveedor,
  CodigoQR: req.body.CodigoQR,
  FechaRedencion: req.body.FechaRedencion,
  Estado: req.body.Estado
};

  premioredimido.insertPremioRedimido(premioredimidoData,(error, data)=>{
    if(data && data.insertId){
      res.json({
        success: true,
        msg: "Usuario Creado",
        data: data
      })
    }
    else{
      res.status(500).json({
        success: false,
        msg: "Error en la creacion del usuario",
        data: error
      })
    } 
  }) 
});

/*--------------------------------------------------------------
 * PUT: VERBO PUT actualiza un premioredimido
 * @param  premioredimidoData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.put('/', function(req, res)
{
    //almacenamos los datos del formulario en un objeto
   

    const premioredimidoData = {
      Id: req.body.Id,
      IdUsuario: req.body.IdUsuario,
      IdProveedor: req.body.IdProveedor,
      CodigoQR: req.body.CodigoQR,
      FechaRedencion: req.body.FechaRedencion,
      Estado: req.body.Estado
    };
    premioredimido.updatePremioRedimido(premioredimidoData,function(error, data)
    {
        //si el premioredimido se ha actualizado correctamente mostramos un mensaje
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
 * DELETE: VERBO DELETE borra un premioredimido pasado por parametro
 * @param  Id por parametro
 * @return  {callback}
 --------------------------------------------------------------
 */

router.delete("/:Id", function(req, res)
{
    //id del premioredimido a eliminar
    var id = req.params.Id;
    premioredimido.deletePremioRedimido(id,function(error, data)
    {
        if(data && data.msg === "deleted" )
        {
          res.status(200).json({
            success: true,
            msg: "PremidoRedimido " + id +  " Borrado",
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
