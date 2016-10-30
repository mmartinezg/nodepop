var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
require('./lib/mongoConnection');

//cargo los modelos
require('./models/Anuncio');
require('./models/Usuario');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/users', require('./routes/apiv1/users'));
app.use('/apiv1/script', require('./routes/apiv1/script'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);

      //Si es una peticion de API devovlemos un JSON, sino una web
      if(isAPI(req)){
          res.json({success: false, error: err});
      }else {
          res.render('error', {
              message: err.message,
              error: err
          });
      }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    //Si es una peticion de API devovlemos un JSON, sino una web
    if(isAPI(req)){
        res.json({success: false, error: err});
    }else {
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});


//Determinamos si es una peticion de api o de web
function isAPI(req) {
    return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
