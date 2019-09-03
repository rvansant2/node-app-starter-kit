import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// node-config package
import config from 'config';
// Mongoose
import mongoose from 'mongoose';
import cors from 'cors';
// Routes
import index from './routes/index';

mongoose.Promise = global.Promise;
const db = config.get('application.db');

const app = express();
const port = process.env.PORT || 3002;

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Enable cors
app.use(cors());

// Apply Defined routes
app.use('/', index);

if (app.get('env') === 'production') {
  app.use(
    logger('common', {
      skip(req, res) {
        return res.statusCode < 400;
      },
      stream: `${__dirname}/../morgan.log`,
    }),
  );
} else {
  app.use(logger('dev'));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Mongoose connections
mongoose
  .connect(
    db,
    { useMongoClient: true },
  )
  .then(() => {
    console.info('Mongodb connection is successful!');
  })
  .catch(err => {
    console.error(err);
  });

app.listen(port, () =>
  console.log(`Node application is listening on port ${port}!`),
);

export default app;
