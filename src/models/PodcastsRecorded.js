const mongoose = require("../db");

const PodcastsRecordedSchema = mongoose.Schema({
  podcasts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
});

module.exports = mognoose.model("PodcastsRecorded", PodcastsRecordedSchema);
