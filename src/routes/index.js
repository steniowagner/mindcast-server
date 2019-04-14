const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'UHUL! The API is UP && RUNNING!!!',
}));

router.use('/podcasts', require('./podcast'));
router.use('/author', require('./author'));

module.exports = router;
