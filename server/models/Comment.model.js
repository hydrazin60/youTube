import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    LongVideoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LongVideo",
    },
    ShortVideoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShortVideo",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
