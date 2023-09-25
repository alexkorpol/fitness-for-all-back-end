const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const filterSchema = new Schema(
  {
    filter: String,
    name: String,
    imgURL: String,
  },
  { versionKey: false }
);

filterSchema.post("save", handleMongooseError);

const Filter = model("filter", filterSchema);

module.exports = Filter;
