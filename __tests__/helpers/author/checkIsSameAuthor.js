const checkIsSameStringField = (firstAuthorField, secondAuthorField) => {
  if (!firstAuthorField || !secondAuthorField) {
    return false;
  }

  const isSameType = typeof firstAuthorField === 'string'
    && typeof firstAuthorField === typeof secondAuthorField;
  const isSameValue = firstAuthorField === secondAuthorField;

  return isSameType && isSameValue;
};

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

  keys.forEach((key) => {
    if (!checkIsSameStringField(firstAuthor[key], secondAuthor[key])) {
      return false;
    }
  });

  return true;
};

module.exports = checkIsSameAuthor;
