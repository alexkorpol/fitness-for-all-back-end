const { Filter } = require("../../models");

const getAllEquipments = async (req, res) => {
  const getEquipments = await Filter.find({ filter: "Equipment" });
  if (!getEquipments) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    getEquipments,
  });
};

module.exports = getAllEquipments;
