const { Exercise } = require("../../models");

const getAllExercises = async (req, res) => {
  const result = await Exercise.distinct("training");
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    result,
  });
};

module.exports = {
  getAllExercises,
};
