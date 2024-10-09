import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { UploadLongVideo } from "../controller/post.controller.js";
import { uploadVideo } from "../middlewares/multer.js";

const postRoutes = express.Router();
postRoutes.post(
  "/long_video/upload",
  uploadVideo.fields([{ name: "LongVideo" }]),
  isAuthenticated,
  UploadLongVideo
);
export default postRoutes;
