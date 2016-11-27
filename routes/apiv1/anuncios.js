"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

var jsonTokenAuth = require('../../lib/jsonToken');

router.use(jsonTokenAuth());

//Devolvemos todos los tags
router.get('/tags', function (req, res, next) {
    let fields = 'tags';
    let filter = {};
    let sort = req.query.sort || null;
    let limit = parseInt(req.query.limit) || null;
    let start = parseInt(req.query.start) || 0;
    Anuncio.list(filter, sort, limit, start, fields, function (err, anuncios) {
        if(err){
            next(err);
            return;
        }
        res.json({success: true, anuncios: anuncios});
    });
});

//Devolvemos los anuncios pudiendo filtrar por tags, venta, nombre, precio y paginando
router.get('/', function (req, res, next) {
    let tags = req.query.tags;
    let venta = req.query.venta;
    let nombre = req.query.nombre;
    let precio = req.query.precio;

    let sort = req.query.sort || null;
    let limit = parseInt(req.query.limit) || null;
    let start = parseInt(req.query.start) || 0;
    let fields = req.query.fields || null;

    let filter = {};

    if(typeof tags !== 'undefined'){
        if(tags instanceof Array){

        }else{
            tags = [tags];
        }
        filter.tags = { $in: tags};
    }
    if(typeof  venta !== 'undefined'){
        filter.venta = venta;
    }
    if(typeof nombre !== 'undefined'){
        filter.nombre = new RegExp('^' + req.query.nombre, "i")
    }
    if(typeof precio !== 'undefined'){
        if(precio.indexOf("-") >= 0){
            if(precio.split('-').length == 2 && precio.split('-')[1] !== '' && precio.split('-')[0] !== ''){
               filter.precio = filtroEntreDosValores(precio);
            }else if(precio.indexOf('-') === 0){
                filter.precio = { '$lte' : parseFloat(precio.substr(1))};
            }else{
                filter.precio = { '$gte': parseFloat(precio.substr(0, precio.length - 1)) };
            }
        }else{
            filter.precio = parseFloat(precio);
        }
    }
    Anuncio.list(filter, sort, limit, start, fields, function (err, anuncios) {
        if(err){
            next(err);
            return;
        }
        anuncios.forEach(function (anuncio) {
            anuncio.foto = __dirname + anuncio.foto
;        });
        res.json({success: true, anuncios: anuncios});
    });
});

//Creamos un anuncio
router.post('/', function (req, res, next) {
    let anuncio = new Anuncio(req.body);

    anuncio.save(function (err, anuncioGuardado) {
        if(err){
            next(err);
            return;
        }
        res.json({success:true, anuncio: anuncioGuardado});
    });

});

function filtroEntreDosValores(precio) {
    let splitPrecio = precio.split('-');
    let min = 0;
    let max = 0;
    if(splitPrecio[0]<= splitPrecio[1]){
        min = splitPrecio[0];
        max = splitPrecio[1];
    }else{
        min = splitPrecio[1];
        max = splitPrecio[0];
    }
    return { '$gte': parseFloat(min), '$lte': parseFloat(max) }  ;
}

module.exports = router;
