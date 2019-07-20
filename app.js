const express = require('express'),
 path = require('path'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan'),
 routing = require('./config/route'), 
 cors = require('cors'),
 app = express();

app.use(logger('dev')); //used logger
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true or false to enable input array set true
app.use(cors());
app.use(cookieParser());
app.use(function (_req, res, next) { //set CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})
app.use(express.static(path.join(__dirname, 'public'))); // public folder
app.use(routing); //routing
//set 404 custom
app.use(function (req, res) {
  const err = req.app.get('env') === 'development' ? new Error() : {};
  res.status(404).json({
    error: err.stack,
    status: 404,
    msg:'Route : '+req.url+' Not found.'
  });
});

//set error 500 internal sever error custom
app.use(function (req, res) {
  const err = req.app.get('env') === 'development' ? new Error() : {};
  res.status(err.status || 500);
  res.json({
    error: err.stack,
    code: 500
  });
});
module.exports = app;
