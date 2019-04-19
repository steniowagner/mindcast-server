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
    err.status = 500;

    const hasFieldErrors = Object.keys(err.errors).length > 0;

    if (hasFieldErrors) {
      err.status = 400;
    }

    next(err);
  }
};

exports.read = async (req, res, next) => {
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

    return res
      .status(200)
      .json({ author })
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
