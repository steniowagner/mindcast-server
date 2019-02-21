const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");

const { MONGO_URL } = require("../config/environment");

const storage = new GridFsStorage({
  url: MONGO_URL,
  file: (req, file) => {
    const { originalname } = file;

    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buffer) => {
        if (err) {
          return reject(err);
        }

        const filename = buffer.toString("hex") + path.extname(originalname);
        const fileInfo = {
          filename
        };

        resolve(fileInfo);
      });
    });
  }
});

module.exports = multer({ storage });
