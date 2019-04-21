const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'UHUL! The API is UP && RUNNING!!!',
}));

router.use('/authors', require('./authors'));

module.exports = router;
