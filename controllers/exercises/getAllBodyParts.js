const { Filter } = require("../../models");

const getBodyParts = async (req, res, next) => {
  const getAllBodyParts = await Filter.find({ filter: "Body parts" });
  if (!getAllBodyParts) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    getAllBodyParts,
  });
};

module.exports = getBodyParts;
