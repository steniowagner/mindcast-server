const handleControllerError = require('../utils/handleControllerError');
const persistFileGridFS = require('../utils/persistFileGridFS');

const PodcastDAO = require('../dao/PodcastDAO');
const AuthorDAO = require('../dao/AuthorDAO');

exports.create = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await AuthorDAO.readById(id);

    if (!author) {
      return res.status(404).send({ message: 'Author not found' });
    }

    const {
      durationInSeconds, fileName, filePath, duration,
    } = res.locals;

    await persistFileGridFS(fileName, filePath);

    const data = {
      ...req.body,
      durationInSeconds,
      author: id,
      fileName,
      duration,
    };

    const podcast = await PodcastDAO.create(data);

    await AuthorDAO.update(id, {
      podcasts: [...author.podcasts, podcast.id],
    });

    return res
      .status(201)
      .json({ podcast })
      .send();
  } catch (err) {
    handleControllerError(err, next);
  }
};
