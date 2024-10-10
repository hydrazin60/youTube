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
    if (authorUser.role !== "contentCreator") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Only content creators can upload long videos",
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

export const EditLongVideo = async (req, res) => {
  try {
    const authorId = req.id;
    const longVideoPostId = req.params.id;
    const { title, description, visibility } = req.body;
    const LongVideoFile = req.files?.LongVideo?.[0];
    const authorUser = await User.findById(authorId);
    if (!authorUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User not found, please register first",
      });
    }
    if (authorUser.role !== "contentCreator") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Only content creators can edit long videos",
      });
    }
    const longVideoPostDeata = await LongVideoModel.findById(longVideoPostId);
    if (!longVideoPostDeata) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Post not found",
      });
    }

    if (authorId !== longVideoPostDeata.author.toString()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You are not authorized to edit this post",
      });
    }

    if (LongVideoFile) {
      const fileUri = getDataUri(LongVideoFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "video",
        folder: "long_videos",
        public_id: `${title}_${authorId}`,
      });
      longVideoPostDeata.LongVideo = cloudResponse.secure_url;
    }

    if (title) {
      longVideoPostDeata.title = title;
    }
    if (description) {
      longVideoPostDeata.description = description;
    }
    if (visibility) {
      longVideoPostDeata.visibility = visibility;
    }
    await longVideoPostDeata.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Post edited successfully",
      longVideoPostDeata,
    });
  } catch (error) {
    console.log(`Error during Edit Long Video : ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error during Edit Long Video : ${error.message}`,
    });
  }
};
export const DeleteLongVideo = async (req, res) => {
  try {
    const authorId = req.id;
    const longVideoPostId = req.params.id;
    const authorUser = await User.findById(authorId);
    if (!authorUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User not found, please register first",
      });
    }
    if (authorUser.role !== "contentCreator") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Only content creators can delete long videos",
      });
    }
    const LongVideoPostdata = await LongVideoModel.findById(longVideoPostId);
    if (!LongVideoPostdata) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Post not found",
      });
    }

    if (authorId !== LongVideoPostdata.author.toString()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You are not authorized to delete this post",
      });
    }

    const channel = await Channel.findById(LongVideoPostdata.channel);
    if (channel) {
      const index = channel.LongVideoId.indexOf(longVideoPostId);
      if (index !== -1) {
        channel.LongVideoId.splice(index, 1);
        await channel.save();
      }
    }

    await LongVideoModel.findByIdAndDelete(longVideoPostId);
    return res.status(200).json({
      success: true,
      error: false,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(`Error during Delete Long Video : ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error during Delete Long Video : ${error.message}`,
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
    if (authorUser.role !== "contentCreator") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Only content creators can upload short videos",
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

export const EditShortVideo = async (req, res) => {
  try {
    const authorId = req.id;
    const shortVideoPostId = req.params.id;
    const { title, description, visibility } = req.body;
    const ShortVideoFile = req.files?.ShortVideo?.[0];

    const autherData = await User.findById(authorId);
    if (!autherData) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User not found, please register first",
      });
    }
    if (autherData.role !== "contentCreator") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Only content creators can edit short videos",
      });
    }

    const shortVideoPostData = await ShortVideoModel.findById(shortVideoPostId);
    if (!shortVideoPostData) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Post not found",
      });
    }
    if (authorId !== shortVideoPostData.author.toString()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You are not authorized to edit this post",
      });
    }
    if (title) {
      shortVideoPostData.title = title;
    }
    if (description) {
      shortVideoPostData.description = description;
    }
    if (visibility) {
      shortVideoPostData.visibility = visibility;
    }

    if (ShortVideoFile) {
      const fileUri = getDataUri(ShortVideoFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "video",
        folder: "short_videos",
        public_id: `${title}_${authorId}`,
      });
      shortVideoPostData.ShortVideo = cloudResponse.secure_url;
    }
    await shortVideoPostData.save();
    return res.status(200).json({
      success: true,
      error: false,
      message: "Post edited successfully",
      shortVideoPostData,
    });
  } catch (error) {
    console.log(`Error during Edit Short Video : ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error during Edit Short Video : ${error.message}`,
    });
  }
};
