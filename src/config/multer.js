const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");

const { MONGO_URL } = require("../config/environment");

const storage = new GridFsStorage({
  url: MONGO_URL,
  file: (req, file) => {
    const { originalname } = file;
    const fileName = originalname
      .toLowerCase()
      .split(" ")
      .join("_");

    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buffer) => {
        if (err) {
          return reject(err);
        }

        const filename = `${buffer.toString("hex")}${fileName}`;
        const fileInfo = {
          bucketName: "uploads",
          filename
        };

        resolve(fileInfo);
      });
    });
  }
});

module.exports = multer({ storage });
