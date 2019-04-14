const AuthorDAO = require('../dao/AuthorDAO');

exports.create = async (req, res) => {
  try {
    const { id } = await AuthorDAO.create(req.body);

    return res
      .status(201)
      .json({
        id,
      })
      .send();
  } catch (err) {
    const { errors, message } = err;

    let status = 500;

    const hasFieldErrors = Object.keys(errors).length > 0;

    if (hasFieldErrors) {
      status = 400;
    }

    return res.status(status).send({ message });
  }
};
