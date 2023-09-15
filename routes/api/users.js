const express = require("express");
const validateBody = require("../../middlewares");
const { schemas } = require("../../models/user");
const { ctrl } = require("../../controllers/users");

const router = express.Router();

// registration
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// login
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
