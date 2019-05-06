const GridFs = require('gridfs-stream');

const handleControllerError = require('../utils/handleControllerError');
const checkCategoriesValid = require('../utils/checkCategoriesValid');
const persistFileGridFS = require('../utils/persistFileGridFS');
const { connection, mongo } = require('../db');
const PodcastDAO = require('../dao/PodcastDAO');
const AuthorDAO = require('../dao/AuthorDAO');

exports.listen = async (req, res, next) => {
  try {
    const gfs = GridFs(connection.db, mongo);
    const { id } = req.params;

    const podcast = await PodcastDAO.readById(id);

    if (!podcast) {
      return res.status(404).send({ message: 'Podcast not found.' });
    }

    gfs.findOne({ filename: podcast.fileName }, (err, file) => {
      const { range } = req.headers;
      const { length } = file;

      const startChunk = Number(
        (range || '').replace(/bytes=/, '').split('-')[0],
      );

      const endChunk = length - 1;
      const chunkSize = endChunk - startChunk + 1;

      res.set({
        'Content-Range': `bytes ${startChunk}-${endChunk}/${length}`,
        'Content-Length': chunkSize,
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
      });

      res.status(206);

      const podcastReadStream = gfs.createReadStream({
        filename: file.filename,
        range: {
          startPos: startChunk,
          endPos: endChunk,
        },
      });

      podcastReadStream.on('open', () => podcastReadStream.pipe(res));

      podcastReadStream.on('end', () => res.end());
    });
  } catch (err) {
    next(err);
  }
};

exports.download = async (req, res, next) => {
  try {
    const { id } = req.params;

    const podcast = await PodcastDAO.readById(id);

    if (!podcast) {
      return res.status(404).send({ message: 'Podcast not found.' });
    }

    const gfs = GridFs(connection.db, mongo);

    gfs.findOne({ filename: podcast.fileName }, (err, file) => {
      const podcastReadStream = gfs.createReadStream({
        filename: file.filename,
      });

      podcastReadStream.on('open', () => podcastReadStream.pipe(res));

      podcastReadStream.on('end', () => res.end());

      podcastReadStream.on('error', error => next(error));
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    const isCategoryValid = checkCategoriesValid([category]);

    if (!isCategoryValid) {
      return res
        .status(400)
        .send({ message: `Category '${category}' is invalid.` });
    }

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

    return res.status(201).send({ podcast });
  } catch (err) {
    handleControllerError(err, next);
  }
};

exports.read = async (_req, res, next) => {
  try {
    const podcasts = await PodcastDAO.read();

    return res.status(200).send({ podcasts });
  } catch (err) {
    next(err);
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const podcast = await PodcastDAO.readById(id);

    if (!podcast) {
      return res.status(404).send({ message: 'Podcast not found.' });
    }

    return res.status(200).send({ podcast });
  } catch (err) {
    next(err);
  }
};
