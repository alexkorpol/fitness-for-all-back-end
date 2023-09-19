const { Product } = require("../../models");

const getCategory = async (req, res) => {
  const allCategories = await Product.distinct("category");

  res.status(200).json({
    allCategories,
  });
};

module.exports = getCategory;
