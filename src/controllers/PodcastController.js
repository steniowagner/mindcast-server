const debug = require("debug")("mind-cast-api:podcast-controller");
const GridFs = require("gridfs-stream");
const mongoose = require("../db");

exports.upload = (req, res, next) => {
  console.log(req.file);
};

exports.listen = (req, res, next) => {
  const gfs = GridFs(mongoose.connection.db, mongoose.mongo);
  const filename = `${req.params.file_name}.mp3`;

  gfs.findOne({ filename }, (err, file) => {
    if (err || !file) {
      return res.status(404).json({ message: "Podcast not found." });
    }

    const { range } = req.headers;
    const { length } = file;

    const startChunk = Number(
      (range || "").replace(/bytes=/, "").split("-")[0]
    );
    const endChunk = length - 1;
    const chunkSize = endChunk - startChunk + 1;

    res.set({
      "Content-Range": `bytes ${startChunk}-${endChunk}/${length}`,
      "Content-Length": chunkSize,
      "Content-Type": "audio/mpeg",
      "Accept-Ranges": "bytes"
    });

    res.status(206);

    const podcastReadStream = gfs.createReadStream({
      filename: file.filename,
      range: {
        startPos: startChunk,
        endPos: endChunk
      }
    });

    podcastReadStream.on("open", () => {
      debug("OPEN");
      podcastReadStream.pipe(res);
    });

    podcastReadStream.on("data", chunk => debug(chunk));

    podcastReadStream.on("error", streamErr => {
      debug(streamErr);
      res.status(500).end(streamErr);
    });
  });
};
