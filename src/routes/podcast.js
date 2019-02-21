const express = require("express");
const multer = require("multer");

const PodcastController = require("../controllers/PodcastController");
const multerConfig = require("../config/multer");

const router = express.Router();

router.post("/", multer(multerConfig).single("file"), PodcastController.upload);
router.get("/listen/:file_name", PodcastController.listen);

module.exports = router;
