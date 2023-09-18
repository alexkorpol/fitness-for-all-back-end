const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper, auth } = require("../../middlewares");

const {
  joiRegisterSchema,
  joiLoginSchema,
  joiUserParamsSchema,
} = require("../../models/user");

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

//  userParams
router.post(
  "/params",
  auth,
  validation(joiUserParamsSchema),
  ctrlWrapper(ctrl.userParams)
);

module.exports = router;
