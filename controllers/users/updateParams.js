const { User } = require("../../models");
const { calculateLifeStyle } = require("../../helpers");

const updateParams = async (req, res) => {
  const { _id } = req.user;
  const {
    name,
    height,
    currentWeight,
    desiredWeight,
    birthday,
    blood,
    sex,
    levelActivity,
  } = req.body;

  const dailyRateCalories = calculateLifeStyle(req.body);
  const dailySportMin = 110;
  const userData = {
    name,
    dailyRateCalories,
    dailySportMin,
    bodyData: {
      height,
      currentWeight,
      desiredWeight,
      birthday,
      blood,
      sex,
      levelActivity,
    },
  };

  if (req.file) {
    userData.avatarUrl = req.file.path;
  }

  const newUser = await User.findByIdAndUpdate(_id, userData, {
    new: true,
    select: "-createdAt -updatedAt -password",
  });

  res.json(newUser);
};

module.exports = updateParams;
