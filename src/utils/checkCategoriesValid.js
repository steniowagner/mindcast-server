const categories = require('./categories');

module.exports = (categoriesReceived) => {
  if (!categoriesReceived || categoriesReceived.length === 0) {
    return false;
  }

  for (let i = 0; i < categoriesReceived.length; i++) {
    if (!categories.includes(categoriesReceived[i])) {
      return false;
    }
  }

  return true;
};
