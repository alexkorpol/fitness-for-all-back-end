const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, imageName);
  await fs.rename(tempUpload, resultUpload);
  const image = await Jimp.read(resultUpload);
  await image.resize(250, 250).write(resultUpload);
  const avatarUrl = path.join("avatars", imageName);
  await User.findByIdAndUpdate(id, { avatarUrl });
  res.json({ avatarUrl });
};

module.exports = updateAvatar;
