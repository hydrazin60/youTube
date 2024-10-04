import express from "express";
import {
  UpdateChannelDetails,
  createYoutubeChannel,
  loginUser,
  logoutUser,
  otherProfileView,
  RegisterUser,
  SubscribeORUnsubscribe,
  ViewOwnChannel,
} from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
const userRoutes = express.Router();
userRoutes.post("/register", RegisterUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", logoutUser);
userRoutes.post(
  "/create/YoutubeChannel",
  upload.fields([{ name: "profilePicFile" }]),
  isAuthenticated,
  createYoutubeChannel
);
userRoutes.post(
  "/channelDetails/update",
  upload.fields([{ name: "profilePic" }]),
  isAuthenticated,
  UpdateChannelDetails
);
userRoutes.get("/view/channel/:id", isAuthenticated, otherProfileView);
userRoutes.get("/view/Yourchannel", isAuthenticated, ViewOwnChannel);
userRoutes.get(
  "/subscribe/&/unsubscribe/:id",
  isAuthenticated,
  SubscribeORUnsubscribe
);
export default userRoutes;
