const GridFs = require('gridfs-stream');
const fs = require('fs');

const { connection, mongo } = require('../../db');

module.exports = (req, res, next) => {
  try {
    const { fileName, filePath } = res.locals;

    const gfs = GridFs(connection.db, mongo);

    const writestream = gfs.createWriteStream({
      root: 'podcasts_uploaded',
      filename: fileName,
    });

    fs.createReadStream(filePath).pipe(writestream);

    writestream.on('error', err => next(err));

    writestream.on('close', () => {
      fs.unlinkSync(filePath);
      next();
    });
  } catch (err) {
    next(err);
  }
};
