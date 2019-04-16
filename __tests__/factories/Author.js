const { factory } = require('factory-girl');

const fakeAuthor = require('../helpers/author/fakeAuthor');
const Author = require('../../src/models/Author');

factory.define('Author', Author, fakeAuthor);

module.exports = factory;
