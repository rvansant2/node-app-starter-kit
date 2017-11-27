var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// node-config package
_mongoose2['default'].Promise = global.Promise;
// Mongoose


// Routes

var mongodb = _config2['default'].get('application.mongodb');

var app = (0, _express2['default'])();
var port = process.env.port || 3001;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2['default'])('dev'));
app.use(_bodyParser2['default'].json());
app.use(_bodyParser2['default'].urlencoded({ extended: false }));
app.use((0, _cookieParser2['default'])());
app.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));

// Apply Defined routes
app.use('/', _index2['default']);

if (app.get('env') == 'production') {
  app.use((0, _morgan2['default'])('common', { skip: function () {
      function skip(req, res) {
        return res.statusCode < 400;
      }

      return skip;
    }(), stream: __dirname + '/../morgan.log' }));
} else {
  app.use((0, _morgan2['default'])('dev'));
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Mongoose connections
_mongoose2['default'].connect(mongodb, { useMongoClient: true }).then(function () {
  console.log('Mongodb connection is successful!');
})['catch'](function (err) {
  console.error(err);
});

app.listen(port, function () {
  return console.log('Node application is listening on port ' + String(port) + '!');
});

module.exports = app;