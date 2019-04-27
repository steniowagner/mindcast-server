const shuffleArray = require('../utils/shuffleArray');
const PodcastDAO = require('../dao/PodcastDAO');
const AuthorDAO = require('../dao/AuthorDAO');

exports.read = async (req, res, next) => {
  try {
    const { categories } = req.query;

    if (!categories) {
      return res
        .status(400)
        .send({ message: "The filter 'categories' is required." });
    }

    if (categories === '$all') {
      const podcasts = await PodcastDAO.read();
      const authors = await AuthorDAO.read();

      return res
        .status(200)
        .json({
          hottestPodcasts: shuffleArray(podcasts).slice(0, 18),
          trendingAuthors: shuffleArray(authors).slice(0, 18),
          newReleases: shuffleArray(podcasts).slice(0, 18),
        })
        .send();
    }

    const queryCategories = Array.isArray(categories)
      ? categories
      : [categories];

    const podcasts = await PodcastDAO.filterByCategory(queryCategories);
    const authors = await AuthorDAO.filterByCategory(queryCategories);

    return res
      .status(200)
      .json({
        hottestPodcasts: shuffleArray(podcasts).slice(0, 18),
        trendingAuthors: shuffleArray(authors).slice(0, 18),
        newReleases: shuffleArray(podcasts).slice(0, 18),
      })
      .send();
  } catch (err) {
    next(err);
  }
};
