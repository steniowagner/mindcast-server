const express = require('express');

const AuthorController = require('../controllers/AuthorController');

const router = express.Router();

router.get('/', AuthorController.read);
router.get('/:id', AuthorController.readById);
router.post('/', AuthorController.create);
router.patch('/:id', AuthorController.update);
router.delete('/:id', AuthorController.delete);

router.use('/:id/podcasts', require('./podcast'));

module.exports = router;
