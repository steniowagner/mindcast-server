const express = require('express');

const setMetadataPodcastUploaded = require('../middlewares/podcast/setMetadataPodcastUploaded');
const getPodcastDuration = require('../middlewares/podcast/getPodcastDuration');
const PodcastController = require('../controllers/PodcastController');

const router = express.Router();

router.post(
  '/',
  setMetadataPodcastUploaded,
  getPodcastDuration,
  PodcastController.create,
);

module.exports = router;
