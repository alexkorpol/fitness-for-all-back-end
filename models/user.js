const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { handleMongooseError } = require("../helpers/");

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;

const maxDate = new Date(new Date() - 568036800000);

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      match: passwordRegex,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarUrl: { type: String, default: null },
    token: {
      type: String,
      default: null,
    },
    bodyData: {
      height: {
        type: Number,
        min: [150, "Height must be greater than or equal to 150"],
      },
      currentWeight: {
        type: Number,
        min: [35, "Current weight must be greater than or equal to 35"],
      },
      desiredWeight: {
        type: Number,
        min: [35, "Current weight must be greater than or equal to 35"],
      },
      birthday: { type: Date },
      blood: {
        type: Number,
        enum: {
          values: [1, 2, 3, 4],
        },
      },
      sex: {
        type: String,
        enum: {
          values: ["male", "female"],
        },
      },
      levelActivity: {
        type: Number,
        enum: {
          values: [1, 2, 3, 4, 5],
        },
      },
    },
    dailyRateCalories: {
      type: Number,
    },
    dailySportMin: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Missing required name field" }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base":
      "It expects a string that starts with one or more word characters, followed by the '@' symbol, followed by one or more characters (letters or underscores), and finally, a top-level domain (TLD) of two or three letters.",
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.pattern.base":
      "Must contain at least one number, one capital and one small letter of the Latin alphabet and be at least 7 characters long.",
  }),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base":
      "It expects a string that starts with one or more word characters, followed by the '@' symbol, followed by one or more characters (letters or underscores), and finally, a top-level domain (TLD) of two or three letters.",
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.pattern.base":
      "Must contain at least one number, one capital and one small letter of the Latin alphabet and be at least 7 characters long.",
  }),
});

const joiUserParamsSchema = Joi.object({
  height: Joi.number().integer().min(150).required().messages({
    "number.base": "Height must be a number",
    "number.integer": "Height must be an integer",
    "number.min": "Height must be greater than or equal to 140",
    "any.required": "Height is a required field",
  }),
  currentWeight: Joi.number().integer().min(35).required().messages({
    "number.base": "Current weight must be a number",
    "number.integer": "Current weight must be an integer",
    "number.min": "Current weight must be greater than or equal to 40",
    "any.required": "Current weight is a required field",
  }),
  desiredWeight: Joi.number().integer().min(35).required().messages({
    "number.base": "Desired weight must be a number",
    "number.integer": "Desired weight must be an integer",
    "number.min": "Desired weight must be greater than or equal to 35",
    "any.required": "Desired weight is a required field",
  }),
  birthday: Joi.date().max(maxDate).iso().required().messages({
    "date.format": "Please enter a valid date 'YYYY-mm-dd' ",
    "date.max": "You must be 18 years old",
    "any.required": "Date is a required field",
  }),
  blood: Joi.number().valid(1, 2, 3, 4).required().messages({
    "number.base": "Blood must be a number",
    "any.only": "Blood should be in the range 1-4",
    "any.required": "Blood is a required field",
  }),
  sex: Joi.string().valid("male", "female").required().messages({
    "string.base": "Sex must be a string",
    "any.only": "Sex should be 'male' or 'female'",
    "any.required": "Sex is a required field",
  }),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required().messages({
    "number.base": "Level activity must be a number",
    "any.only": "Level activity should be in the range 1-5",
    "any.required": "Level activity is a required field",
  }),
});

const joiUpdateParamsSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is a required field",
  }),
  height: Joi.number().integer().min(150).required().messages({
    "number.base": "Height must be a number",
    "number.integer": "Height must be an integer",
    "number.min": "Height must be greater than or equal to 140",
    "any.required": "Height is a required field",
  }),
  currentWeight: Joi.number().integer().min(35).required().messages({
    "number.base": "Current weight must be a number",
    "number.integer": "Current weight must be an integer",
    "number.min": "Current weight must be greater than or equal to 40",
    "any.required": "Current weight is a required field",
  }),
  desiredWeight: Joi.number().integer().min(35).required().messages({
    "number.base": "Desired weight must be a number",
    "number.integer": "Desired weight must be an integer",
    "number.min": "Desired weight must be greater than or equal to 35",
    "any.required": "Desired weight is a required field",
  }),
  birthday: Joi.date().max(maxDate).iso().required().messages({
    "date.format": "Please enter a valid date 'YYYY-mm-dd' ",
    "date.max": "You must be 18 years old",
    "any.required": "Date is a required field",
  }),
  blood: Joi.number().valid(1, 2, 3, 4).required().messages({
    "number.base": "Blood must be a number",
    "any.only": "Blood should be in the range 1-4",
    "any.required": "Blood is a required field",
  }),
  sex: Joi.string().valid("male", "female").required().messages({
    "string.base": "Sex must be a string",
    "any.only": "Sex should be 'male' or 'female'",
    "any.required": "Sex is a required field",
  }),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required().messages({
    "number.base": "Level activity must be a number",
    "any.only": "Level activity should be in the range 1-5",
    "any.required": "Level activity is a required field",
  }),
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiUserParamsSchema,
  joiUpdateParamsSchema,
};
