const { Product } = require("../../models");

const getProducts = async (req, res) => {
  const { title, category, recommended } = req.query;

  const { blood } = req.user.bodyData;

  const query = {};

  // if (recommended === "true") {
  //   const field = `groupBloodNotAllowed.${blood}`;
  //   query[field] = true;
  // }

  // if (recommended === "false") {
  //   const field = `groupBloodNotAllowed.${blood}`;
  //   query[field] = false;
  // }

  // if (category) {
  //   query.category = category;
  // }

  // if (title) {
  //   const titleRegex = new RegExp(title, "i");
  //   query.title = titleRegex;
  // }

  category && (query.category = category);
  recommended !== undefined &&
    (query[`groupBloodNotAllowed.${blood}`] = JSON.parse(recommended));
  title && (query.title = { $regex: title, $options: "i" });
  const allProducts = await Product.find(query);

  res.status(200).json({
    allProducts,
  });
};

module.exports = getProducts;
