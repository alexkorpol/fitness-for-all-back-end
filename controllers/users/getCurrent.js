const getCurrent = async (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({
    _id,
    name,
    email,
  });
};

module.exports = getCurrent;
