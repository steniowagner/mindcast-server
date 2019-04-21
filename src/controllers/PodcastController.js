exports.create = async (req, res) => {
  const { fileName } = res.locals;
  const { id } = req.params;

  console.log(fileName, id);

  return res
    .status(201)
    .json({ author: { fileName: res.locals.fileName } })
    .send();
};
