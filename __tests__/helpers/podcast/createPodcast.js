const mongoose = require('mongoose');
const faker = require('faker');

const PodcastModel = require('../../../src/models/Podcast');
const fakePodcast = require('./fakePodcast');

const Podcast = mongoose.model('Podcast');

const createSinglePodcast = (author, data) => Podcast.create({ ...fakePodcast, ...data, author });

const createMultiplesPodcasts = async (numberOfPodcasts, author, data) => {
  const podcasts = await Promise.all(
    Array(numberOfPodcasts)
      .fill({})
      .map(() => createSinglePodcast(author, data)),
  );

  return podcasts;
};

module.exports = {
  createSinglePodcast,
  createMultiplesPodcasts,
};
