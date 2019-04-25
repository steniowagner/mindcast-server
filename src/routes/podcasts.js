const express = require('express');

const PodcastController = require('../controllers/PodcastController');

const router = express.Router();

router.get('/', PodcastController.read);
router.get('/:fileName/download', PodcastController.download);
router.get('/:id', PodcastController.readById);

module.exports = router;
