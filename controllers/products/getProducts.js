const { Product } = require("../../models");

const getProducts = async (req, res) => {
  const { title, category, recommended } = req.query;

  const { blood } = req.user.bodyData;

  const query = {};

  if (recommended === "true") {
    const field = `groupBloodNotAllowed.${blood}`;
    query[field] = true;
  }

  if (recommended === "false") {
    const field = `groupBloodNotAllowed.${blood}`;
    query[field] = false;
  }

  if (category) {
    query.category = category;
  }

  if (title) {
    const titleRegex = new RegExp(title, "i");
    query.title = titleRegex;
  }

  const allProducts = await Product.find(query);

  res.status(200).json({
    allProducts,
  });
};

module.exports = getProducts;
