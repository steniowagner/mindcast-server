const mp3Duration = require('mp3-duration');
const GridFs = require('gridfs-stream');
const { promisify } = require('util');
const fs = require('fs');

const { connection, mongo } = require('../db');

const _handlePersistPodcastFile = (filename, path) => {
  const gfs = GridFs(connection.db, mongo);

  const writestream = gfs.createWriteStream({
    filename,
  });

  fs.createReadStream(path).pipe(writestream);

  writestream.on('close', () => fs.unlinkSync(path));
};

const _getPodcastDuration = async (path) => {
  const duration = promisify(mp3Duration);
  const podcastDuration = await duration(path);

  return podcastDuration;
};

exports.create = async (req, res) => {
  const tempPath = `${__dirname.replace(/^(.*\/src)(.*)$/, '$1')}/temp`;
  const [fileName] = await fs.promises.readdir(tempPath);
  const filePath = `${tempPath}/${fileName}`;

  const duration = await _getPodcastDuration(filePath);

  _handlePersistPodcastFile(fileName, filePath);
};
