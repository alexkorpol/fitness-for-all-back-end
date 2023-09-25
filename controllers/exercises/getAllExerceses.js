const { Exercise } = require("../../models");

const getAllExercises = async (req, res) => {
  const getExercises = await Exercise.find();
  if (!getExercises) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    getExercises,
  });
};

module.exports = getAllExercises;
