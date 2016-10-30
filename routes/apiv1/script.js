var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
var fs = require('fs');

router.put('/', function (req, res, next) {
    fs.readFile('anuncios.json', 'utf8', function (err, data) {
        if(err){
            console.log(err);
            throw err;
        }
        deleteAnuncios();
        addAnuncios(data);
        res.json({success:true});
    });

});

//Insertamos los anuncios preCargados
function addAnuncios(data) {
    var preconfigJson = JSON.parse(data);
    var anuncios = preconfigJson.anuncios;
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


module.exports = router;