const { Product } = require("../../models");
const { Forbidden } = require("http-errors");

const getProducts = async (req, res) => {
  const { title, category, recommended } = req.query;

  if (JSON.stringify(req.user.bodyData) === "{}") {
    throw new Forbidden("bodyData absent in user collection");
  }

  const { blood } = req.user.bodyData;

  const query = {};

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
