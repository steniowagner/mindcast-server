const checkFieldEquality = require('../checkFieldEquality');

const checkHasSameCategories = (
  firstAuthorCategories,
  secondAuthorCategories,
) => {
  const someCategoryNotDefined = !firstAuthorCategories || !secondAuthorCategories;
  const hasDiferentCategories = firstAuthorCategories.length !== secondAuthorCategories.length;

  if (someCategoryNotDefined || hasDiferentCategories) {
    return false;
  }

  firstAuthorCategories.forEach((category) => {
    if (!secondAuthorCategories.includes(category)) {
      return false;
    }
  });

  return true;
};

const checkIsSameAuthor = (firstAuthor, secondAuthor) => {
  const keys = Object.keys(firstAuthor).filter(
    key => key !== 'categories'
      && key !== 'relatedAuthors'
      && key !== 'podcasts'
      && key !== '__v'
      && key !== '_id'
      && key !== 'id',
  );

  const hasSameCategories = checkHasSameCategories(
    firstAuthor.categories,
    secondAuthor.categories,
  );

  if (!hasSameCategories) {
    return false;
  }

  for (let i = 0; i < keys.length; i++) {
    if (!checkFieldEquality(firstAuthor[keys[i]], secondAuthor[keys[i]])) {
      return false;
    }
  }

  return true;
};

module.exports = checkIsSameAuthor;
