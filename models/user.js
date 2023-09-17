const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegex = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;

//проверка на соответствие пароля регулярному выражению:
// const str = "Quei123";
// const result = passwordRegex.test(str);
// console.log(result);

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
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
    "object.pattern.match":
      "It expects a string that starts with one or more word characters, followed by the '@' symbol, followed by one or more characters (letters or underscores), and finally, a top-level domain (TLD) of two or three letters.",
  }),
  password: Joi.string().required().messages({
    "object.pattern.match":
      "The entire string must consist of 7 characters, which can be letters in uppercase or lowercase and/or digits.",
  }),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
};
