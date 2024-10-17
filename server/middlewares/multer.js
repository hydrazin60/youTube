import multer from "multer";

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

const uploadMedia = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (allowedImageTypes.includes(file.mimetype)) {
        // Check file size for images
        if (file.size > MAX_FILE_SIZE) {
          return cb(new Error("Image exceeds the 2MB size limit."), false);
        }
        cb(null, true);
      } else {
        cb(
          new Error(
            "Invalid image file type. Only JPEG, PNG, and JPG allowed."
          ),
          false
        );
      }
    } else if (file.fieldname === "LongVideo" || file.fieldname === "ShortVideo") {
      const allowedVideoTypes = ["video/mp4", "video/mov", "video/avi"];
      if (allowedVideoTypes.includes(file.mimetype)) {
        // Check file size for videos
        if (file.size > MAX_VIDEO_SIZE) {
          return cb(new Error("Video exceeds the 100MB size limit."), false);
        }
        cb(null, true);
      } else {
        cb(
          new Error("Invalid video file type. Only MP4, MOV, and AVI allowed."),
          false
        );
      }
    }
  },
});

export { uploadImage, uploadVideo, uploadMedia };
