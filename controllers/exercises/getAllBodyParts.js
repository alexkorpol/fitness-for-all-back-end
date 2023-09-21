const Body = require("../../models/bodyPart");

const getBodyParts = async (req, res, next) => {
  const getAllBodyParts = await Body.find({ filter: "Body parts" });
  if (!getAllBodyParts) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    getAllBodyParts,
  });
};

module.exports = getBodyParts;
