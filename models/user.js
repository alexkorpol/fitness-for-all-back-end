const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegex = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;

const userSchema = new Schema(
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
    // subscription: {
    //   type: String,
    //   enum: ["starter", "pro", "business"],
    //   default: "starter",
    // },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
  email: Joi.string().required().pattern(emailRegex).messages({
    "any.required": `Missing required email field`,
  }),
  password: Joi.string().required().pattern(passwordRegex).messages({
    "any.required": `Missing required password field`,
  }),
});

// const emailShema = Joi.object({
//   email: Joi.string().required().pattern(emailRegex).messages({
//     "any.required": `Missing required email field`,
//   }),
// });

const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex).messages({
    "any.required": `Missing required email field`,
  }),
  password: Joi.string().required().pattern(passwordRegex).messages({
    "any.required": `Missing required password field`,
  }),
});
const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
