import express from "express";
import { loginUser, logoutUser, RegisterUser } from "../controller/user.controller.js";
const userRoutes = express.Router();
userRoutes.post("/register", RegisterUser);
userRoutes.post("/login" , loginUser)
userRoutes.get("/logout" , logoutUser)

export default userRoutes;
