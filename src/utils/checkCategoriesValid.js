const typesCategory = [
  'science',
  'technology',
  'philosofy',
  'literature',
  'pop-culture',
  'history',
];

module.exports = (categories) => {
  if (!categories || categories.length === 0) {
    return false;
  }

  for (let i = 0; i < categories.length; i++) {
    if (!typesCategory.includes(categories[i])) {
      return false;
    }
  }

  return true;
};
