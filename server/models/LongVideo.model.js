import mongoose from "mongoose";
const longVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: function () {
        const today = new Date();
        return today.toDateString();
      },
    },
    description: {
      type: String,
      maxlength: [5000, "description should be less than  5000 characters"],
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
    user: {
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

const LongVideo = mongoose.model("LongVideo", longVideoSchema);
export default LongVideo;
