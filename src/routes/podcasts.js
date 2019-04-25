const express = require('express');

const PodcastController = require('../controllers/PodcastController');

const router = express.Router();

router.get('/:id/download', PodcastController.download);
router.get('/:id/listen', PodcastController.listen);
router.get('/:id', PodcastController.readById);
router.get('/', PodcastController.read);

module.exports = router;
