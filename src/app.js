const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routeNotFound = require('./middlewares/routeNotFound');
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use('/mind-cast/api/v1', require('./routes'));

app.use(routeNotFound);

app.use(errorHandler);

module.exports = app;
