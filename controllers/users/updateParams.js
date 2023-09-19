const { User } = require("../../models");

const updateParams = async (req, res) => {
  const { height, desiredWeight, birthday, sex, levelActivity } = req.body;

  const coefficient = {
    1: 1.2,
    2: 1.375,
    3: 1.55,
    4: 1.725,
    5: 1.9,
  };

  const date = new Date();

  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay) / 365;
    return diffInDays;
  }

  const resultDay = getNumberOfDays(birthday, date);

  const maleBMR =
    (10 * desiredWeight + 6, 25 * height - 5 * resultDay + 5) *
    coefficient[levelActivity - 1];

  const femaleBMR =
    (10 * desiredWeight + 6, 25 * height - 5 * resultDay - 161) *
    coefficient[levelActivity - 1];

  const { _id } = req.user;

  const bodyData = {
    ...req.body,
    dailyRateCalories:
      sex === "male" ? Math.round(maleBMR) : Math.round(femaleBMR),
    dailySportMin: 110,
  };

  await User.findByIdAndUpdate(_id, {
    ...req.user,
    bodyData,
  });

  res.json({ bodyData });
};

module.exports = updateParams;
