const { factory } = require('factory-girl');
const faker = require('faker');

const Author = require('../../src/models/Author');

factory.define('Author', Author, {
  categories: ['science', 'technology', 'philosofy'],
  thumbnailProfileImageURL: faker.image.people,
  profileImageURL: faker.image.people,
  about: faker.lorem.paragraph,
  name: faker.name.findName(),
});

module.exports = factory.create('Author');
