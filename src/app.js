const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const routeNotFound = require('./middlewares/routeNotFound');
const errorHandler = require('./middlewares/errorHandler');

const getMulterDestPath = () => {
  let rootTemp = `${__dirname}/temp`;

  if (process.env.NODE_ENV === 'test') {
    const [rootPath] = __dirname.split('src');
    rootTemp = `${rootPath}__tests__${path.sep}temp`;
  }

  return rootTemp;
};

global.__multerDestPath = getMulterDestPath();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: global.__multerDestPath }).single('file'));

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
