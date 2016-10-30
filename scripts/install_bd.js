"use strict";
require('../lib/mongoConnection');
require('../models/Anuncio');
var fs = require('fs');
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
var preconfigJson;
fs.readFile('scripts/anuncios.json', 'utf8', function (err, data) {
    if(err){
        console.log(err);
        throw err;
    }
    preconfigJson = JSON.parse(data);
    let anuncios = preconfigJson.anuncios;
    anuncios.forEach(function (anuncio) {
        let mAnuncio = new Anuncio(anuncio);

        mAnuncio.save(function (err, anuncioGuardado) {
            if(err){
                console.log(err);
                return;
            }
            console.log(anuncioGuardado);
        });
    });
    /*var anuncioModel = mongoose.model('Anuncio');
    anuncioModel.remove(function (err, remove) {
        if(err){
            throw err;
        }
        //Recogemos los anuncios precargados y los añadimos a la BBDD
        let anuncios = preconfigJson.anuncios;
        anuncios.forEach(function (anuncio) {
           addAnuncio(anuncio);
        });

    });*/

});

//Funcion para añadir cada anuncio a la BBDD
function addAnuncio(anuncio) {
    let mAnuncio = new Anuncio(anuncio);

    mAnuncio.save(function (err, anuncioGuardado) {
        if(err){
            console.log(err);
            return;
        }
        console.log(anuncioGuardado);
    });
}