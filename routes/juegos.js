var express = require('express');
var router = express.Router();
var juego = require('../models/juego');

router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
/* GET users listing. */
router.get('/', function (req, res, next) {
    juego.get((error, data) => {
      res.status(200).json(data);
    })
  });

module.exports = router;
