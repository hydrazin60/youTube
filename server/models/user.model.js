import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "password should be greater than 6 characters"],
      // match: [
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      //   "Password must contain at least one number, one uppercase, and one lowercase letter",
      // ],
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "contentCreator", "admin"],
      default: "user",
    },
    LongVideoHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LongVideo",
      },
    ],
    ShortVideoHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShortVideo",
      },
    ],
    likedLongVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LongVideo",
      },
    ],
    likedShortVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShortVideo",
      },
    ],
    createdLongVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LongVideo",
      },
    ],
    createdShortVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShortVideo",
      },
    ],
    subscribedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    playlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
