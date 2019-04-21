const GridFs = require('gridfs-stream');

const { connection, mongo } = require('../../../src/db');

module.exports = (filename, done) => {
  const gfs = GridFs(connection.db, mongo);

  gfs.findOne({ filename, root: 'podcasts_uploaded' }, (err, file) => done(!err && file));
};
