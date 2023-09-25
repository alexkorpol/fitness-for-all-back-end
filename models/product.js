const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const productSchema = Schema(
  {
    weight: {
      type: Number,
    },
    calories: {
      type: Number,
    },
    category: {
      type: String,
    },
    title: {
      type: String,
    },
    groupBloodNotAllowed: {
      1: Boolean,
      2: Boolean,
      3: Boolean,
      4: Boolean,
    },
  },
  { versionKey: false }
);

productSchema.post("save", handleMongooseError);

const Product = model("product", productSchema);

module.exports = Product;
