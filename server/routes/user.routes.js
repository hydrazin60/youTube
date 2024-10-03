import express from "express";
import { RegisterUser } from "../controller/user.controller.js";
const userRoutes = express.Router();
userRoutes.post("/resgister", RegisterUser);

export default userRoutes;
