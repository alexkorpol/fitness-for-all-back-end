const { User } = require("../../models");
const { calculateLifeStyle } = require("../../helpers");

const updateParams = async (req, res) => {
  const { _id } = req.user;
  const dailyRateCalories = calculateLifeStyle(req.body);
  const dailySportMin = 110;
  const newUser = await User.findByIdAndUpdate(
    _id,
    {
      bodyData: { ...req.body },
      dailyRateCalories,
      dailySportMin,
    },
    {
      new: true,
      select: "-createdAt -updatedAt -password",
    }
  );

  res.json(newUser);
};

module.exports = updateParams;
