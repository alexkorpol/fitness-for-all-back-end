const getCurrent = async (req, res) => {
  const {
    _id,
    name,
    email,
    avatarUrl,
    token,
    dailySportMin,
    dailyRateCalories,
    bodyData,
  } = req.user;

  res.status(200).json({
    _id,
    name,
    email,
    avatarUrl,
    token,
    dailySportMin,
    dailyRateCalories,
    bodyData,
  });
};

module.exports = getCurrent;
