const express = require('express');
const multer = require('multer');

const PodcastController = require('../controllers/PodcastController');
const AuthorController = require('../controllers/AuthorController');

const router = express.Router();

router.get('/', AuthorController.read);
router.get('/:id', AuthorController.readById);
router.post('/', AuthorController.create);
router.patch('/:id', AuthorController.update);
router.delete('/:id', AuthorController.delete);

router.post('/:id/podcasts', PodcastController.create);

module.exports = router;
