// const multer = require("multer");
// const path = require("path");

// const tempDir = path.join(__dirname, "../", "tmp");

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// module.exports = upload;

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

//  "UserAvatarRequest": {
//       "type": "object",
//       "required": ["avatar"],
//       "properties": {
//         "avatar": {
//           "type": "file",
//           "description": "User's avatar"
//         }
//       }
//     },
//     "UserAvatarResponse": {
//       "type": "object",
//       "properties": {
//         "avatarUrl": {
//           "type": "string",
//           "description": "today's date or needed date",
//           "example": "avatars\\650c1de94860d6d0172c4b63_1676295806122712757.png"
//         }
//       }
//     },

// "/users/avatars": {
//   "patch": {
//     "tags": ["User"],
//     "summary": "Update User avatar",
//     "parameters": [],
//     "security": [{ "Bearer": [] }],
//     "requestBody": {
//       "description": "Update user's avatar",
//       "required": true,
//       "content": {
//         "multipart/form-data": {
//           "schema": {
//             "$ref": "#/components/schemas/UserAvatarRequest"
//           }
//         }
//       }
//     },
//     "responses": {
//       "200": {
//         "description": "Successful operation, user's avatar updated",
//         "content": {
//           "application/json": {
//             "schema": {
//               "$ref": "#/components/schemas/UserAvatarResponse"
//             }
//           }
//         }
//       },
//       "400": {
//         "description": "Validation error",
//         "content": {
//           "application/json": {
//             "schema": {
//               "$ref": "#/components/schemas/BadRequest"
//             }
//           }
//         }
//       },
//       "401": {
//         "description": "Bearer auth failed",
//         "content": {
//           "application/json": {
//             "schema": {
//               "$ref": "#/components/schemas/AuthenticationFailed"
//             }
//           }
//         }
//       },
//       "404": {
//         "description": "Not found",
//         "content": {
//           "application/json": {
//             "schema": {
//               "$ref": "#/components/schemas/ErrorNotFoundResponse"
//             }
//           }
//         }
//       }
//     }
//   }
// },
