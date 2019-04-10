const mongoose = require("../db");

const PodcastSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  },
  category: {
    type: String,
    required: true,
    enum: [
      "science",
      "technology",
      "philosofy",
      "literature",
      "pop-culture",
      "history"
    ]
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    requried: true
  },
  thumbnailImageURL: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    requried: true
  },
  url: {
    type: String,
    requried: true
  },
  duration: {
    type: String,
    requried: true
  },
  totalDurationInSeconds: {
    type: Number,
    requried: true
  }
});

AuthroSchema.set("toJSON", {
  transform: function(doc, returned, options) {
    returned.id = returned._id;
    delete returned._id;
  }
});

module.exports = mongoose.model("Podcast", PodcastSchema);
