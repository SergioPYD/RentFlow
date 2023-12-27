const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    folder: "RentFlow",
    privacy: "private"
  },
});

const uploader = multer({ storage });

module.exports = uploader.array("images", 5); // "images" is the field name for the array of files, and 5 is the maximum number of files
