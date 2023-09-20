const { User } = require("../../models");
const calculateLifeStyle = require("../../helpers/calculateLifeStyle.js");

const updateParams = async (req, res) => {
  const { _id } = req.user;
  const dailyRateCalories = calculateLifeStyle(req.body);
  const dailySportMin = 110;
  const newUser = await User.findByIdAndUpdate(_id, {
    bodyData: { ...req.body },
    dailyRateCalories,
    dailySportMin,
  });

  res.json(newUser);
};

module.exports = updateParams;
