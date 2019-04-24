const express = require('express');

const PodcastController = require('../controllers/PodcastController');

const router = express.Router();

router.get('/', PodcastController.read);
router.get('/:fileName/download', PodcastController.download);

module.exports = router;
