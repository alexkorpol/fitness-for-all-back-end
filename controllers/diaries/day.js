const { Day } = require('../../models');
const moment = require('moment');
const { HttpError } = require('../../Helpers');

const getDay = async (req, res) => {
    const { date } = req.params;
    const { _id: owner } = req.user;

    const queryDate = date || moment().format('YYYY-MM-DD');
    const day = await Day.findOne({ date: queryDate, owner }, '-createdAt -updatedAt');
    if (!day) {
        throw HttpError(404, 'Day not found');
    }

    res.json(day);
};

module.exports = getDay;
