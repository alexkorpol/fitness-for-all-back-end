const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { exercises: ctrl } = require("../../controllers");

router.get("/training", auth, ctrlWrapper(ctrl.getAllExercises));
router.get("/bodyparts", auth, ctrlWrapper(ctrl.getBodyParts));
router.get("/muscules", auth, ctrlWrapper(ctrl.getAllMuscules));
router.get("/equipments", auth, ctrlWrapper(ctrl.getAllEquipments));

module.exports = router;
