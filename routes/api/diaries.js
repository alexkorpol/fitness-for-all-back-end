const express = require('express');

const router = express.Router();

const { diaries: ctrl } = require('../../controllers');
const { ctrlWrapper, auth, validation } = require('../../middlewares');

const { schemaAddExercise, schemaAddProduct, schemaRemoveExercise, schemaRemoveProduct } = require('../../models/diary');

router.get('/day/:date?', auth, ctrlWrapper(ctrl.getDay));
router.post('/addExercise', auth, validation(schemaAddExercise), ctrl.addExerciseToDay);
router.post('/addProduct', auth, validation(schemaAddProduct), ctrl.addProductToDay);
router.delete('/removeExercise', auth, validation(schemaRemoveExercise), ctrl.removeExercise);
router.delete('/removeProduct', auth, validation(schemaRemoveProduct), ctrl.removeProduct);

module.exports = router;
