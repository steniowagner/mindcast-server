const mongoose = require('mongoose');

const AuthorModel = require('../models/Author');

const Author = mongoose.model('Author');

exports.read = async () => {
  try {
    return await Author.find();
  } catch (err) {
    throw err;
  }
};

exports.create = async (data) => {
  try {
    const author = new Author(data);
    return await author.save();
  } catch (err) {
    throw err;
  }
};
