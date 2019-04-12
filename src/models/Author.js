const mongoose = require('../db');

const AuthroSchema = new mongoose.Schema({
  podcasts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Podcast',
  },
  categories: [
    {
      type: String,
      required: true,
      enum: [
        'science',
        'technology',
        'philosofy',
        'literature',
        'pop-culture',
        'history',
      ],
    },
  ],
  name: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
    required: true,
  },
  thumbnailProfileImageURL: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

AuthroSchema.set('toJSON', {
  transform(doc, returned) {
    const returnedDocument = JSON.stringify(returned);
    const document = JSON.parse(returnedDocument);

    document.id = returned._id;
    delete document._id;

    return document;
  },
});

module.exports = mongoose.model('Author', AuthroSchema);
