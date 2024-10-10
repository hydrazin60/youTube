import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  EditLongVideo,
  EditShortVideo,
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
postRoutes.post("/long_video/edit/:id", isAuthenticated, EditLongVideo);
postRoutes.post(
  "/short_video/upload",
  uploadVideo.fields([{ name: "ShortVideo" }]),
  isAuthenticated,
  UploadShortVideo
);
postRoutes.post("/short_video/edit/:id", isAuthenticated, EditShortVideo);
export default postRoutes;
