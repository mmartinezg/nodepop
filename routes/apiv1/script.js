var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
var Usuario = mongoose.model('Usuario');
var fs = require('fs');

router.put('/', function (req, res, next) {
    //Leemos el archivo de anuncios y creamos los datos en MongoDB

    fs.readFile('anuncios.json', 'utf8', function (err, data) {
        if(err){
            console.log(err);
            throw err;
        }
        var preconfigJson = JSON.parse(data);
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
        var mAnuncio = new Anuncio(anuncio);

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
        var mUsuario = new Usuario(usuario);

        mUsuario.save(function (err, usuarioGuardado) {
            if(err){
                next(err);
                return;
            }
        });
    });
}

module.exports = router;