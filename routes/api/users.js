const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper, auth } = require("../../middlewares");

const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const { users: ctrl } = require("../../controllers");

// registration
router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

// current
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

// login
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

//  logout
router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
