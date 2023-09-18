const { User, UserData } = require("../../models");

const userParams = async (req, res) => {
  const { height, desiredWeight, birthday, sex, levelActivity } = req.body;

  const coefficient = {
    1: 1.2,
    2: 1.375,
    3: 1.55,
    4: 1.725,
    5: 1.9,
  };

  //   const date = new Date().toString();
  //   const birthdayDay = birthday.toString();

  const maleBMR =
    (10 * desiredWeight + 6, 25 * height - 5 * 30 + 5) *
    coefficient[levelActivity - 1];

  const femaleBMR =
    (10 * desiredWeight + 6, 25 * height - 5 * 30 - 161) *
    coefficient[levelActivity - 1];

  const newUserData = await UserData.create({
    ...req.body,
    dailyRateCalories: sex === "male" ? maleBMR : femaleBMR,
    dailySportMin: 110,
  });

  const { _id } = req.user;

  const newUser = await User.findByIdAndUpdate(_id, {
    ...req.user,
    bodyData: newUserData,
  });

  res.status(201).json(newUser);
};

module.exports = userParams;

// Для чоловіків:
// BMR = (10 * бажана вага (кг) + 6,25 * зріст (см) - 5 * вік (роки) + 5) * коефіцієнт по способу життя
// Для жінок:
// BMR = (10 * бажана вага (кг) + 6,25 * зріст (см) - 5 * вік (роки) - 161) * коефіцієнт по способу життя

// {
// "height": 170,
// "currentWeight": 60,
// "desiredWeight": 50,
// "birthday": "2005-09-17",
// "blood": 3,
// "sex": "female",
// "levelActivity": 2
// }
