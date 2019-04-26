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
    return await Author.find().populate('podcasts');
  } catch (err) {
    throw err;
  }
};

exports.readById = async (id) => {
  try {
    return await Author.findById(id).populate('podcasts');
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

exports.filterByCategory = async (items, id) => {
  try {
    const authorsFilteredByCategory = await Author.aggregate()
      .unwind('$categories')
      .match({
        categories: { $in: items },
        _id: { $ne: new mongoose.Types.ObjectId(id) },
      })
      .project({ __v: 0 })
      .group({ _id: '$_id', related: { $first: '$$ROOT' } });

    return authorsFilteredByCategory.map(author => ({
      ...author.related,
      id: author.related._id,
    }));
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
