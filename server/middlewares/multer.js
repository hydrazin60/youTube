// import multer from "multer";
// const MAX_FILE_SIZE = 2 * 1024 * 1024;
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: MAX_FILE_SIZE },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(
//         new Error(
//           "Invalid file type. Only JPEG, PNG, and JPG files are allowed."
//         ),
//         false
//       );
//     }
//   },
// });
// export default upload;

import multer from "multer";

// Image upload configuration (2MB limit)
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, and JPG files are allowed."
        ),
        false
      );
    }
  },
});

// Video upload configuration (100MB limit)
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB limit
const uploadVideo = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_VIDEO_SIZE },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/mov", "video/avi"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only MP4, MOV, and AVI files are allowed."
        ),
        false
      );
    }
  },
});
 
export { uploadImage, uploadVideo };
