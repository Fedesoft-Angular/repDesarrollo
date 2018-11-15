/**-------------------------------------------------------------
 * @fileoverview educativos.js, Route para la clase educativos
 * @version  0.0
 * @author Jaime Cortes <jaimecortes9@gmail.com>
 * Versiones:
 * v0.0 – Primera version del route educativos
 * --------------------------------------------------------------
 */

 // Variables
var express = require('express');
var router = express.Router();
var educativo = require('../models/educativo');

// Codigo necesario para llamar el route desde una pagina Angular
router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/*--------------------------------------------------------------
 * GET: VERBO GET educativos
 * @param  
 * @return  {educativos}
 --------------------------------------------------------------
 */
router.get('/', function(req, res, next) {
  //res.json({educativos: [{name: 'Timmy'}]});
  educativo.getEducativos((error, data)=>{
     res.status(200).json(data);
      })
});


/*--------------------------------------------------------------
 * GET: VERBO GET con parametro Id
 * @param id
 * @return  {educativo}
 --------------------------------------------------------------
 */
router.get('/:Id', function(req, res) 
{
    var id = req.params.Id;
    //solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        educativo.getEducativo(id,function(error, data)
        {
            //si existe el educativo mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
               
               
            }
            //en otro caso mostramos un error
            else
            {
                res.status(404).json("msg: No Existe educativo " + id );
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
 * POST: VERBO POST inserta un educativo
 * @param  educativoData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.post('/', function(req, res){
const educativoData = {
  Id: null,
  NombreTema: req.body.NombreTema,
  Descripcion: req.body.Descripcion,
  Url: req.body.Url,
  Foto: req.body.Foto,
  Estado: req.body.Estado
};

  educativo.insertEducativo(educativoData,(error, data)=>{
    if(data && data.insertId){
      res.json({
        success: true,
        msg: "educativo Creado",
        data: data
      })
    }
    else{
      res.json({
        success: false,
        msg: "Error en la creacion del educativo",
        data: error
      })
    }
  }) 
});

/*--------------------------------------------------------------
 * PUT: VERBO PUT actualiza un educativo
 * @param  educativoData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.put('/', function(req, res)
{
    //almacenamos los datos del formulario en un objeto
   

    const educativoData = {
      Id: req.body.Id,
      NombreTema: req.body.NombreTema,
      Descripcion: req.body.Descripcion,
      Url: req.body.Url,
      Foto: req.body.Foto,
      Estado: req.body.Estado
    };
    educativo.updateEducativo(educativoData,function(error, data)
    {
        //si el educativo se ha actualizado correctamente mostramos un mensaje
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
 * DELETE: VERBO DELETE borra un educativo pasado por parametro
 * @param  Id por parametro
 * @return  {callback}
 --------------------------------------------------------------
 */

router.delete("/:Id", function(req, res)
{
    //id del educativo a eliminar
    var id = req.params.Id;
    educativo.deleteEducativo(id,function(error, data)
    {
        if(data && data.msg === "deleted" )
        {
          res.status(200).json({
            success: true,
            msg: "educativo " + id +  " Borrado",
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
