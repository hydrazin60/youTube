import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LongVideoOpen() {
  const { id } = useParams(); // Get video id from the URL
  const location = useLocation();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(location.state?.videoData || null); // Use passed videoData or fetch if not passed
  const [loading, setLoading] = useState(!videoData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoData) {
      const fetchVideoData = async () => {
        try {
          const res = await axios.get(
            `http://localhost:4000/youtube_studio/api/v1/video/${id}`,
            { withCredentials: true }
          );
          if (res.data.success) {
            setVideoData(res.data.videoData);
          } else {
            setError("Failed to fetch video details.");
          }
        } catch (err) {
          setError("Failed to fetch video.");
          console.error(`Error during fetchVideoData: ${err}`);
        } finally {
          setLoading(false);
        }
      };
      fetchVideoData();
    }
  }, [id, videoData]);

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen mt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Video Player */}
        <div className="mb-4">
          <video
            className="w-full rounded-lg"
            controls
            autoPlay
          >
            <source src={videoData.LongVideo} type="video/mp4" />
          </video>
        </div>

        {/* Video Information */}
        <div className="mb-4">
          <h1 className="text-xl font-bold">{videoData.title}</h1>
          <p className="text-sm text-zinc-400">{`${videoData.views} views • ${new Date(videoData.uploadedAt).toLocaleDateString()}`}</p>
        </div>

        {/* Channel Information */}
        <div className="flex items-center gap-4">
          {videoData.channel?.profilePic && videoData.channel.profilePic.trim() === "" ? (
            <div className="h-10 w-10 bg-zinc-800 rounded-full">
              <p className="text-sm font-bold text-zinc-400 flex items-center justify-center h-full w-full">
                {videoData.channel.channelName.slice(0, 2).toUpperCase()}
              </p>
            </div>
          ) : (
            <img
              src={videoData.channel?.profilePic}
              alt="channel icon"
              className="h-12 w-12 object-cover overflow-hidden rounded-full"
            />
          )}
          <div>
            <p className="text-lg font-semibold">{videoData.channel?.channelName}</p>
            <p className="text-sm text-zinc-400">{`${videoData.channel?.subscribers || 0} subscribers`}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h2 className="font-semibold">Description</h2>
          <p className="text-sm text-zinc-300">{videoData.description}</p>
        </div>
      </div>
    </div>
  );
}
