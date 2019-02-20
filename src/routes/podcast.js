const express = require("express");
const multer = require("multer");

const PodcastController = require("../controllers/PodcastController");
const multerConfig = require("../config/multer");

const router = express.Router();

router.post("/", multer(multerConfig).single("file"), PodcastController.upload);

module.exports = router;
