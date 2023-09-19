const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;

//проверка на соответствие пароля регулярному выражению:
// const str = "Quei123";
// const result = passwordRegex.test(str);
// console.log(result);

const dataSchema = Schema({
  height: {
    type: Number,
    required: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  desiredWeight: {
    type: Number,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  blood: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  levelActivity: {
    type: Number,
    required: true,
  },
  dailyRateCalories: {
    type: Number,
    required: true,
  },
  dailySportMin: {
    type: Number,
    required: true,
  },
});

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
    token: {
      type: String,
      default: null,
    },
    bodyData: {
      type: Object,
      default: {},
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
  height: Joi.number().required(),
  currentWeight: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  birthday: Joi.date().required(),
  blood: Joi.number().required(),
  sex: Joi.string().required(),
  levelActivity: Joi.number().required(),
});

const User = model("user", userSchema);
const UserData = model("userData", dataSchema);

module.exports = {
  User,
  UserData,
  joiRegisterSchema,
  joiLoginSchema,
  joiUserParamsSchema,
};
