import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/datauri.js";
import LongVideoModel from "../models/LongVideo.model.js";
import Channel from "../models/channel.models.js";
import ShortVideoModel from "../models/ShortVideo.models.js";

export const UploadLongVideo = async (req, res) => {
  try {
    const authorId = req.id;
    const { title, description, visibility } = req.body;
    const LongVideoFile = req.files?.LongVideo?.[0];

    if (!LongVideoFile) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please upload a video",
      });
    }

    const authorUser = await User.findById(authorId);
    if (!authorUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User not found, please register first",
      });
    }

    const fileUri = getDataUri(LongVideoFile);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "video",
      folder: "long_videos",
      public_id: `${title}_${authorId}`,
    });

    const newLongVideo = await LongVideoModel.create({
      title,
      description,
      visibility,
      author: authorId,
      LongVideo: cloudResponse.secure_url,
    });

    const channel = await Channel.findById(authorUser.channelId);
    if (channel) {
      channel.LongVideoId.push(newLongVideo._id);
      await channel.save();
    }

    await newLongVideo.populate({
      path: "author",
      select: "-password",
    });

    return res.status(200).json({
      success: true,
      error: false,
      message: "Video uploaded successfully",
      newLongVideo,
    });
  } catch (error) {
    console.error(`Error uploading video: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Something went wrong during video upload: ${error.message}`,
    });
  }
};

export const UploadShortVideo = async (req, res) => {
  try {
    const authorId = req.id;
    const { title, description, visibility } = req.body;
    const ShortVideoFile = req.files?.ShortVideo?.[0];
    if (!ShortVideoFile) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please upload a video",
      });
    }

    const authorUser = await User.findById(authorId);
    if (!authorUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User not found, please register first",
      });
    }

    const fileUri = getDataUri(ShortVideoFile);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "video",
      folder: "short_videos",
      public_id: `${title}_${authorId}`,
    });

    const newShortVideo = await ShortVideoModel.create({
      title,
      description,
      visibility,
      author: authorId,
      ShortVideo: cloudResponse.secure_url,
    });
    const channel = await Channel.findById(authorUser.channelId);
    if (channel) {
      channel.ShortVideoId.push(newShortVideo._id);
      await channel.save();
    }
    await newShortVideo.populate({
      path: "author",
      select: "-password",
    });
    return res.status(200).json({
      success: true,
      error: false,
      message: "Video uploaded successfully",
      newShortVideo,
    });
  } catch (error) {
    console.log(
      `Something went wrong during short video upload: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      error: true,
      message: `Something went wrong during short video upload: ${error.message}`,
    });
  }
};
