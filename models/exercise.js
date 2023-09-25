const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const exerciseSchema = new Schema(
  {
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    name: String,
    target: String,
    burnedCalories: Number,
    time: Number,
  },
  { versionKey: false }
);

exerciseSchema.post("save", handleMongooseError);

const Exercise = model("exercise", exerciseSchema);

module.exports = Exercise;
