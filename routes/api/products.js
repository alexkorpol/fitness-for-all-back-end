const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { getCategory } = require("../../controllers/products");

router.get("/category", auth, ctrlWrapper(getCategory));

module.exports = router;
