"use strict";

var jwt = require('jsonwebtoken');

module.exports = function() {

    return function(req, res, next) {

        //Comprobamos si viene el token el alguno de los parametros
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            // Verificamos que el token sea correcto y sino devolvemos error
            jwt.verify(token, '000000', function(err, decoded) {
                if (err) {
                    return res.json({ ok: false, error: {code: 401, message: 'Token no valido.'}});
                } else {
                    req.decoded = decoded;
                    console.log('decoded', decoded);
                    next();
                }
            });
        } else {
            // No hay token con lo que devolvemos error
            return res.status(403).json({
                ok: false,
                error: { code: 403, message: 'No token provided.'}
            });

        }
    };
};