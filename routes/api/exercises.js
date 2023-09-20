const express = require("express");
const router = express.Router();

// const { joiExerciseSchema } = require("../../models/exercise");

const { ctrlWrapper, auth } = require("../../middlewares");

const { getAllExercises } = require("../../controllers/exercises");

router.get("/", auth, ctrlWrapper(getAllExercises));

module.exports = router;
