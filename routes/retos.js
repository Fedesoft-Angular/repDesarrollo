/**-------------------------------------------------------------
 * @fileoverview Retos.js, Route para la clase retos
 * @version  0.0
 * @author Jaime Cortes <jaimecortes9@gmail.com>
 * Versiones:
 * v0.0 – Primera version del route retos
 * --------------------------------------------------------------
 */

 // Variables
var express = require('express');
var router = express.Router();
var reto = require('../models/reto');

// Codigo necesario para llamar el route desde una pagina Angular
router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/*--------------------------------------------------------------
 * GET: VERBO GET retos
 * @param  
 * @return  {retos}
 --------------------------------------------------------------
 */
router.get('/', function(req, res, next) {
  //res.json({Retos: [{name: 'Timmy'}]});
  reto.getRetos((error, data)=>{
     res.status(200).json(data);
      })
});


/*--------------------------------------------------------------
 * GET: VERBO GET con parametro Id
 * @param id
 * @return  {reto}
 --------------------------------------------------------------
 */
router.get('/:Id', function(req, res) 
{
    var id = req.params.Id;
    //solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        reto.getReto(id,function(error, data)
        {
            //si existe el reto mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
               
               
            }
            //en otro caso mostramos un error
            else
            {
                res.status(404).json("msg: No Existe reto " + id );
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
 * POST: VERBO POST inserta un reto
 * @param  retoData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.post('/', function(req, res){
const retoData = {
  Id: null,
  Nombre: req.body.Nombre,
  Descripcion: req.body.Descripcion,
  FechaInicio: req.body.FechaInicio,
  FechaFin: req.body.FechaFin,
  Puntaje: req.body.Puntaje,
  Estado: req.body.Estado,
  Url: req.body.Url
};

  reto.insertReto(retoData,(error, data)=>{
    if(data && data.insertId){
      res.json({
        success: true,
        msg: "reto Creado",
        data: data
      })
    }
    else{
      res.json({
        success: false,
        msg: "Error en la creacion del reto",
        data: error
      })
    }
  }) 
});

/*--------------------------------------------------------------
 * PUT: VERBO PUT actualiza un reto
 * @param  retoData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.put('/', function(req, res)
{
    //almacenamos los datos del formulario en un objeto
   

    const retoData = {
      Id: req.body.Id,
      Nombre: req.body.Nombre,
      Descripcion: req.body.Descripcion,
      FechaInicio: req.body.FechaInicio,
      FechaFin: req.body.FechaFin,
      Puntaje: req.body.Puntaje,
      Estado: req.body.Estado,
      Url: req.body.Url
    };
    reto.updateReto(retoData,function(error, data)
    {
        //si el reto se ha actualizado correctamente mostramos un mensaje
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
 * DELETE: VERBO DELETE borra un reto pasado por parametro
 * @param  Id por parametro
 * @return  {callback}
 --------------------------------------------------------------
 */

router.delete("/:Id", function(req, res)
{
    //id del reto a eliminar
    var id = req.params.Id;
    reto.deleteReto(id,function(error, data)
    {
        if(data && data.msg === "deleted" )
        {
          res.status(200).json({
            success: true,
            msg: "reto " + id +  " Borrado",
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
