const checkFieldEquality = require('../checkFieldEquality');

module.exports = (firstPodcast, secondPodcast) => {
  const keys = Object.keys(firstPodcast).filter(
    key => key !== 'durationInSeconds'
      && key !== 'duration'
      && key !== '__v'
      && key !== 'author'
      && key !== 'fileName'
      && key !== 'id',
  );

  for (let i = 0; i < keys.length; i++) {
    if (!checkFieldEquality(firstPodcast[keys[i]], secondPodcast[keys[i]])) {
      return false;
    }
  }

  return true;
};
