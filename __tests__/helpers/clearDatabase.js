const mongoose = require('mongoose');

module.exports = async () => mongoose.connection.dropDatabase();
