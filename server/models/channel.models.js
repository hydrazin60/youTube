import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      default: function () {
        return `@${this.channelName || "unknown"}`;
      },
    },
    AboutChannel: {
      type: String,
      maxlength: [5000, "Description should be less than 5000 characters"],
      default: function () {
        const today = new Date();
        return today.toDateString();
      },
    },
    profilePic: {
      type: String,
      default: null,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    LongVideoId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LongVideoModel",
      },
    ],
    ShortVideoId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShortVideoModel",
      },
    ],
    subscribers: [
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
channelSchema.virtual("totalSubscribers").get(function () {
  return this.subscribers.length;
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
