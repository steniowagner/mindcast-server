const mp3Duration = require('mp3-duration');
const { promisify } = require('util');

module.exports = async (_req, res, next) => {
  try {
    const { filePath } = res.locals;

    if (!filePath) {
      return res.status(400).send({ message: 'File is required' });
    }

    const getDuration = promisify(mp3Duration);

    res.locals.durationInSeconds = await getDuration(filePath);

    next();
  } catch (err) {
    next(err);
  }
};
