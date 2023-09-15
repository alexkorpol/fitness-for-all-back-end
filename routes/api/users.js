const express = require("express");
const { validateBody } = require("../../middlewares");
const { shemas } = require("../../models/user");
const { ctrl } = require("../../controllers/users");

const router = express.Router();

// registration
router.post("/register", validateBody(shemas.registerSchema), ctrl.register);

// login
router.post("/login", validateBody(shemas.loginShema), ctrl.login);

module.exports = router;
