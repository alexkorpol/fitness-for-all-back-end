const express = require("express");
const router = express.Router();

const { validation, auth, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const {
  joiRegisterSchema,
  joiLoginSchema,
  joiUserParamsSchema,
  joiUpdateParamsSchema,
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

//  updateParams
router.patch(
  "/update",
  auth,
  upload.single("avatar"),
  validation(joiUpdateParamsSchema),
  ctrlWrapper(ctrl.updateParams)
);

module.exports = router;
