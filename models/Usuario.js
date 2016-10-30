"use strict";

var mongoose = require('mongoose');

//Defino el esquema de los agentes
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

usuarioSchema.statics.getAdmin = function (email, pass, cb) {
    Usuario.findOne({email: email, clave: pass },function (err, user) {
        if(err){
            cb(err);
            return;
        }
        cb(err, user);
    });
};

var Usuario = mongoose.model('Usuario', usuarioSchema);