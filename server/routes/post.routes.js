import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  DeleteLongVideo,
  DeleteShortVideo,
  EditLongVideo,
  EditShortVideo,
  GetAllLongVideo,
  getAllShortVideos,
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
postRoutes.put(
  "/long_video/edit/:id",
  uploadVideo.fields([{ name: "LongVideo" }]),
  isAuthenticated,
  EditLongVideo
);
postRoutes.get("/longvideo/all/:id", isAuthenticated, GetAllLongVideo);

postRoutes.delete("/long_video/delete/:id", isAuthenticated, DeleteLongVideo);
postRoutes.post(
  "/short_video/upload",
  uploadVideo.fields([{ name: "ShortVideo" }]),
  isAuthenticated,
  UploadShortVideo
);
postRoutes.put(
  "/short_video/edit/:id",
  uploadVideo.fields([{ name: "ShortVideo" }]),
  isAuthenticated,
  EditShortVideo
);
postRoutes.delete("/short_video/delete/:id", isAuthenticated, DeleteShortVideo);
postRoutes.get("/short_video/all/:id", isAuthenticated, getAllShortVideos);
export default postRoutes;
