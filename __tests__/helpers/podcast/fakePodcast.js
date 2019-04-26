const faker = require('faker');

const getCategory = () => {
  const categories = [
    'science',
    'technology',
    'philosofy',
    'literature',
    'pop-culture',
    'history',
  ];

  const MAX = categories.length - 1;
  const MIN = 0;

  const RANDOM_INDEX = Math.floor(Math.random() * (MAX - MIN + 0)) + MIN;

  return categories[RANDOM_INDEX];
};

module.exports = {
  thumbnailImageURL: faker.image.people(),
  description: faker.lorem.paragraph(),
  imageURL: faker.image.people(),
  title: faker.lorem.paragraph(),
  category: getCategory(),
  stars: 3.5,
  duration: '01:11',
  durationInSeconds: 71,
  fileName: 'filename',
};
