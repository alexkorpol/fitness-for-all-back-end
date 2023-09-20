const express = require('express');
const router = express.Router();

// const { joiExerciseSchema } = require("../../models/exercise");

const { auth } = require('../../middlewares');

const { ctrlWrapper } = require('../../helpers');

const { getAllExercises } = require('../../controllers/exercises');

router.get('/', auth, ctrlWrapper(getAllExercises));

module.exports = router;
