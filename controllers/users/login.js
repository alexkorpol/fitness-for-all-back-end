const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    {
      new: true,
      select: "-createdAt -updatedAt -password",
    }
  );

  // await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json(newUser);
};

module.exports = login;
