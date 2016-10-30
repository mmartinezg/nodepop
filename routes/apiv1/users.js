"use strict";

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Usuario = mongoose.model('Usuario');
let jwt = require('jsonwebtoken');

router.post('/login', function (req, res, next) {
    let email = req.body.email;
    let pass = req.body.pass;

    let userRecord;
    Usuario.getAdmin(email, pass, function(err, user){
        if(err){
            next(err);
            return;
        }
        if(!user){
            res.json({success: false, err: 'Usuario no encontrado'});
        }else{
            let token = jwt.sign({id: user._id}, '000000', {expiresIn: '2 days'});

            res.json({success: true, token});
        }
    });
});

router.post('/signup', function (req, res, next) {
    let nombre = req.body.name;
    let email = req.body.email;
    let clave = req.body.pass;
    let jsonBody = {
        nombre : nombre,
        email : email,
        clave : clave
    };
    let usuario = new Usuario(jsonBody);
    usuario.save(function (err, user) {
        if(err){
            next(err);
            return;
        }
        let token = jwt.sign({id: user._id}, '000000', {expiresIn: '2 days'});

        res.json({success: true, token});
    });
});

module.exports = router;
