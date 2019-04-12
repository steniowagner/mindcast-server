const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config/environment');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;
