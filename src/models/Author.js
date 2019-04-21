const checkCategoriesValid = require('../utils/checkCategoriesValid');
const mongoose = require('../db');

const AuthorSchema = new mongoose.Schema(
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

AuthorSchema.path('categories').validate(categories => checkCategoriesValid(categories));

AuthorSchema.set('toJSON', {
  transform(doc, returned) {
    const returnedDocument = JSON.stringify(returned);
    const document = JSON.parse(returnedDocument);

    document.id = returned._id;

    delete document._id;
    delete document.__v;

    return document;
  },
});

module.exports = mongoose.model('Author', AuthorSchema);
