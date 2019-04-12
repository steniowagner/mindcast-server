const mongoose = require('mongoose');
const { MONGO_URL } = require('../config/environment');

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;
