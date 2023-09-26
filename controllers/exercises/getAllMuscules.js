const { Filter } = require("../../models");
const HttpError = require("../../helpers/HttpError");

const getAllMuscules = async (req, res) => {
  const muscules = await Filter.find({ filter: "Muscles" });
  if (!muscules) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    muscules,
  });
};
module.exports = getAllMuscules;
