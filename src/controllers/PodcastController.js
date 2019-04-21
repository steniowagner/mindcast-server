exports.create = async (req, res) => res
  .status(201)
  .json({ author: { fileName: res.locals.fileName } })
  .send();
