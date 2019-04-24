const mongoose = require('mongoose');
const faker = require('faker');

const PodcastModel = require('../../../src/models/Podcast');
const fakePodcast = require('./fakePodcast');

const Podcast = mongoose.model('Podcast');

const createSinglePodcast = author => Podcast.create({ ...fakePodcast, author });

const createMultiplesPodcasts = async (numberOfPodcasts, author) => {
  const podcasts = await Promise.all(
    Array(numberOfPodcasts)
      .fill({})
      .map(() => createSinglePodcast(author)),
  );

  return podcasts;
};

module.exports = {
  createSinglePodcast,
  createMultiplesPodcasts,
};
