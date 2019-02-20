const mongoose = require("../db");

exports.upload = (req, res, next) => {
  console.log(req.file);
};
