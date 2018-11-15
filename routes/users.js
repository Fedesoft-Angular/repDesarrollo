/**-------------------------------------------------------------
 * @fileoverview users.js, Route para la clase Usuarios
 * @version  0.0
 * @author Jaime Cortes <jaimecortes9@gmail.com>
 * Versiones:
 * v0.0 – Primera version del route usuarios
 * --------------------------------------------------------------
 */

 // Variables
var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');

// Codigo necesario para llamar el route desde una pagina Angular
router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/*--------------------------------------------------------------
 * GET: VERBO GET usuarios
 * @param  
 * @return  {usuarios}
 --------------------------------------------------------------
 */
router.get('/', function(req, res, next) {
  //res.json({users: [{name: 'Timmy'}]});
  usuario.getUsers((error, data)=>{
     res.status(200).json(data);
      })
});


/*--------------------------------------------------------------
 * GET: VERBO GET con parametro Id
 * @param id
 * @return  {usuario}
 --------------------------------------------------------------
 */
router.get('/:Id', function(req, res) 
{
    var id = req.params.Id;
    //solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        usuario.getUser(id,function(error, data)
        {
            //si existe el usuario mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
               
               
            }
            //en otro caso mostramos un error
            else
            {
                res.status(404).json("msg: No Existe usuario " + id );
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
 * GET: VERBO GET con parametro /:Nombre/:Clave
 * @param /:Nombre/:Clave
 * @return  {usuario}
 --------------------------------------------------------------
 */
router.get('/:Nombre/:Clave', function(req, res, next) 
{
        usuario.getValidateUser(req.params.Nombre, req.params.Clave, (error, data) =>
        {
          res.status(200).json(data);
        })     
  });
   



/*--------------------------------------------------------------
 * POST: VERBO POST inserta un usuario
 * @param  userData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.post('/', function(req, res){
const userData = {
  Id: null,
  Nombre: req.body.Nombre,
  Clave: req.body.Clave,
  Direccion: req.body.Direccion,
  Telefono: req.body.Telefono,
  Usuario: req.body.Usuario,
  Correo: req.body.Correo,
  Puntaje: req.body.Puntaje,
  FechaCreacion: req.body.FechaCreacion,
  FechaModificacion: req.body.FechaModificacion,
  Estado: req.body.Estado
};

  usuario.insertUser(userData,(error, data)=>{
    if(data && data.insertId){
      res.json({
        success: true,
        msg: "Usuario Creado",
        data: data
      })
    }
    else{
      //res.json(500,{msg:"Error", data: data.msg});
      res.status(404).json({
        success: false,
        msg: "Error en la creacion del usuario",
        data: data.msg
      })
    } 
  }) 
});

/*--------------------------------------------------------------
 * PUT: VERBO PUT actualiza un usuario
 * @param  userData
 * @return  {callback}
 --------------------------------------------------------------
 */

router.put('/', function(req, res)
{
    //almacenamos los datos del formulario en un objeto
   

    const userData = {
      Id: req.body.Id,
      Nombre: req.body.Nombre,
      Clave: req.body.Clave,
      Direccion: req.body.Direccion,
      Telefono: req.body.Telefono,
      Usuario: req.body.Usuario,
      Correo: req.body.Correo,
      Puntaje: req.body.Puntaje,
      FechaCreacion: req.body.FechaCreacion,
      FechaModificacion: req.body.FechaModificacion,
      Estado: req.body.Estado
    };
    usuario.updateUser(userData,function(error, data)
    {
        //si el usuario se ha actualizado correctamente mostramos un mensaje
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
 * DELETE: VERBO DELETE borra un usuario pasado por parametro
 * @param  Id por parametro
 * @return  {callback}
 --------------------------------------------------------------
 */

router.delete("/:Id", function(req, res)
{
    //id del usuario a eliminar
    var id = req.params.Id;
    usuario.deleteUser(id,function(error, data)
    {
        if(data && data.msg === "deleted" )
        {
          res.status(200).json({
            success: true,
            msg: "Usuario " + id +  " Borrado",
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
