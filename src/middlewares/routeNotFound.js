module.exports = (_req, _res, next) => {
  const error = new Error('Route Not Found');

  error.status = 404;

  next(error);
};
