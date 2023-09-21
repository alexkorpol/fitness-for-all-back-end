const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const {
  getAllExercises,
  getBodyParts,
  getAllMuscules,
  getAllEquipments,
} = require("../../controllers/exercises");

router.get("/training", auth, ctrlWrapper(getAllExercises));
router.get("/bodyparts", auth, ctrlWrapper(getBodyParts));
router.get("/muscules", auth, ctrlWrapper(getAllMuscules));
router.get("/equipments", auth, ctrlWrapper(getAllEquipments));

module.exports = router;
