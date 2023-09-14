const {Schema, model} = require("mongoose");
const Joi = require("joi");

const phoneNumberRegexp = /^(?:(?:\+?|\()?[\d\s()-]*\d[\d\s()-]*){7,14}$/;

const contactSchemaBD = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required. Please, fill name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Email is required. Please, fill Email for contact'],
    },
    phone: {
      type: String,
      match: phoneNumberRegexp,
      required: [true, 'Phone is required. Please, fill phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const contactJoiSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
    }),
  phone: Joi.string()
    .min(10).max(15)
    .required()
    .messages({
    "any.required": "missing required phone field",
    }),
  favorite: Joi.boolean()
    .messages({
    "any.required": "missing fields favorite",
    }),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing fields favorite",
  }),
});

const Contact = model("contact", contactSchemaBD);

module.exports = {
    Contact,
    contactJoiSchema,
    favoriteJoiSchema
}
