const path = require('path');
const fs = require('fs');

module.exports = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'File is required' });
    }

    res.locals.filePath = `${global.__multerDestPath}/${req.file.filename}`;
    res.locals.fileName = req.file.filename;

    next();
  } catch (err) {
    next(err);
  }
};
