import express from "express";
import {
  createYoutubeChannel,
  loginUser,
  logoutUser,
  otherProfileView,
  RegisterUser,
  ViewOwnChannel,
} from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const userRoutes = express.Router();
userRoutes.post("/register", RegisterUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", logoutUser);
userRoutes.post(
  "/create/YoutubeChannel",
  isAuthenticated,
  createYoutubeChannel
);
userRoutes.get("/view/channel/:id", isAuthenticated, otherProfileView);
userRoutes.get("/view/Yourchannel", isAuthenticated, ViewOwnChannel);
export default userRoutes;
