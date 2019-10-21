const mm = require('music-metadata');

module.exports = async (_req, res, next) => {
  try {
    const { filePath } = res.locals;

    if (!filePath) {
      return res.status(400).send({ message: 'File is required' });
    }

    const { format } = await mm.parseFile(filePath, { duration: true });

    res.locals.durationInSeconds = Math.ceil(format.duration);
  } catch (err) {
    return next(err);
  }
  next();
};
