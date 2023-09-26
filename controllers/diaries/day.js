const { Day } = require('../../models');
const moment = require('moment');
const { HttpError, ctrlWrapper } = require('../../helpers');

const getDay = async (req, res) => {
    const { date } = req.params;
    const { _id: owner } = req.user;

    const queryDate = date || moment().format('DD-MM-YYYY');
    console.log(queryDate);
    const data = await Day.findOne({ date: queryDate, owner })
        .populate({
            path: 'products.productId',
            model: 'product',
        })
        .populate({
            path: 'exercises.exerciseId',
            model: 'exercise',
        })
        .select('-createdAt -updatedAt');
    if (!data) {
        throw HttpError(404, 'Day not found');
    }

    res.json(data);
};

module.exports = { getDay: ctrlWrapper(getDay) };
