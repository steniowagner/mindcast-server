module.exports = (err, next) => {
  err.status = 500;

  const hasFieldErrors = Object.keys(err.errors).length > 0;

  if (hasFieldErrors) {
    err.status = 400;
  }

  next(err);
};
