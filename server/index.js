import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  try {
    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.log(`server is not running due to ${error.message}`);
  }
});
