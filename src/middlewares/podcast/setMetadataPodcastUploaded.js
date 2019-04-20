const fs = require('fs');

module.exports = async (req, res, next) => {
  try {
    const tempPath = `${__dirname.replace(/^(.*\/src)(.*)$/, '$1')}/temp`;
    const [fileName] = await fs.promises.readdir(tempPath);

    res.locals.filePath = `${tempPath}/${fileName}`;
    res.locals.fileName = fileName;

    next();
  } catch (err) {
    next(err);
  }
};
