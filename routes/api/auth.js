const express = require("express");
const { validation } = require("../../middlewares");
const { schemas } = require("../../models/user");
// const controllers = require("../../controllers/auth/register");

const router = express.Router();

// singup

router.post("/register", validation(schemas.registerSchema));
module.exports = router;

// // login
// router.post("/login", validateBody(schemas.loginSchema), сtrl.login);

// module.exports = router;
