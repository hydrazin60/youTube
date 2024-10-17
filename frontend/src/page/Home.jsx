// import SignupDialog from "@/components/dialogBox/SignupDialog";
// import LeftSidebar from "@/components/LeftSidbar";
// import { RxCross1 } from "react-icons/rx";
// import React, { useEffect } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { SiYoutubeshorts } from "react-icons/si";
// import { useSelector } from "react-redux";
// import axios from "axios";

// export default function Home() {
//   const { user } = useSelector((state) => state.userAuth);

//   const shortVideoList = [1, 2, 3, 4, 5, 6];
//   const [youtubeVideoListHome, setYoutubeVideoListHome] = React.useState([]);

//   useEffect(() => {
//     const fetchYoutubeChannel = async () => {
//       try {

//         const res = await axios(
//           "http://localhost:4000/youtube_studio/api/v1/post/home",
//           { withCredentials: true }
//         );
//         if (res.data.success) {
//           setYoutubeVideoListHome(res.data.ChannelsData);
//         } else {
//           console.log(res.data.message);
//         }
//       } catch (err) {
//         console.log(`error during fetchYoutubeChannel ${err}`);
//       }
//     };
//     fetchYoutubeChannel();
//   }, []);

//   return (
//     <div className="h-screen mt-20 pb-12 ">
//       <div className="flex flex-row h-full">
//         <div className="w-[15%] h-full">
//           <LeftSidebar />
//         </div>

//         <div className="h-full overflow-y-scroll pb-20">
//           {user ? (
//             <main className="w-full">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 p-4">
//                 {youtubeVideoListHome.map((channel, channelindex) =>
//                   channel.LongVideoId.map((video, index) => (
//                     <div
//                       key={`${channelindex}-${video.LongVideo}-${index}`}
//                       className="hover:bg-zinc-800 p-2 rounded-lg overflow-hidden cursor-pointer -z-10  "
//                     >
//                       <video
//                         className="rounded-lg w-full h-40 object-cover overflow-hidden "
//                         controls
//                       >
//                         <source src={video.LongVideo} type="video/mp4" />
//                       </video>
//                       <div className="flex gap-2 p-2">
//                         <img
//                           src={channel.profilePic}
//                           alt="channel icon"
//                           className="h-7 w-7 object-cover overflow-hidden rounded-full"
//                         />
//                         <div>
//                           <p className="text-sm font-bold ">{video.title}</p>
//                           <p className="text-[0.8rem] font-semibold text-slate-400">
//                             {channel.channelName}
//                           </p>
//                           <p className="text-[0.7rem] text-slate-400">
//                             634K views • 1 year ago
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               <div>
//                 <div className="flex justify-between px-3 gap-3 items-center h-12 mt-6">
//                   <div className="flex gap-2 items-center">
//                     <span>
//                       <SiYoutubeshorts className="text-xl text-red-600" />
//                     </span>
//                     <span>
//                       <p className="text-sm font-semibold">Shorts</p>
//                     </span>
//                   </div>
//                   <div>
//                     <span className=" text-xl h-9 w-9 p-1 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
//                       <RxCross1 className="text-xl text-zinc-300" />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex">
//                 {youtubeVideoListHome.map((channel, channelindex) =>
//                   channel.ShortVideoId.map((video, index) => (
//                     <div
//                       key={`${channelindex}-${video.ShortVideo}-${index}`}
//                       className="w-[12rem] p-2 hover:bg-zinc-800 rounded-xl transition duration-500 flex flex-col gap-1"
//                     >
//                       <div>
//                         <video
//                           className="rounded-lg w-full h-80 object-cover -z-10 cursor-pointer"
//                           controls
//                         >
//                           <source src={video.ShortVideo} type="video/mp4" />
//                         </video>
//                       </div>
//                       <div>
//                         <div className="text-sm font-semibold flex justify-between">
//                           <span>
//                             <p>{video.title}</p>
//                           </span>
//                           <span className="text-xl h-8 w-8 p-2 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
//                             <BsThreeDotsVertical className="text-xl" />
//                           </span>
//                         </div>
//                         <p className="text-normal text-slate-400">634K views</p>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </main>
//           ) : (
//             <main className="flex w-5/6 h-full flex-col items-center gap-10">
//               <div className="flex bg-zinc-900 h-20 w-1/2 flex-col items-center justify-center rounded-3xl">
//                 <p className="text-xl font-semibold">
//                   Try searching to get started
//                 </p>
//                 <p className="text-zinc-400 text-sm">
//                   Start watching videos to help us build a feed of videos you'll
//                   love.
//                 </p>
//               </div>
//             </main>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import SignupDialog from "@/components/dialogBox/SignupDialog";
import LeftSidebar from "@/components/LeftSidbar";
import { RxCross1 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SiYoutubeshorts } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setChannelsData } from "@/redux/ChannelsDataSlice";

export default function Home() {
  const { user } = useSelector((state) => state.userAuth);
  const { ChannelsData } = useSelector((state) => state.ChannelsData);
  const dispatch = useDispatch();
  const [youtubeVideoListHome, setYoutubeVideoListHome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchYoutubeChannel = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/youtube_studio/api/v1/post/home",
          { withCredentials: true }
        );
        if (res.data.success) {
          setYoutubeVideoListHome(res.data.ChannelsData);
          dispatch(setChannelsData(res.data.ChannelsData));
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError("Failed to fetch videos");
        console.error(`Error during fetchYoutubeChannel: ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchYoutubeChannel();
  }, []);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="h-screen mt-20 pb-12">
      <div className="flex flex-row h-full">
        <div className="w-[16%] h-full">
          <LeftSidebar />
        </div>

        <div className="h-full overflow-y-scroll pb-20">
          {user ? (
            <main className="w-full">
              {/* Long Video Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 p-4">
                {youtubeVideoListHome.map((channel, channelindex) =>
                  channel.LongVideoId.map((video, index) => (
                    // dispatch({
                    //   type: "UPDATE_TOAST",
                    //   toast: {
                    //     id: video._id,
                    //     title: video.title,
                    //     description: video.description,
                    //     profilePic: channel.profilePic,
                    //     channelName: channel.channelName,
                    //     LongVideo: video.LongVideo,
                    //   },
                    // }),
                    <div
                      key={`${channelindex}-${video.LongVideo}-${index}`}
                      className="hover:bg-zinc-800 p-2 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() =>
                        navigate(`/video/watch/${video._id}`, {
                          state: { videoData: video, channelData: channel },
                        })
                      }
                    >
       
                      <img
                        src={video.thumbnail}
                        className="rounded-lg w-full h-40 object-cover overflow-hidden"
                      ></img>
                      <div className="flex gap-3 p-2">
                        {channel.profilePic &&
                        channel.profilePic.trim() === null ? (
                          <div className="h-7 w-7 bg-zinc-800 rounded-full">
                            <p className="text-sm font-bold text-zinc-400 flex items-center justify-center h-full w-full">
                              {channel.channelName.slice(0, 2).toUpperCase()}
                            </p>
                          </div>
                        ) : (
                          <img
                            src={channel.profilePic}
                            alt="channel icon"
                            className="h-8 w-8 object-cover overflow-hidden rounded-full"
                          />
                        )}

                        <div>
                          <p className="text-sm font-bold  line-clamp-2 ">
                            {video.title}
                          </p>
                          <p className="text-[0.8rem] font-semibold text-zinc-400">
                            {channel.channelName}
                          </p>
                          <p className="text-[0.7rem] text-zinc-400">
                            634K views • 1 year ago
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Shorts Section */}
              <div>
                <div className="flex justify-between px-3 gap-3 items-center h-12 mt-6">
                  <div className="flex gap-2 items-center">
                    <span>
                      <SiYoutubeshorts className="text-xl text-red-600" />
                    </span>
                    <span>
                      <p className="text-sm font-semibold">Shorts</p>
                    </span>
                  </div>
                  <div>
                    <span className="text-xl h-9 w-9 p-1 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
                      <RxCross1 className="text-xl text-zinc-300" />
                    </span>
                  </div>
                </div>
              </div>

              {/* <div className="flex overflow-x-scroll">
                {youtubeVideoListHome.map((channel, channelindex) =>
                  channel.ShortVideoId.map((video, index) => (
                    <div
                      key={`${channelindex}-${video.ShortVideo}-${index}`}
                      className="w-[12rem] p-2 hover:bg-zinc-800 rounded-xl transition duration-500 flex flex-col gap-1"
                    >
                      <div>
                        <video
                          className="rounded-lg w-100 h-80 object-cover -z-10 cursor-pointer"
                          controls
                        >
                          <source src={video.ShortVideo} type="video/mp4" />
                        </video>
                      </div>
                      <div className="text-sm font-semibold flex justify-between">
                        <span>
                          <p>{video.title}</p>
                        </span>
                        <span className="text-xl h-8 w-8 p-2 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
                          <BsThreeDotsVertical className="text-xl" />
                        </span>
                      </div>
                      <p className="text-normal text-slate-400">
                        {video.views} views
                      </p>
                    </div>
                  ))
                )}
              </div> */}
              <div className="flex overflow-x-auto space-x-4 hide-scrollbar p-2">
                {youtubeVideoListHome.map((channel, channelindex) =>
                  channel.ShortVideoId.map((video, index) => (
                    <div
                      key={`${channelindex}-${video.ShortVideo}-${index}`}
                      className="w-[12rem] p-2 hover:bg-zinc-800 rounded-xl transition duration-500 flex flex-col gap-1 flex-shrink-0"
                    >
                      <div>
                        <video
                          className="rounded-lg w-full h-80 object-cover -z-10 cursor-pointer"
                          controls
                        >
                          <source src={video.ShortVideo} type="video/mp4" />
                        </video>
                      </div>
                      <div className="text-sm font-semibold flex justify-between">
                        <span>
                          <p className="line-clamp-2">{video.title} </p>
                        </span>
                        <span className="text-xl h-8 w-8 p-2 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
                          <BsThreeDotsVertical className="text-xl" />
                        </span>
                      </div>
                      <p className="text-normal text-zinc-400">75 views</p>
                    </div>
                  ))
                )}
              </div>
            </main>
          ) : (
            <main className="flex w-5/6 h-full flex-col items-center gap-10">
              <div className="flex bg-zinc-900 h-20 w-1/2 flex-col items-center justify-center rounded-3xl">
                <p className="text-xl font-semibold">
                  Try searching to get started
                </p>
                <p className="text-zinc-400 text-sm">
                  Start watching videos to help us build a feed of videos you'll
                  love.
                </p>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
