const mp3Duration = require('mp3-duration');
const { promisify } = require('util');

module.exports = async (_req, res, next) => {
  try {
    const { filePath } = res.locals;

    const getDuration = promisify(mp3Duration);
    const duration = await getDuration(filePath);

    res.locals.duration = duration;

    next();
  } catch (err) {
    next(err);
  }
};
