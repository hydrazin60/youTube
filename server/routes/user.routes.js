import express from "express";
import {
  UpdateChannelDetails,
  createYoutubeChannel,
  loginUser,
  logoutUser,
  otherChannelView,
  RegisterUser,
  SubscribeORUnsubscribe,
  ViewOwnChannel,
} from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {uploadImage} from "../middlewares/multer.js";
const userRoutes = express.Router();
userRoutes.post("/register", RegisterUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", logoutUser);
userRoutes.post(
  "/create/YoutubeChannel",
  uploadImage.fields([{ name: "profilePicFile" }]),
  isAuthenticated,
  createYoutubeChannel
);
userRoutes.post(
  "/channelDetails/update",
  uploadImage.fields([{ name: "profilePic" }]),
  isAuthenticated,
  UpdateChannelDetails
);
userRoutes.get("/view/channel/:id", isAuthenticated, otherChannelView);
userRoutes.get("/view/Yourchannel", isAuthenticated, ViewOwnChannel);
userRoutes.get(
  "/subscribe/&/unsubscribe/:id",
  isAuthenticated,
  SubscribeORUnsubscribe
);
export default userRoutes;