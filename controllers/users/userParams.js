const { User } = require("../../models");
const calculateLifeStyle = require("../../helpers/calculateLifeStyle.js");

const userParams = async (req, res) => {
  const { _id } = req.user;

  const dailyRateCalories = calculateLifeStyle(req.body);
  const dailySportMin = 110;

  const newUser = await User.findByIdAndUpdate(_id, {
    bodyData: { ...req.body },
    dailyRateCalories,
    dailySportMin,
  });

  res.status(201).json(newUser);
};

module.exports = userParams;

// пример тела запроса
// {
// "height": 180,
// "currentWeight": 90,
// "desiredWeight": 60,
// "birthday": "2005-06-17T07:27:41.902Z",
// "blood": 3,
// "sex": "female",
// "levelActivity": 2
// }
