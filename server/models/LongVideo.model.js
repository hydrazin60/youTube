import mongoose from "mongoose";

const longVideoSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: [5000, "Description should be less than 5000 characters"],
    },
    LongVideo: {
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
  { timestamps: true }
);

const LongVideoModel = mongoose.model("LongVideoModel", longVideoSchema);
export default LongVideoModel;
