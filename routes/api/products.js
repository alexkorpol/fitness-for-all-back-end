const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { products: ctrl } = require("../../controllers");

router.get("/category", auth, ctrlWrapper(ctrl.getCategory));
router.get("/", auth, ctrlWrapper(ctrl.getProducts));

module.exports = router;
