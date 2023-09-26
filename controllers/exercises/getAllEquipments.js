const { Filter } = require("../../models");
const HttpError = require("../../helpers/HttpError");

const getAllEquipments = async (req, res) => {
  const equipments = await Filter.find({ filter: "Equipment" });
  if (!equipments) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    equipments,
  });
};

module.exports = getAllEquipments;
