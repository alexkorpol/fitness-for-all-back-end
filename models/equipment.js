const { Schema, model } = require("mongoose");

const equipmentSchema = new Schema(
  {
    filter: {
      type: String,
    },
    name: {
      type: String,
    },
    imgURL: {
      type: String,
    },
  },
  { versionKey: false }
);

const Equipment = model("equipments", equipmentSchema, "filters");

module.exports = Equipment;
