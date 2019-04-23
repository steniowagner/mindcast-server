const express = require('express');

const getPodcastDurationInSeconds = require('../middlewares/podcast/getPodcastDurationInSeconds');
const setMetadataPodcastUploaded = require('../middlewares/podcast/setMetadataPodcastUploaded');
const getPodcastDuration = require('../middlewares/podcast/getPodcastDuration');
const PodcastController = require('../controllers/PodcastController');
const AuthorController = require('../controllers/AuthorController');

const router = express.Router();

// CRUD user routes
router.get('/', AuthorController.read);
router.get('/:id', AuthorController.readById);
router.post('/', AuthorController.create);
router.patch('/:id', AuthorController.update);
router.delete('/:id', AuthorController.delete);

// PODCAST routes
router.post(
  '/:id/podcasts',
  setMetadataPodcastUploaded,
  getPodcastDurationInSeconds,
  getPodcastDuration,
  PodcastController.create,
);

module.exports = router;
