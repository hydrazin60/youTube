import express from "express";
import {
  createYoutubeChannel,
  loginUser,
  logoutUser,
  otherProfileView,
  RegisterUser,
} from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const userRoutes = express.Router();
userRoutes.post("/register", RegisterUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", logoutUser);
userRoutes.post("/create/YoutubeChannel", isAuthenticated, createYoutubeChannel);
userRoutes.get("/channel/:id", isAuthenticated, otherProfileView);
export default userRoutes;
