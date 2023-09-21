const Muscules = require("../../models/muscule");

const getAllMuscules = async (req, res) => {
  const getMuscules = await Muscules.find({ filter: "Muscles" });
  if (!getMuscules) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    getMuscules,
  });
};
module.exports = getAllMuscules;
