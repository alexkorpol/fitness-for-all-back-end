const Equipment = require("../../models/equipment");

const getAllEquipments = async (req, res) => {
  const getEquipments = await Equipment.find({ filter: "Equipment" });
  if (!getEquipments) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    getEquipments,
  });
};

module.exports = getAllEquipments;
