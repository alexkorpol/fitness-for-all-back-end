const { Schema, model } = require("mongoose");

const bodyPartSchema = new Schema(
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

const Body = model("bodyparts", bodyPartSchema, "filters");

module.exports = Body;
