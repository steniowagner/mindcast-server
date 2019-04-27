const mongoose = require('mongoose');

const PodcastModel = require('../models/Podcast');

const Podcast = mongoose.model('Podcast');

exports.create = async (data) => {
  try {
    const podcast = new Podcast(data);
    return await podcast.save();
  } catch (err) {
    throw err;
  }
};

exports.read = async () => {
  try {
    return await Podcast.find().populate('author');
  } catch (err) {
    throw err;
  }
};

exports.readById = async (id) => {
  try {
    return await Podcast.findById(id).populate('author');
  } catch (err) {
    throw err;
  }
};

exports.readByCategory = async (category) => {
  try {
    return await Podcast.find({ category });
  } catch (err) {
    throw err;
  }
};

exports.filterByCategory = async (categories) => {
  try {
    return await Podcast.find({ category: { $in: categories } });
  } catch (err) {
    throw err;
  }
};
