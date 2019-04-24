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
