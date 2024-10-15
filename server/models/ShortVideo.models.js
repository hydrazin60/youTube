import mongoose from "mongoose";
const ShortVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: function () {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];
        return `Untitled ${formattedDate}`;
      },
    },
    description: {
      type: String,
      default: "",
    },
    ShortVideo: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ShortVideoModel = mongoose.model("ShortVideoModel", ShortVideoSchema);
export default ShortVideoModel;
