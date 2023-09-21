const { Schema, model } = require("mongoose");

const musculeSchema = new Schema(
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

const Muscules = model("muscules", musculeSchema, "filters");

module.exports = Muscules;
