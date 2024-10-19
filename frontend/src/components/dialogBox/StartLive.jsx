import React from "react";
import { BsYoutube } from "react-icons/bs";
import { IoMenuOutline, IoSearch } from "react-icons/io5";
import { Input } from "./ui/input";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "./ui/button";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import ProfileOpen from "./dialogBox/ProfileOpen";
import CreateChannel from "./dialogBox/CreateChannel";

export default function Navbar() {
  const youtubeTag = [
    { id: 1, tag: "Trending" },
    { id: 2, tag: "Music" },
    { id: 3, tag: "Gaming" },
    { id: 4, tag: "News" },
    { id: 5, tag: "Live" },
    { id: 6, tag: "Sports" },
    { id: 7, tag: "Learning" },
    { id: 8, tag: "Movies" },
    { id: 9, tag: "Fashion" },
    { id: 10, tag: "Travel" },
    { id: 11, tag: "Technology" },
    { id: 12, tag: "Comedy" },
    { id: 13, tag: "Entertainment" },
    { id: 14, tag: "How-to" },
    { id: 15, tag: "Science" },
    { id: 16, tag: "Food" },
    { id: 17, tag: "Health" },
    { id: 18, tag: "Lifestyle" },
    { id: 19, tag: "DIY" },
    { id: 20, tag: "Vlogs" },
    { id: 21, tag: "Podcasts" },
  ];

  const { user } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const [OpenProfileDialog, setOpenProfileDialog] = React.useState(false);
  const [OpenCreateChannel, setOpenCreateChannel] = React.useState(false);
  const isYoutubeStudioPage = location.pathname === "/";
  return (
    <>
      <div className=" bg-zinc-950 w-screen h-auto fixed top-1 flex flex-col items-end gap-3 pr-4">
        <div className="px-4 flex flex-row w-full justify-between -inset-10">
          <div className="flex flex-row gap-4 cursor-pointer">
            <span className="text-xl h-8 w-8 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
              <IoMenuOutline />
            </span>
            <span
              className="flex flex-row items-center gap-1"
              onClick={() => navigate("/")}
            >
              <BsYoutube className="text-xl text-red-600" />
              <p className="text-xl" style={{ fontWeight: 400 }}>
                YouTube
              </p>
            </span>
          </div>
          <div className="flex flex-row h-8 w-96 rounded-full items-center">
            <span>
              <Input
                type="text"
                placeholder="Search"
                className="h-8 w-96 rounded-l-full bg-zinc-900 border border-zinc-500 px-3 text-white placeholder-white focus:outline-none focus:border-blue-500"
              />
            </span>
            <span className="h-8 bg-zinc-800 p-1 flex items-center px-3 rounded-r-full border-t border-r border-b border-zinc-500">
              <IoSearch className="text-xl" />
            </span>
          </div>
          <div className="flex flex-row items-center justify-between gap-6 relative">
            {user ? (
              <>
                <span
                  className="rounded-full cursor-pointer"
                  onClick={() => setOpenCreateChannel(!OpenCreateChannel)}
                >
                  <MdOutlineVideoCall className="text-xl text-white cursor-pointer" />
                </span>
                <span className="rounded-full cursor-pointer">
                  <IoMdNotificationsOutline className="text-xl cursor-pointer" />
                  <span className="bg-red-700 h-3 w-5 absolute bottom-4 right-10 rounded-full flex items-center justify-center text-[10px] font-semibold">
                    9+
                  </span>
                </span>
              </>
            ) : (
              <span className="cursor-pointer flex items-center justify-center">
                <BsThreeDotsVertical />
              </span>
            )}
            <span className="rounded-full cursor-pointer">
              {user ? (
                <div className="relative">
                  {user.channelId.profilePic ? (
                    <div
                      onClick={() => setOpenProfileDialog(!OpenProfileDialog)}
                    >
                      <img
                        src={user.channelId.profilePic}
                        alt="profile"
                        className="h-8 w-8 rounded-full object-cover overflow-hidden cursor-pointer "
                      />
                    </div>
                  ) : (
                    <div
                      className="h-6 w-6 p-2 rounded-full bg-blue-800 flex items-center justify-center"
                      onClick={() => setOpenProfileDialog(!OpenProfileDialog)}
                    >
                      <p className="text-xs font-semibold text-blue-100">
                        {user?.name[0] + user?.name[1]}
                      </p>
                    </div>
                  )}
                  <span className="z-10 absolute -right-4">
                    <ProfileOpen
                      open={OpenProfileDialog}
                      setOpen={setOpenProfileDialog}
                    />
                  </span>
                  <span className="z-10 absolute -right-7">
                    <CreateChannel
                      open={OpenCreateChannel}
                      setOpen={setOpenCreateChannel}
                    />
                  </span>
                </div>
              ) : (
                <span className="rounded-full">
                  <Button
                    className="h-7 rounded-full flex items-center justify-between gap-1 border border-zinc-500 px-2 hover:bg-slate-600"
                    onClick={() => navigate("/sign-in")}
                  >
                    <CgProfile className="text-xl" /> <p>Sign in</p>
                  </Button>
                </span>
              )}
            </span>
          </div>
        </div>
        {user && isYoutubeStudioPage ? (
          <div className="w-[83.5%] overflow-x-auto hide-scrollbar whitespace-nowrap flex items-center">
            {youtubeTag.map((tag) => (
              <span
                key={tag.id}
                className="text-white font-semibold text-normal px-2 py-2"
              >
                <p className="h-6 bg-zinc-800 px-4 text-normal rounded-normal hover:bg-zinc-700 cursor-pointer flex items-center">
                  {tag.tag}
                </p>
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}







// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function LongVideoOpen() {
//   const { id } = useParams(); // Get video id from the URL
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [videoData, setVideoData] = useState(location.state?.videoData || null); // Use passed videoData or fetch if not passed
//   const [loading, setLoading] = useState(!videoData);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!videoData) {
//       const fetchVideoData = async () => {
//         try {
//           const res = await axios.get(
//             `http://localhost:4000/youtube_studio/api/v1/video/${id}`,
//             { withCredentials: true }
//           );
//           if (res.data.success) {
//             setVideoData(res.data.videoData);
//           } else {
//             setError("Failed to fetch video details.");
//           }
//         } catch (err) {
//           setError("Failed to fetch video.");
//           console.error(`Error during fetchVideoData: ${err}`);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchVideoData();
//     }
//   }, [id, videoData]);

//   if (loading) {
//     return <p>Loading video...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="min-h-screen mt-20 pb-12">
//       <div className="container mx-auto px-4">
//         {/* Video Player */}
//         <div className="mb-4">
//           <video
//             className="w-full rounded-lg"
//             controls
//             autoPlay
//           >
//             <source src={videoData.LongVideo} type="video/mp4" />
//           </video>
//         </div>

//         {/* Video Information */}
//         <div className="mb-4">
//           <h1 className="text-xl font-bold">{videoData.title}</h1>
//           <p className="text-sm text-zinc-400">{`${videoData.views} views • ${new Date(videoData.uploadedAt).toLocaleDateString()}`}</p>
//         </div>

//         {/* Channel Information */}
//         <div className="flex items-center gap-4">
//           {videoData.channel?.profilePic && videoData.channel.profilePic.trim() === "" ? (
//             <div className="h-10 w-10 bg-zinc-800 rounded-full">
//               <p className="text-sm font-bold text-zinc-400 flex items-center justify-center h-full w-full">
//                 {videoData.channel.channelName.slice(0, 2).toUpperCase()}
//               </p>
//             </div>
//           ) : (
//             <img
//               src={videoData.channel?.profilePic}
//               alt="channel icon"
//               className="h-12 w-12 object-cover overflow-hidden rounded-full"
//             />
//           )}
//           <div>
//             <p className="text-lg font-semibold">{videoData.channel?.channelName}</p>
//             <p className="text-sm text-zinc-400">{`${videoData.channel?.subscribers || 0} subscribers`}</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-4">
//           <h2 className="font-semibold">Description</h2>
//           <p className="text-sm text-zinc-300">{videoData.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }


