const faker = require('faker');

module.exports = {
  categories: ['science', 'philosofy'],
  thumbnailProfileImageURL: faker.image.people(),
  profileImageURL: faker.image.people(),
  about: faker.lorem.paragraph(),
  name: faker.name.findName(),
};
