const { Filter } = require("../../models");
const HttpError = require("../../helpers/HttpError");

const getBodyParts = async (req, res, next) => {
  const allBodyParts = await Filter.find({ filter: "Body parts" });
  if (!allBodyParts) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    allBodyParts,
  });
};

module.exports = getBodyParts;
