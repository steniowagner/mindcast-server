const mongoose = require('mongoose');

const clearDatabase = async () => {
  await mongoose.connection.dropDatabase();
};

module.exports = clearDatabase;
