const getCurrent = async (req, res) => {
  const {
    _id,
    name,
    email,
    avatar,
    token,
    dailyTime,
    dailyСalories,
    bodyParameters,
  } = req.user;
  res.status(200).json({
    _id,
    name,
    email,
    avatar,
    token,
    dailyTime,
    dailyСalories,
    bodyParameters,
  });
};

module.exports = getCurrent;
