const GridFs = require('gridfs-stream');
const fs = require('fs');

const { connection, mongo } = require('../db');

module.exports = (fileName, filePath) => {
  try {
    if (!fileName || !filePath) {
      const missedValue = !fileName ? 'fileName' : 'filePath';
      throw new Error(`${missedValue} is required`);
    }

    if (!fs.existsSync(filePath)) {
      throw new Error("File doen't exist");
    }

    const gfs = GridFs(connection.db, mongo);

    const writestream = gfs.createWriteStream({
      filename: fileName,
    });

    fs.createReadStream(filePath).pipe(writestream);

    return new Promise((resolve, reject) => {
      writestream.on('close', () => {
        fs.unlinkSync(filePath);
        resolve(true);
      });
    });
  } catch (err) {
    throw err;
  }
};
