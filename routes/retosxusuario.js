/**-------------------------------------------------------------
 * @fileoverview retosxusuarios.js, Route para la clase Retosxusuario
 * @version  0.0
 * @author Jaime Cortes <jaimecortes9@gmail.com>
 * Versiones:
 * v0.0 – Primera version del route retosxusuario
 * --------------------------------------------------------------
 */

 // Variables
var express = require('express');
var router = express.Router();
var retoxusuario = require('../models/retoxusuario');
var bodyParser = require('body-parser');
var multer = require('multer');

//export let UPLOAD_PATH = 'uploads';
//export let PORT = 3000;

var storage = multer.diskStorage({
  destination: function(re, file, cb) {
    cb(null, './uploads/');
  },
  filename:function(req,file,cb){
    cb(null,  Date.now() + '-' + file.originalname  );
  }
});

var upload = multer({storage: storage});

/* var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
  var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' })
 */
 /*  router.use(jsonParser);
  router.use(urlencodedParser); */


// create application/json parser
/* var jsonParser = bodyParser.json({limit: '50mb'});

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true}); */

// Codigo necesario para llamar el route desde una pagina Angular
router.use(function(req, res, next){
  //res.header("Content-Type", "application/json");
  res.header("content-type", "multipart/form-data");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})




/*--------------------------------------------------------------
 * GET: VERBO GET retosxusuario
 * @param  
 * @return  {retosxusuario}
 --------------------------------------------------------------
 */
router.get('/', function(req, res, next) {
  //res.json({retosxusuarios: [{name: 'Timmy'}]});
  retoxusuario.getRetosxUsuario((error, data)=>{
     res.status(200).json(data);
      })
});


/*--------------------------------------------------------------
 * GET: VERBO GET con parametro Id
 * @param /:IdUsuario/:IdReto
 * @return  {RetoxUsuario}
 --------------------------------------------------------------
 */
router.get('/:IdUsuario/:IdReto', function(req, res) 
{
    var idUsuario = req.params.IdUsuario;
    var idReto = req.params.IdReto;
    //solo actualizamos si la id es un número
    if(!isNaN(idUsuario) || !isNaN(idReto))
    {
        retoxusuario.getRetoxUsuario(idUsuario, idReto, function(error, data)
        {
            //si existe el RetoxUsuario mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
               
               
            }
            //en otro caso mostramos un error
            else
            {
                res.status(404).json("msg: No Existe Usuario: " + idUsuario +  ", Reto: " + idReto    );
            }
        });
    }
    //si la ids no son numericas mostramos un error de servidor
    else
    {
        res.json(500,{"msg":"el idReto y idUsuario deben ser numericos"});
    }
});

/*--------------------------------------------------------------
 * GET: VERBO GET con parametro /:Nombre/:Clave
 * @param /:Nombre/:Clave
 * @return  {usuario}
 --------------------------------------------------------------
 */
/* router.get('/:Nombre/:Clave', function(req, res, next) 
{
        retoxusuario.getValidateUser(req.params.Nombre, req.params.Clave, (error, data) =>
        {
          res.status(200).json(data);
        })     
  }); */
   



/*--------------------------------------------------------------
 * POST: VERBO POST inserta un usuario
 * @param  retosxusuarioData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.post('/', upload.single('Image'), function(req, res){
  
const retosxusuarioData = {
  IdUsuario: req.body.IdUsuario,
  IdReto: req.body.IdReto,
  Fecha: req.body.Fecha,
  PuntajeObtenido: req.body.PuntajeObtenido,
  EvidenciaReto: req.file.path,
  Estado: req.body.Estado
};


  retoxusuario.insertRetoxUsuario(retosxusuarioData,(error, data)=>{
    console.log("Llego4:" + req.file.path  );
    if(data && data.insertIdRetoUsuario){
      res.json({
        success: true,
        msg: "Reto x Usuario Creado",
        data: data
      })
    }
    else{
      //res.json(500,{msg:"Error", data: data.msg});
      res.status(404).json({
        success: false,
        msg: "Error en Reto x Usuario Creado",
        data: data.msg
      })
    } 
  }) 
});

/*--------------------------------------------------------------
 * PUT: VERBO PUT actualiza un Reto x Usuario
 * @param  retosxusuarioData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.put('/', function(req, res)
{
    //almacenamos los datos del formulario en un objeto
   

    const retosxusuarioData = {
      IdUsuario: req.body.IdUsuario,
      IdReto: req.body.IdReto,
      Fecha: req.body.Fecha,
      PuntajeObtenido: req.body.PuntajeObtenido,
      EvidenciaReto: req.body.EvidenciaReto,
      Estado: req.body.Estado
    };
    retoxusuario.updateRetoxUsuario(retosxusuarioData,function(error, data)
    {
        //si el Reto x Usuario se ha actualizado correctamente mostramos un mensaje
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
 * DELETE: VERBO DELETE borra un Reto x Usuario pasado por parametro
 * @param  id del usuario y id Reto a eliminar
 * @return  {callback}
 --------------------------------------------------------------
 */

router.delete("/:IdUsuario/:IdReto", function(req, res)
{
    //id del usuario y id Reto a eliminar
    var idUsuario = req.params.IdUsuario;
    var idReto = req.params.IdReto;
    retoxusuario.deleteRetoxUsuario(idUsuario,idReto, function(error, data)
    {
        if(data && data.msg === "deleted" )
        {
          res.status(200).json({
            success: true,
            msg: "Usuario " + idUsuario + ", Reto " + idReto +  " Borrado",
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
