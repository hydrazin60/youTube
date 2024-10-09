import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  UploadLongVideo,
  UploadShortVideo,
} from "../controller/post.controller.js";
import { uploadVideo } from "../middlewares/multer.js";

const postRoutes = express.Router();
postRoutes.post(
  "/long_video/upload",
  uploadVideo.fields([{ name: "LongVideo" }]),
  isAuthenticated,
  UploadLongVideo
);
postRoutes.post(
  "/short_video/upload",
  uploadVideo.fields([{ name: "ShortVideo" }]),
  isAuthenticated,
  UploadShortVideo
);
export default postRoutes;
