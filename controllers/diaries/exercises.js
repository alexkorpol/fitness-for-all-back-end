const { Day } = require('../../models/');
const { HttpError, ctrlWrapper } = require('../../Helpers');
const moment = require('moment');

const addExerciseToDay = async (req, res, next) => {
    const { date = moment().format('YYYY-MM-DD'), exercise } = req.body;
    const { _id: owner } = req.user;

    try {
        if (date) {
            const currentDate = moment().startOf('day');
            const inputDate = moment(date).startOf('day');

            if (!currentDate.isAfter(inputDate) && !currentDate.isSame(inputDate, 'day')) {
                return res.status(400).json({ message: 'Date has not yet arrived or not a suitable format' });
            }
        }

        let day = await Day.findOne({ date, owner });

        if (!day) {
            day = await Day.create({ date, owner, exercises: [], products: [] });
        }

        day.exercises.push(exercise);

        await day.save();

        res.status(201).json({ message: `Exercise added to the day ${date}`, exercise });
    } catch (error) {
        console.error(error);
        throw HttpError(500, 'Error adding exercise to day');
    }
};

const removeExercise = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { exerciseId, date = moment().format('YYYY-MM-DD') } = req.body;

    const day = await Day.findOne({ date, owner });

    if (!day) {
        return res.status(404).json({ message: 'Day not found' });
    }

    const exerciseToDelete = day.exercises.find((exercise) => exercise._id.toString() === exerciseId);

    if (!exerciseToDelete) {
        return res.status(404).json({ message: 'Exercise not found in the day' });
    }

    day.exercises.pull(exerciseToDelete);

    await day.save();

    res.json({ message: 'Exercise removed' });
};

module.exports = {
    addExerciseToDay: ctrlWrapper(addExerciseToDay),
    removeExercise: ctrlWrapper(removeExercise),
};
