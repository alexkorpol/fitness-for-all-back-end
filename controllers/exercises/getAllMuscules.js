const { Filter } = require("../../models");

const getAllMuscules = async (req, res) => {
  const getMuscules = await Filter.find({ filter: "Muscles" });
  if (!getMuscules) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    getMuscules,
  });
};
module.exports = getAllMuscules;
