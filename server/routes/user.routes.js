import express from "express";
import { loginUser, RegisterUser } from "../controller/user.controller.js";
const userRoutes = express.Router();
userRoutes.post("/register", RegisterUser);
userRoutes.post("/login" , loginUser)

export default userRoutes;
