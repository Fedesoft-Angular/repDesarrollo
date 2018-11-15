
//var functions = require('firebase-functions');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var retos = require('./routes/retos');
var educativos = require('./routes/educativos');
var proveedores = require('./routes/proveedores');
var retosxusuario = require('./routes/retosxusuario');
var juegos = require('./routes/juegos');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('uploads'));

app.use('/api/users', users);
app.use('/api/retos', retos);
app.use('/api/educativos', educativos);
app.use('/api/proveedores', proveedores);
app.use('/api/retosxusuario', retosxusuario);
app.use('/api/juegos', juegos);
module.exports = app;
//exports.app = functions.https.onRequest(app);
