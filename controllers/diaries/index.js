const getDay = require('./day');
const { addExerciseToDay, removeExercise } = require('./exercises');
const { addProductToDay, removeProduct } = require('./products');

module.exports = {
    getDay,
    addExerciseToDay,
    addProductToDay,
    removeExercise,
    removeProduct,
};
