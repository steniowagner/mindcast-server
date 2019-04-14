const mongoose = require('mongoose');

const AuthorModel = require('../models/Author');

const Author = mongoose.model('Author');

exports.create = async (data) => {
  try {
    const author = new Author(data);
    return await author.save();
  } catch (err) {
    throw err;
  }
};
