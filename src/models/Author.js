const mongoose = require('../db');

const typesCategory = [
  'science',
  'technology',
  'philosofy',
  'literature',
  'pop-culture',
  'history',
];

const AuthroSchema = new mongoose.Schema(
  {
    podcasts: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'Podcast',
    },
    categories: [
      {
        type: String,
        required: true,
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
  },
  { versionKey: false },
);

AuthroSchema.path('categories').validate((categories) => {
  if (!categories || categories.length === 0) {
    return false;
  }

  for (let i = 0; i < categories.length; i++) {
    if (!typesCategory.includes(categories[i])) {
      return false;
    }
  }

  return true;
});

AuthroSchema.set('toJSON', {
  transform(doc, returned) {
    const returnedDocument = JSON.stringify(returned);
    const document = JSON.parse(returnedDocument);

    document.id = returned._id;

    delete document._id;
    delete document.__v;

    return document;
  },
});

module.exports = mongoose.model('Author', AuthroSchema);
