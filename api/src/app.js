import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Routes
import index from './routes/index';


// node-config package
import config from 'config';
// Mongoose
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const mongodb = config.get( 'application.mongodb' );

const app = express();
const port = process.env.port || 3001;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Apply Defined routes
app.use( '/', index );

if ( app.get('env') == 'production' ) {
  app.use( logger( 'common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' } ) );
} else {
  app.use( logger( 'dev' ) );
}

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
  let err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
});

// error handler
app.use( ( err, req, res, next ) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.render( 'error' );
});

// Mongoose connections
mongoose.connect( mongodb, { useMongoClient: true } )
  .then( () => {
    console.log('Mongodb connection is successful!');
  })
  .catch( ( err ) => {
    console.error( err );
  });

app.listen( port, () => console.log( `Node application is listening on port ${port}!` ) );

module.exports = app;
