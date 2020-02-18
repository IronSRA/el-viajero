const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-name',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const uploadCloud = multer({
  storage
})

module.exports = uploadCloud