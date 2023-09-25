const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const daySchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
      },
    ],
    products: [
      {
        name: {
          type: String,
          required: true,
        },
        calories: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { versionKey: false }
);

daySchema.post("save", handleMongooseError);

const Day = model("Day", daySchema);

const schemaAddExercise = Joi.object({
  date: Joi.string(),
  exercise: Joi.object({
    name: Joi.string().required(),
    duration: Joi.number().min(1).required(),
    calories: Joi.number().min(1).required(),
  }).required(),
});

const schemaAddProduct = Joi.object({
  date: Joi.string(),
  product: Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().min(1).required(),
    calories: Joi.number().min(1).required(),
  }).required(),
});

const schemaRemoveExercise = Joi.object({
  date: Joi.string(),
  exerciseId: Joi.string().required(),
});

const schemaRemoveProduct = Joi.object({
  date: Joi.string(),
  productId: Joi.string().required(),
});

module.exports = {
  Day,
  schemaAddExercise,
  schemaAddProduct,
  schemaRemoveExercise,
  schemaRemoveProduct,
};
