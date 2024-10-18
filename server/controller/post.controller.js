import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/datauri.js";
import LongVideoModel from "../models/LongVideo.model.js";
import Channel from "../models/channel.models.js";
import ShortVideoModel from "../models/ShortVideo.models.js";
import userRoutes from "../routes/user.routes.js";
import { populate } from "dotenv";
import { get } from "mongoose";

export const UploadLongVideo = async (req, res) => {
  try {
    const authorId = req.id;
    const { title, description, visibility } = req.body;
    const LongVideoFile = req.files?.LongVideo?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];
    console.log("Received files:", req.files);

    if (!LongVideoFile) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please upload a video",
      });
    }
    if (!thumbnailFile) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please upload a thumbnail",
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
    const thumbnailFileUri = getDataUri(thumbnailFile);

    const thumbnailCloudResponse = await cloudinary.uploader.upload(
      thumbnailFileUri.content,
      {
        resource_type: "image",
        folder: "thumbnails",
        public_id: `${title}_${authorId}`,
      }
    );

    const newLongVideo = await LongVideoModel.create({
      title,
      description,
      visibility,
      author: authorId,
      LongVideo: cloudResponse.secure_url,
      thumbnail: thumbnailCloudResponse.secure_url,
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

export const GetAllLongVideoOfChannel = async (req, res) => {
  try {
    const authorId = req.params.id;
    const loginUserId = req.id;
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
        message: "Only content creators can get all long videos",
      });
    }
    const longVideodata = await LongVideoModel.find({ author: authorId });
    if (!longVideodata) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "No long videos found",
      });
    }
    if (authorId === loginUserId) {
      return res.status(400).json({
        success: true,
        error: false,
        message: "All long videos fetched successfully",
        longVideodata,
      });
    }

    const publicLongVideodata = longVideodata.filter(
      (longVideo) => longVideo.visibility === "public"
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "Long videos fetched successfully",
      publicLongVideodata,
    });
  } catch (error) {
    console.log(`Error during Get All Long Video : ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error during Get All Long Video : ${error.message}`,
    });
  }
};

export const UploadShortVideo = async (req, res) => {
  try {
    const authorId = req.id;
    const { title, description, visibility } = req.body;
    const ShortVideoFile = req.files?.ShortVideo?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];
    if (!thumbnailFile) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please upload a thumbnail",
      });
    }
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

    const thumbnailUri = getDataUri(thumbnailFile);
    const thumbnailCloudResponse = await cloudinary.uploader.upload(
      thumbnailUri.content,
      {
        resource_type: "image",
        folder: "short_videos",
        public_id: `${title}_${authorId}`,
      }
    );
    const newShortVideo = await ShortVideoModel.create({
      title,
      description,
      visibility,
      author: authorId,
      ShortVideo: cloudResponse.secure_url,
      thumbnail: thumbnailCloudResponse.secure_url,
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
      message: " Reel (Short video) uploaded successfully",
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
export const DeleteShortVideo = async (req, res) => {
  try {
    const authorId = req.id; // Ensure req.id is set during authentication
    const shortVideoPostId = req.params.id; // Get the ID of the post to be deleted

    // Find the user attempting to delete the post
    const authorUserData = await User.findById(authorId);

    // Check if the user exists
    if (!authorUserData) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User not found, please register first",
      });
    }

    // Check if the user is a content creator
    if (authorUserData.role !== "contentCreator") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Only content creators can delete short videos",
      });
    }

    // Find the short video post by its ID
    const shortVideoPostData = await ShortVideoModel.findById(shortVideoPostId);
    if (!shortVideoPostData) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Post not found",
      });
    }

    // Ensure the user is authorized to delete this post (only the author can delete)
    if (authorId !== shortVideoPostData.author.toString()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You are not authorized to delete this post",
      });
    }

    // Find the channel associated with the user's `channelId`
    const channel = await Channel.findById(authorUserData.channelId);
    if (channel) {
      // If the video post is found in the channel's ShortVideoId array, remove it
      const index = channel.ShortVideoId.indexOf(shortVideoPostId);
      if (index > -1) {
        channel.ShortVideoId.splice(index, 1); // Remove the video post from the array
        await channel.save(); // Save the updated channel
      }
    }

    // Delete the short video post from the database
    await ShortVideoModel.findByIdAndDelete(shortVideoPostId);

    // Return a success message
    return res.status(200).json({
      success: true,
      error: false,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(`Error during Delete Short Video: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error during Delete Short Video: ${error.message}`,
    });
  }
};

export const getAllShortVideosofChannel = async (req, res) => {
  try {
    const authorId = req.params.id;
    const loginUser = req.id;
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
        message: "Only content creators can see all short videos",
      });
    }
    const short_videos = await ShortVideoModel.find({ author: authorId });
    if (!short_videos) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "No short videos found",
      });
    }
    if (loginUser === authorId) {
      return res.status(200).json({
        success: true,
        error: false,
        short_videos,
      });
    }
    const publicLongVideodata = short_videos.filter(
      (short_video) => short_video.visibility === "public"
    );
    return res.status(200).json({
      success: true,
      error: false,
      publicLongVideodata,
    });
  } catch (error) {
    console.log(`Error during getAllShortVideos : ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error during getAllShortVideos : ${error.message}`,
    });
  }
};

export const getAllChannels = async (req, res) => {
  try {
    const ChannelsData = await Channel.find()

      .sort({ createdAt: -1 })
      .populate({
        path: "authorId",
        select: "name",
      })
      .populate({
        path: "LongVideoId",
        select:
          "title thumbnail  description LongVideo likes comments visibility",
      })
      .populate({
        path: "ShortVideoId",
        select:
          "title thumbnail description  ShortVideo  likes comments visibility",
      });

    return res.status(200).json({
      success: true,
      error: false,
      ChannelsData,
      message: "Channel fetched successfully",
    });
  } catch (error) {
    console.log(`Error during  getAllChannel : ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error during  getAllChannel : ${error.message}`,
    });
  }
};

// export const  getAllChannels = async (req, res) => {
//   try {
//     const channelsData = await Channel.find()
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "authorId",
//         select: "name",
//       })
//       .populate({
//         path: "LongVideoId",
//         select: "title description LongVideo likes comments visibility",
//       })
//       .populate({
//         path: "ShortVideoId",
//         select: "title description ShortVideo likes comments visibility",
//       });

//     return res.status(200).json({
//       success: true,
//       error: false,
//       channelsData, // Ensure the variable name is consistent
//       message: "Channels fetched successfully",
//     });
//   } catch (error) {
//     console.log(`Error during getAllChannels: ${error.message}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `Error during getAllChannels: ${error.message}`,
//     });
//   }
// };
