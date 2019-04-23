const checkCategoriesValid = require('../utils/checkCategoriesValid');
const mongoose = require('../db');

const PodcastSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  thumbnailImageURL: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  durationInSeconds: {
    type: Number,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

PodcastSchema.set('toJSON', {
  transform(_doc, returned) {
    const returnedDocument = JSON.stringify(returned);
    const document = JSON.parse(returnedDocument);

    document.id = returned._id;

    delete document._id;
    delete document.__v;

    return document;
  },
});

module.exports = mongoose.model('Podcast', PodcastSchema);
