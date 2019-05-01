const shuffleArray = require('../utils/shuffleArray');
const PodcastDAO = require('../dao/PodcastDAO');
const AuthorDAO = require('../dao/AuthorDAO');

const categories = [
  'science',
  'technology',
  'philosofy',
  'literature',
  'pop-culture',
  'history',
];

exports.read = async (req, res, next) => {
  try {
    const { category } = req.params;

    const isValidCategory = categories.some(item => item === category);

    if (!isValidCategory) {
      return res.status(400).send({
        message: `Category must be one of: ${categories.toString()}.`,
      });
    }

    const authors = await AuthorDAO.filterByCategory([category]);
    const podcasts = await PodcastDAO.readByCategory(category);

    return res.status(200).send({
      authors,
      featured: shuffleArray(podcasts).slice(0, 15),
      trending: shuffleArray(podcasts).slice(0, 15),
    });
  } catch (err) {
    next(err);
  }
};
