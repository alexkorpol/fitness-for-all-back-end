const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    } else {
      folder = "misc";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: req.user._id,
      transformation: [
        { width: 150, height: 150, gravity: "face", crop: "thumb" },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
