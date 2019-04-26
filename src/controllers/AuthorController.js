const handleControllerError = require('../utils/handleControllerError');
const shuffleArray = require('../utils/shuffleArray');
const AuthorDAO = require('../dao/AuthorDAO');

exports.create = async (req, res, next) => {
  try {
    const { id } = await AuthorDAO.create(req.body);

    return res
      .status(201)
      .json({
        id,
      })
      .send();
  } catch (err) {
    handleControllerError(err, next);
  }
};

exports.read = async (_req, res, next) => {
  try {
    const authors = await AuthorDAO.read();

    return res
      .status(200)
      .json({ authors })
      .send();
  } catch (err) {
    next(err);
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await AuthorDAO.readById(id);

    if (!author) {
      return res
        .status(404)
        .json({
          message: 'Author not found',
        })
        .send();
    }

    const authorsFilteredByCategory = await AuthorDAO.filterByCategory(
      author.categories,
      author.id,
    );

    const newReleases = shuffleArray(author.podcasts).slice(0, 5);
    const featured = shuffleArray(author.podcasts).slice(0, 5);

    const result = {
      ...author._doc,
      podcasts: {
        newReleases,
        featured,
      },
      relatedAuthors: shuffleArray(authorsFilteredByCategory).slice(0, 5),
    };

    return res
      .status(200)
      .json({ author: result })
      .send();
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await AuthorDAO.update(id, { ...req.body });

    if (!author) {
      return res.status(404).send({ message: 'Author not found' });
    }

    return res.status(200).send({ author });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await AuthorDAO.delete(id);

    if (!author) {
      return res.status(404).send({ message: 'Author not found' });
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
