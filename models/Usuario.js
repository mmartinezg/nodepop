"use strict";

var mongoose = require('mongoose');

//Defino el esquema de los agentes
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});



var Usuario = mongoose.model('Usuario', usuarioSchema);