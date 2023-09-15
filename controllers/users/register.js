// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { HttpError, ctrWrapper } = require("../../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  // const hashPassword = await bcrypt.hash(password, 10);
  // const newUser = await User.create({ ...req.body, password: hashPassword });
  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.hashPassword(password);
  await newUser.save();

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

module.exports = {
  register: ctrWrapper(register),
};
