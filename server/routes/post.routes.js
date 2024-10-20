import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  DeleteLongVideo,
  DeleteShortVideo,
  EditLongVideo,
  EditShortVideo,
  getAllChannels,
  GetAllLongVideoOfChannel,
  getAllShortVideosofChannel,
  LikeAndDislikeLongVideo,
  UploadLongVideo,
  UploadShortVideo,
} from "../controller/post.controller.js";
import {
  uploadVideo,
  uploadMedia,
  uploadImage,
} from "../middlewares/multer.js";
const postRoutes = express.Router();
postRoutes.post(
  "/long_video/upload",
  uploadMedia.fields([
    { name: "LongVideo", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  isAuthenticated,
  UploadLongVideo
);

postRoutes.put(
  "/long_video/edit/:id",
  uploadMedia.fields([
    { name: "LongVideo", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  isAuthenticated,
  EditLongVideo
);
postRoutes.get("/longvideo/all/:id", isAuthenticated, GetAllLongVideoOfChannel);

postRoutes.delete("/long_video/delete/:id", isAuthenticated, DeleteLongVideo);
postRoutes.post(
  "/short_video/upload",
  uploadMedia.fields([
    { name: "ShortVideo", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  isAuthenticated,
  UploadShortVideo
);
postRoutes.put(
  "/short_video/edit/:id",
  uploadMedia.fields([
    { name: "ShortVideo", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  isAuthenticated,
  EditShortVideo
);
postRoutes.delete("/short_video/delete/:id", isAuthenticated, DeleteShortVideo);
postRoutes.get(
  "/short_video/all/:id",
  isAuthenticated,
  getAllShortVideosofChannel
);
postRoutes
  .route("/long_Video/like&dislike/:id")
  .put(isAuthenticated, LikeAndDislikeLongVideo);
postRoutes.get("/home", isAuthenticated, getAllChannels);
export default postRoutes;
