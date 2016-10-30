"use strict";

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Anuncio = mongoose.model('Anuncio');
let Usuario = mongoose.model('Usuario');
let fs = require('fs');
let sha256 = require('sha256');

router.get('/', function (req, res, next) {
    //Leemos el archivo de anuncios y creamos los datos en MongoDB

    fs.readFile('anuncios.json', 'utf8', function (err, data) {
        if(err){
            throw err;
        }
        let preconfigJson = JSON.parse(data);
        deleteAnuncios();
        addAnuncios(preconfigJson.anuncios);
        deleteUsers();
        addUsers(preconfigJson.usuarios);
    });
    res.json({success:true});
});


//Insertamos los anuncios preCargados
function addAnuncios(anuncios) {

    anuncios.forEach(function (anuncio) {
        let mAnuncio = new Anuncio(anuncio);

        mAnuncio.save(function (err, anuncioGuardado) {
            if(err){
                next(err);
                return;
            }
        });
    });
}

//Borramos los anuncios que tuvieramos
function deleteAnuncios() {
    Anuncio.remove(null, function (err,result) {
        if(err){
            next(err);
            return;
        }
    });
}

//Borramos los usuarios que tuvieramos
function deleteUsers() {
    Usuario.remove(null, function (err,result) {
        if(err){
            next(err);
            return;
        }
    });
}

//Insertamos los anuncios preCargados
function addUsers(usuarios) {

    usuarios.forEach(function (usuario) {
        let usuarioJson = {
            nombre : usuario.nombre,
            email : usuario.email,
            clave : sha256(usuario.clave)
        }
        var mUsuario = new Usuario(usuarioJson);

        mUsuario.save(function (err, usuarioGuardado) {
            if(err){
                next(err);
                return;
            }
        });
    });
}

module.exports = router;