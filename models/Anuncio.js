"use strict";

var mongoose = require('mongoose');

//Defino el esquema de los agentes
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


anuncioSchema.statics.list = function (filter, sort, limit, start, cb) {
    console.log(filter);
    let query = Anuncio.find(filter);
    query.sort(sort);
    query.limit(limit);
    query.skip(start);
    query.exec(function (err, anuncios) {
        if(err){
            cb(err);
            return;
        }
        cb(err,anuncios);
    });
};

var Anuncio = mongoose.model('Anuncio', anuncioSchema);