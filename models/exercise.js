const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema(
  {
    bodyPart: {
      type: String,
    },
    equipment: {
      type: String,
    },
    gifUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    target: {
      type: String,
    },
    burnedCalories: {
      type: Number,
    },
    time: {
      type: Number,
    },
  },
  { versionKey: false }
);

// const joiExerciseSchema = Joi.object({
//   bodyPart: Joi.string()
//     .valid("waist", "back", "chest", "upper legs", "upper arms")
//     .messages({ "string.base": "bodyPath must be a string" }),
//   equipment: Joi.string()
//     .valid(
//       "body weight",
//       "cable",
//       "leverage machine",
//       "assisted",
//       "medicine ball",
//       "barbell"
//     )
//     .messages({
//       "string.base": "Sex must be a string",
//     }),
//   gifUrl: Joi.string(),
//   name: Joi.string(),
//   target: Joi.string()
//     .valid(
//       "abs",
//       "lats",
//       "pectorals",
//       "hamstrings",
//       "triceps",
//       "quads",
//       "biceps",
//       "upper back",
//       "glutes"
//     )
//     .messages({ "string.base": "target must be a string" }),
//   burnedCalories: Joi.number().messages({
//     "number.base": "burnedCalories must be a number",
//   }),
//   time: Joi.number().messages({
//     "numer.base": "time must be a number",
//   }),
// });
const Exercise = model("exercise", exerciseSchema);

module.exports = {
  Exercise,
};
