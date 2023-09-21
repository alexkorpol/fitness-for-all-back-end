const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { getCategory, getProducts } = require("../../controllers/products");

router.get("/category", auth, ctrlWrapper(getCategory));
router.get("/", auth, ctrlWrapper(getProducts));

module.exports = router;
