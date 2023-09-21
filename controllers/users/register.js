const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Message email in use" });
    return;
  }
  const avatarUrl = gravatar.url(email);
  const newUser = new User({ name, email, password, avatarUrl });
  await newUser.setPassword(password);

  await newUser.save();

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

module.exports = register;
