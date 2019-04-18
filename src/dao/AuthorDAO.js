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

exports.read = async () => {
  try {
    return await Author.find();
  } catch (err) {
    throw err;
  }
};

exports.readById = async (id) => {
  try {
    return await Author.findById(id);
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await Author.findByIdAndUpdate(id, { $set: data }, { new: true });
  } catch (err) {
    throw err;
  }
};

exports.delete = async (id) => {
  try {
    return await Author.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};
