import express from "express";
import {
  createYoutubeChannel,
  loginUser,
  logoutUser,
  RegisterUser,
} from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const userRoutes = express.Router();
userRoutes.post("/register", RegisterUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", logoutUser);
userRoutes.get("/create/YoutubeChannel", isAuthenticated, createYoutubeChannel);

export default userRoutes;
