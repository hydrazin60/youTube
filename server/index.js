import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(cors());

app.use("/youtube/api/v1/user", userRoutes);

app.listen(PORT, () => {
  try {
    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.log(`server is not running due to ${error.message}`);
  }
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database not connected due to :", err.message);
  });
