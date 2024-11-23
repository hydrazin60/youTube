import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { RiDownloadLine } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LongVideoOpenSidbar from "@/components/contentType/LongVideoOpenSidbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { toast } from "sonner";
import { setChannelsData } from "@/redux/ChannelsDataSlice";

export default function LongVideoOpen() {
  const dispatch = useDispatch();
  const { ChannelsData } = useSelector((state) => state.ChannelsData);
  const { user } = useSelector((state) => state.userAuth);
  const { state } = useLocation();
  const videoData = state?.videoData;
  const channelData = state?.channelData;

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && videoData) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [videoData]);

  if (!videoData || !channelData) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  const [isExpanded, setIsExpanded] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const subscribeChannel = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/youtube/api/v1/user/subscribe-unsubscribe/${channelData._id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(
        `Error during subscribeChannel:`,
        err.response ? err.response.data : err.message
      );
      toast.error(
        `Error during subscribeChannel: ${
          err.response ? err.response.data.message : err.message
        }`
      );
    }
  };

  const LikeAndDislike = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/youtube_studio/api/v1/post/long_Video/like&dislike/${videoData._id}`, // removed extra slash
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(`Error during LikeAndDislike: ${err}`);
      toast.error(`Error during LikeAndDislike: ${err}`);
    }
  };

  return (
    <main className="h-screen w-screen overflow-y-scroll p-4">
      <div className="w-full h-fit pb-28 flex">
        <div className="w-[76%] px-8">
          <div className="w-full    ">
            <video
              ref={videoRef}
              className="rounded-xl w-full max-h-[80vh] object-cover overflow-hidden"
              controls
            >
              <source src={videoData.LongVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="w-full flex flex-col h-[9%]">
            <div>
              <p className="text-lg font-semibold">{videoData.title}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img
                  src={channelData.profilePic}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover overflow-hidden cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {channelData.channelName}
                  </p>
                  <p className="text-slate-400 text-[0.7rem]">
                    {channelData.subscribers.length} subscribers
                  </p>
                </div>
                <Button
                  className="bg-white h-7 text-zinc-600 text-xs hover:bg-zinc-200 rounded-full"
                  onClick={() => subscribeChannel()}
                >
                  Subscribe
                </Button>
              </div>
              <div className="flex gap-3 items-center">
                <div className="h-7 w-28 rounded-full cursor-pointer flex items-center justify-between">
                  <span
                    className="h-[100%] w-[75%] text-lg flex items-center border-r border-zinc-400 bg-zinc-800 hover:bg-zinc-700 rounded-l-full pl-3 gap-1 text-zinc-200"
                    onClick={LikeAndDislike}
                  >
                    <AiOutlineLike />
                    <p className="text-xs font-semibold">
                      {videoData.likes.length} {console.log(videoData.likes)}
                    </p>
                  </span>
                  <span className="h-[100%] w-[40%] text-lg flex items-center justify-evenly text-zinc-200 hover:bg-zinc-700 bg-zinc-800 rounded-r-full p-2">
                    <AiOutlineDislike />
                  </span>
                </div>
                <Button className="h-7 px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-full">
                  <RiShareForwardLine className="text-lg" />
                  <p className="text-xs">Share</p>
                </Button>
                <Button className="h-7 px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-full">
                  <RiDownloadLine className="text-lg" />
                  <p className="text-xs">Download</p>
                </Button>
                <Button className="h-7 px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-full">
                  <CiBookmark className="text-lg" />
                  <p className="text-xs">Save</p>
                </Button>
              </div>
            </div>
          </div>
          <div
            className="w-full h-fit bg-zinc-800 text-zinc-200 text-xs p-3 rounded-xl font-semibold cursor-pointer"
            onClick={toggleExpand}
          >
            <p
              className={`transition-all text-zinc-300 ${
                isExpanded ? "" : "line-clamp-4"
              }`}
            >
              {videoData.description}   || || || || || || Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Nulla laboriosam sit deserunt
              quos quas corporis voluptatibus aut quidem recusandae optio rerum
              delectus, blanditiis quia a animi fuga odio, amet cupiditate?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab autem
              ratione suscipit, perspiciatis quos delectus accusamus earum ex
              saepe, fugiat aperiam exercitationem cupiditate illo neque quas!
              Dolore ad animi Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nostrum consequuntur laudantium asperiores eius, voluptatem
              deleniti modi, id ipsa, ea numquam unde vel perspiciatis possimus?
              Nesciunt, aliquid obcaecati! Incidunt, eum ut! Lorem ipsum dolor
              sit amet consectetur, adipisicing elit. Nulla laboriosam sit
              deserunt quos quas corporis voluptatibus aut quidem recusandae
              optio rerum delectus, blanditiis quia a animi fuga odio, amet
              cupiditate? Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Ab autem ratione suscipit, perspiciatis quos delectus
              accusamus earum ex saepe, fugiat aperiam exercitationem cupiditate
              illo neque quas! Dolore ad animi Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Nostrum consequuntur laudantium
              asperiores eius, voluptatem deleniti modi, id ipsa, ea numquam
              unde vel perspiciatis possimus? Nesciunt, aliquid obcaecati!
              Incidunt, eum ut!#jiban #coding #region #jiban #coding
            </p>
          </div>
          <div className="w-full h-fit my-6">
            {/* Comments section */}
            <div>
              <div className="flex items-center gap-10">
                <span className="text-lg font-semibold">2,243 Comments</span>
                <span className="text-lg font-semibold flex items-center gap-1">
                  <FaArrowUpWideShort className="text-lg text-zinc-400" />
                  <p className="text-xs text-zinc-400">Short</p>
                </span>
              </div>
              {/* Comment input section */}
              <div className="flex flex-col gap-1 my-3">
                <div className="flex items-center gap-2">
                  <button>
                    <img
                      src={channelData.profilePic || user.profilePic}
                      alt="profile"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  </button>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    className="w-full outline-none bg-black text-white focus:border-b-2 focus:border-white border-b-2 border-white transition-all duration-200 placeholder-zinc-300 placeholder:text-sm placeholder:font-normal"
                  />
                </div>
                <div className="flex flex-row-reverse gap-6">
                  <Button
                    variant="outline"
                    className="h-7 p-2 text-xs rounded-full bg-black border-none hover:text-white text-white flex items-center hover:bg-zinc-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    className="h-7 px-2 text-xs rounded-full hover:text-white border-none bg-black text-white flex items-center hover:bg-zinc-700"
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </div>
            {/* Sample Comment */}
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/292694884_729606568152974_711651807545817504_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xnL-0IiuGI4Q7kNvgFxBB23&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AAv6g-Z8MgbW4Pwf0kurWLa&oh=00_AYDHUrcC2uZ0i5vpcKCztLJ4GBY69KpAGjh6AdnseXtoxQ&oe=67152724"
                  alt="profile"
                  className="h-9 w-9 rounded-full object-cover overflow-hidden cursor-pointer "
                />
                <div>
                  <span className="flex items-center gap-2">
                    <button className="rounded-full px-2 text-[0.7rem] bg-zinc-700">
                      <p>@username</p>
                    </button>
                    <p className="text-[0.7rem]">2 days ago</p>
                  </span>
                  <p className="text-sm font-semibold">This is a comment</p>
                </div>
              </div>
              <div className="h-7 w-7 hover:bg-zinc-700 text-white p-1 rounded-full flex items-center justify-center">
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[24%] h-full min-h-[100vh]">
          <LongVideoOpenSidbar />
        </div>
      </div>
    </main>
  );
}

// import { Button } from "@/components/ui/button";
// import React, { useEffect, useRef, useState } from "react";
// import { AiOutlineLike } from "react-icons/ai";
// import { AiOutlineDislike } from "react-icons/ai";
// import { RiShareForwardLine } from "react-icons/ri";
// import { RiDownloadLine } from "react-icons/ri";
// import { CiBookmark } from "react-icons/ci";
// import { FaArrowUpWideShort } from "react-icons/fa6";
// import { Input } from "@/components/ui/input";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import { useLocation, useParams } from "react-router-dom";
// import LongVideoOpenSidbar from "@/components/contentType/LongVideoOpenSidbar";

// export default function LongVideoOpen() {
//   const { ChannelsData } = useSelector((state) => state.ChannelsData);
//   const { state } = useLocation();
//   const videoData = state?.videoData;
//   const channelData = state?.channelData;

//   const videoRef = useRef(null);

//   const [isExpanded, setIsExpanded] = useState(false);
//   if (!videoData || !channelData) {
//     return (
//       <div className="h-screen w-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   useEffect(() => {
//     console.log("Video Source URL:", videoData?.LongVideo);
//     if (videoRef.current && videoData) {
//       videoRef.current.load();
//       videoRef.current.play();
//     }
//   }, [videoData]);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };
//   console.log("Video Source URL:", videoData.LongVideo);

//   return (
//     <main className="h-screen w-screen overflow-y-scroll p-4   ">
//       <div className="w-full h-fit   pb-28 flex ">
//         <div className="w-[76%]   px-8 ">
//           <div className="w-full">
//             <video
//               className="rounded-xl w-full object-cover overflow-hidden"
//               controls
//             >
//               <source src={videoData.LongVideo} type="video/mp4" />
//             </video>
//           </div>

//           <div className="w-full flex flex-col  h-[9%]  ">
//             <div>
//               <p className="text-lg font-semibold">{videoData.title}</p>
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="flex gap-3 items-center">
//                 <span>
//                   <img
//                     src={channelData.profilePic}
//                     alt="profile"
//                     className="h-10 w-10 rounded-full object-cover overflow-hidden cursor-pointer "
//                   />
//                 </span>
//                 <span className="flex flex-col">
//                   <p className="text-sm font-semibold">
//                     {channelData.channelName}
//                   </p>
//                   <p className="text-slate-400 text-[0.7rem]">
//                     {channelData.subscriberCount} 11 subscribers
//                   </p>
//                 </span>
//                 <span>
//                   <Button className="bg-white h-7   text-zinc-600 text-xs  hover:bg-zinc-200 rounded-full">
//                     Subscribe
//                   </Button>
//                 </span>
//               </div>
//               <div className="flex gap-3 items-center">
//                 <div className="h-7 w-28    rounded-full  cursor-pointer flex items-center justify-between">
//                   <span className="h-[100%] w-[75%] text-lg flex items-center  border-r border-zinc-400 bg-zinc-800 hover:bg-zinc-700 rounded-l-full pl-3  gap-1 text-zinc-200">
//                     <AiOutlineLike />
//                     <p className="text-xs font-semibold">{videoData.likes}l</p>
//                   </span>
//                   <span className="h-[100%] w-[40%] text-lg flex items-center justify-evenly text-zinc-200 hover:bg-zinc-700 bg-zinc-800 rounded-r-full p-2">
//                     <AiOutlineDislike />
//                   </span>
//                 </div>
//                 <span>
//                   <Button className=" h-7  px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200     rounded-full">
//                     <RiShareForwardLine className="text-lg" />
//                     <p className="text-xs">share</p>
//                   </Button>
//                 </span>
//                 <span>
//                   <Button className=" h-7  px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200     rounded-full">
//                     <RiDownloadLine className="text-lg" />
//                     <p className="text-xs">download</p>
//                   </Button>
//                 </span>
//                 <span>
//                   <Button className=" h-7  px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200     rounded-full">
//                     <CiBookmark className="text-lg" />
//                     <p className="text-xs">save</p>
//                   </Button>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div
//             className="w-full h-fit bg-zinc-800 text-zinc-200 text-xs p-3 rounded-xl font-semibold cursor-pointer"
//             onClick={toggleExpand}
//           >
//             <p
//               className={`transition-all text-zinc-300 ${
//                 isExpanded ? "" : "line-clamp-4  "
//               }`}
//             >
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
//               odio reiciendis nam a, dolores deserunt aut qui minima itaque sit
//             </p>
//           </div>
//           <div className=" w-full h-fit my-6  ">
//             <div>
//               <div className="flex items-center gap-10 ">
//                 <span className="text-lg font-semibold">2,243 Comments</span>
//                 <span className="text-lg font-semibold flex items-center gap-1 ">
//                   <>
//                     <FaArrowUpWideShort className="text-lg text-zinc-400" />
//                     <p className="text-xs text-zinc-400">Short</p>
//                   </>
//                 </span>
//               </div>
//               <div className="flex flex-col gap-1 my-3 ">
//                 <div className="flex items-center gap-2">
//                   <button>
//                     <img
//                       src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/292694884_729606568152974_711651807545817504_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xnL-0IiuGI4Q7kNvgFxBB23&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AAv6g-Z8MgbW4Pwf0kurWLa&oh=00_AYDHUrcC2uZ0i5vpcKCztLJ4GBY69KpAGjh6AdnseXtoxQ&oe=67152724"
//                       alt="profile"
//                       className="h-9 w-9 rounded-full object-cover overflow-hidden cursor-pointer "
//                     />
//                   </button>
//                   <input
//                     type="text"
//                     placeholder="Add a comment"
//                     className=" w-full outline-none  bg-black text-white
//                   focus:border-b-2 focus:border-white border-b-2 border-white
//                   transition-all duration-200 placeholder-zinc-300 placeholder:text-sm placeholder:font-normal"
//                   />
//                 </div>
//                 <div className="flex  flex-row-reverse gap-6">
//                   <Button
//                     variant="outline"
//                     className=" h-7 p-2 text-xs rounded-full bg-black  border-none hover:text-white  text-white flex items-center    hover:bg-zinc-700"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className=" h-7 px-2 text-xs rounded-full hover:text-white border-none bg-black  text-white flex items-center    hover:bg-zinc-700"
//                   >
//                     Comment
//                   </Button>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full flex justify-between">
//               <div className="flex items-center gap-3">
//                 <div>
//                   <img
//                     src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/292694884_729606568152974_711651807545817504_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xnL-0IiuGI4Q7kNvgFxBB23&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AAv6g-Z8MgbW4Pwf0kurWLa&oh=00_AYDHUrcC2uZ0i5vpcKCztLJ4GBY69KpAGjh6AdnseXtoxQ&oe=67152724"
//                     alt="profile"
//                     className="h-9 w-9 rounded-full object-cover overflow-hidden cursor-pointer "
//                   />
//                 </div>
//                 <div>
//                   <span className="flex items-center gap-2">
//                     <button className=" rounded-full px-2  text-[0.7rem]  bg-zinc-700 ">
//                       <p>@karunakarki</p>
//                     </button>{" "}
//                     <p className="text-[0.7rem]"> 2 day ago</p>
//                   </span>
//                   <span>
//                     <p className="text-sm font-semibold">
//                       Lorem ipsum dolor sit amet this is comment
//                     </p>
//                   </span>
//                 </div>
//               </div>
//               <div className="h-7 w-7 hover:bg-zinc-700 text-white p-1 rounded-full flex items-center justify-center">
//                 <BsThreeDotsVertical />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="w-[24%] h-full  min-h-[100vh]  ">
//           <LongVideoOpenSidbar />
//         </div>
//       </div>
//     </main>
//   );
// }

// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
// import { AiOutlineLike } from "react-icons/ai";
// import { AiOutlineDislike } from "react-icons/ai";
// import { RiShareForwardLine } from "react-icons/ri";
// import { RiDownloadLine } from "react-icons/ri";
// import { CiBookmark } from "react-icons/ci";
// import { FaArrowUpWideShort } from "react-icons/fa6";
// import { Input } from "@/components/ui/input";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import { useLocation, useParams } from "react-router-dom";

// export default function LongVideoOpen() {
//   const { ChannelsData } = useSelector((state) => state.ChannelsData);
//   const { state } = useLocation();
//   const videoData = state?.videoData;
//   const channelData = state?.channelData;
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [issidbarvideoCllick, setIssidbarvideoCllick] = useState(false);
//   const [openSideVideo, setOpenSideVideo] = useState({
//     LongVideo: videoData.LongVideo,
//     title: videoData.title,
//     profilePic: channelData.profilePic,
//     channelName: channelData.channelName,
//     subscriberCount: channelData.subscriberCount,
//   });
//   console.log(
//     "issidbarvideoCllick",
//     issidbarvideoCllick,
//     "openSideVideo",
//     openSideVideo
//   );
//   if (!videoData || !channelData) {
//     return (
//       <div className="h-screen w-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };
//   return (
//     <main className="h-screen w-screen overflow-y-scroll p-4   ">
//       <div className="w-full h-fit   pb-28 flex ">
//         <div className="w-[76%]   px-8 ">
//           <div className="w-full">
//             <video
//               className="rounded-xl  w-full   object-cover overflow-hidden"
//               controls
//             >
//               <source
//                 // src={videoData.LongVideo || openSideVideo.LongVideo}
//                 src={
//                   issidbarvideoCllick
//                     ? openSideVideo.LongVideo
//                     : videoData.LongVideo
//                 }
//                 type="video/mp4"
//               />
//             </video>
//           </div>

//           <div className="w-full flex flex-col  h-[9%]  ">
//             <div>
//               <p className="text-lg font-semibold">
//                 {issidbarvideoCllick ? openSideVideo.title : videoData.title}{" "}
//               </p>
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="flex gap-3 items-center">
//                 <span>
//                   <img
//                     src={
//                       issidbarvideoCllick
//                         ? openSideVideo.profilePic
//                         : channelData.profilePic
//                     }
//                     alt="profile"
//                     className="h-10 w-10 rounded-full object-cover overflow-hidden cursor-pointer "
//                   />
//                 </span>
//                 <span className="flex flex-col">
//                   <p className="text-sm font-semibold">
//                     {issidbarvideoCllick
//                       ? openSideVideo.channelName
//                       : channelData.channelName}
//                   </p>
//                   <p className="text-slate-400 text-[0.7rem]">
//                     {issidbarvideoCllick
//                       ? openSideVideo.subscriberCount
//                       : channelData.subscriberCount}
//                     11 subscribers
//                   </p>
//                 </span>
//                 <span>
//                   <Button className="bg-white h-7   text-zinc-600 text-xs  hover:bg-zinc-200 rounded-full">
//                     Subscribe
//                   </Button>
//                 </span>
//               </div>
//               <div className="flex gap-3 items-center">
//                 <div className="h-7 w-28    rounded-full  cursor-pointer flex items-center justify-between">
//                   <span className="h-[100%] w-[75%] text-lg flex items-center  border-r border-zinc-400 bg-zinc-800 hover:bg-zinc-700 rounded-l-full pl-3  gap-1 text-zinc-200">
//                     <AiOutlineLike />
//                     <p className="text-xs font-semibold">
//                       {issidbarvideoCllick
//                         ? openSideVideo.likeCount
//                         : videoData.likeCount}
//                       l
//                     </p>
//                   </span>
//                   <span className="h-[100%] w-[40%] text-lg flex items-center justify-evenly text-zinc-200 hover:bg-zinc-700 bg-zinc-800 rounded-r-full p-2">
//                     <AiOutlineDislike />
//                   </span>
//                 </div>
//                 <span>
//                   <Button className=" h-7  px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200     rounded-full">
//                     <RiShareForwardLine className="text-lg" />
//                     <p className="text-xs">share</p>
//                   </Button>
//                 </span>
//                 <span>
//                   <Button className=" h-7  px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200     rounded-full">
//                     <RiDownloadLine className="text-lg" />
//                     <p className="text-xs">download</p>
//                   </Button>
//                 </span>
//                 <span>
//                   <Button className=" h-7  px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200     rounded-full">
//                     <CiBookmark className="text-lg" />
//                     <p className="text-xs">save</p>
//                   </Button>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div
//             className="w-full h-fit bg-zinc-800 text-zinc-200 text-xs p-3 rounded-xl font-semibold cursor-pointer"
//             onClick={toggleExpand}
//           >
//             <p
//               className={`transition-all text-zinc-300 ${
//                 isExpanded ? "" : "line-clamp-4  "
//               }`}
//             >
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
//               odio reiciendis nam a, dolores deserunt aut qui minima itaque sit
//               suscipit harum! Eos tempore minus earum maiores eaque sit quaerat.
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
//               laboriosam nihil quod totam et nesciunt molestiae qui perferendis
//               nobis enim, nulla, exercitationem odio alias blanditiis sit
//               praesentium enim omnis. Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Optio odio reiciendis nam a, dolores deserunt
//               aut qui minima itaque sit suscipit harum! Eos tempore minus earum
//               maiores eaque sit quaerat. Lorem ipsum dolor sit amet consectetur,
//               adipisicing elit. Suscipit laboriosam nihil quod totam et nesciunt
//               molestiae qui perferendis nobis enim, nulla, exercitationem odio
//               alias blanditiis sit praesentium enim omnis. Lorem ipsum dolor sit
//               amet consectetur adipisicing elit. Optio odio reiciendis nam a,
//               dolores deserunt aut qui minima itaque sit suscipit harum! Eos
//               tempore minus earum maiores eaque sit quaerat. Lorem ipsum dolor
//               sit amet consectetur, adipisicing elit. Suscipit laboriosam nihil
//               quod totam et nesciunt molestiae qui perferendis nobis enim,
//               nulla, exercitationem odio alias blanditiis sit praesentium enim
//               omnis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Optio odio reiciendis nam a, dolores deserunt aut qui minima
//               itaque sit suscipit harum! Eos tempore minus earum maiores eaque
//               sit quaerat. Lorem ipsum dolor sit amet consectetur, adipisicing
//               elit. Suscipit laboriosam nihil quod totam et nesciunt molestiae
//               qui perferendis nobis enim, nulla, exercitationem odio alias
//               blanditiis sit praesentium enim omnis. Lorem ipsum dolor sit amet
//               consectetur adipisicing elit. Optio odio reiciendis nam a, dolores
//               deserunt aut qui minima itaque sit suscipit harum! Eos tempore
//               minus earum maiores eaque sit quaerat. Lorem ipsum dolor sit amet
//               consectetur, adipisicing elit. Suscipit laboriosam nihil quod
//               totam et nesciunt molestiae qui perferendis nobis enim, nulla,
//               exercitationem odio alias blanditiis sit praesentium enim omnis.
//             </p>
//           </div>
//           <div className=" w-full h-fit my-6  ">
//             <div>
//               <div className="flex items-center gap-10 ">
//                 <span className="text-lg font-semibold">2,243 Comments</span>
//                 <span className="text-lg font-semibold flex items-center gap-1 ">
//                   <>
//                     <FaArrowUpWideShort className="text-lg text-zinc-400" />
//                     <p className="text-xs text-zinc-400">Short</p>
//                   </>
//                 </span>
//               </div>
//               <div className="flex flex-col gap-1 my-3 ">
//                 <div className="flex items-center gap-2">
//                   <button>
//                     <img
//                       src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/292694884_729606568152974_711651807545817504_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xnL-0IiuGI4Q7kNvgFxBB23&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AAv6g-Z8MgbW4Pwf0kurWLa&oh=00_AYDHUrcC2uZ0i5vpcKCztLJ4GBY69KpAGjh6AdnseXtoxQ&oe=67152724"
//                       alt="profile"
//                       className="h-9 w-9 rounded-full object-cover overflow-hidden cursor-pointer "
//                     />
//                   </button>
//                   <input
//                     type="text"
//                     placeholder="Add a comment"
//                     className=" w-full outline-none  bg-black text-white
//                   focus:border-b-2 focus:border-white border-b-2 border-white
//                   transition-all duration-200 placeholder-zinc-300 placeholder:text-sm placeholder:font-normal"
//                   />
//                 </div>
//                 <div className="flex  flex-row-reverse gap-6">
//                   <Button
//                     variant="outline"
//                     className=" h-7 p-2 text-xs rounded-full bg-black  border-none hover:text-white  text-white flex items-center    hover:bg-zinc-700"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className=" h-7 px-2 text-xs rounded-full hover:text-white border-none bg-black  text-white flex items-center    hover:bg-zinc-700"
//                   >
//                     Comment
//                   </Button>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full flex justify-between">
//               <div className="flex items-center gap-3">
//                 <div>
//                   <img
//                     src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/292694884_729606568152974_711651807545817504_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xnL-0IiuGI4Q7kNvgFxBB23&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AAv6g-Z8MgbW4Pwf0kurWLa&oh=00_AYDHUrcC2uZ0i5vpcKCztLJ4GBY69KpAGjh6AdnseXtoxQ&oe=67152724"
//                     alt="profile"
//                     className="h-9 w-9 rounded-full object-cover overflow-hidden cursor-pointer "
//                   />
//                 </div>
//                 <div>
//                   <span className="flex items-center gap-2">
//                     <button className=" rounded-full px-2  text-[0.7rem]  bg-zinc-700 ">
//                       <p>@karunakarki</p>
//                     </button>{" "}
//                     <p className="text-[0.7rem]"> 2 day ago</p>
//                   </span>
//                   <span>
//                     <p className="text-[0.8rem] text-gray-200 font-semibold">
//                       Lorem ipsum dolor sit amet this is comment
//                     </p>
//                   </span>
//                 </div>
//               </div>
//               <div className="h-7 w-7 hover:bg-zinc-700 text-white p-1 rounded-full flex items-center justify-center">
//                 <BsThreeDotsVertical />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="w-[24%] h-full  min-h-[100vh] flex flex-col gap-3 ">
//           {ChannelsData?.map((channel, index) => {
//             return channel.LongVideoId?.map((video, Videoindex) => {
//               return (
//                 <div
//                   className="flex w-full  flex-row justify-between  rounded-xl"
//                   key={Videoindex}
//                   onClick={() => {
//                     setOpenSideVideo({
//                       LongVideo: video.LongVideo,
//                       title: video.title,
//                       profilePic: channel.profilePic,
//                       channelName: channel.channelName,
//                       subscriberCount: channel.subscriberCount,
//                       videoId: video.videoId,
//                     }),
//                       setIssidbarvideoCllick(true);
//                   }}
//                 >
//                   <div className="rounded-lg overflow-hidden cursor-pointer flex w-full h-full justify-between gap-2 ">
//                     <div className="  w-[50%]">
//                       <img
//                         src={video.thumbnail}
//                         className="rounded-lg w-full h-24 object-cover overflow-hidden"
//                         controls
//                       ></img>
//                     </div>
//                     <div className="  w-[45%]  flex">
//                       <div className="w-full ">
//                         <p className="text-[0.7rem] font-bold flex-wrap line-clamp-2 ">
//                           {video.title}
//                         </p>
//                         <p className="text-[0.6rem] font-semibold text-zinc-400">
//                           {channel.channelName}
//                         </p>
//                         <p className="text-[0.6rem] text-zinc-400">
//                           634K views • 1 year ago
//                         </p>
//                       </div>
//                       <div>
//                         <BsThreeDotsVertical className="text-[0.8rem]" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             });
//           })}
//         </div>
//       </div>
//     </main>
//   );
// }

// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
// import { AiOutlineLike } from "react-icons/ai";
// import { AiOutlineDislike } from "react-icons/ai";
// import { RiShareForwardLine } from "react-icons/ri";
// import { RiDownloadLine } from "react-icons/ri";
// import { CiBookmark } from "react-icons/ci";

// export default function LongVideoOpen() {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };
//   return (
//     <main className="h-screen w-screen overflow-y-scroll p-2   ">
//       <div className="w-full h-fit  bg-red-600 pb-16 flex ">
//         <div className="w-[70%] bg-green-700 ">
//           <>
//             <div className="w-full h-[75%]">
//               <video
//                 className="rounded-xl  w-full   object-cover overflow-hidden"
//                 controls
//               >
//                 <source
//                   src="https://www.youtube.com/watch?v=iYA_AU16iHA&list=RDGMEMCMFH2exzjBeE_zAHHJOdxgVM6Rpy_VcoNSw&index=4"
//                   type="video/mp4"
//                 />
//               </video>
//             </div>
//             <div className="w-full flex flex-col gap-4 h-[20%] ">
//               <div>
//                 <p className="text-lg font-semibold">
//                   title Timle Bato Fereu Are Latest Song By Melina Rai with
//                   English subtitles
//                 </p>
//               </div>
//               <div className="flex justify-between items-center">
//                 <div className="flex gap-3 items-center">
//                   <span>
//                     <img
//                       src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/292694884_729606568152974_711651807545817504_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xnL-0IiuGI4Q7kNvgFxBB23&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AAv6g-Z8MgbW4Pwf0kurWLa&oh=00_AYDHUrcC2uZ0i5vpcKCztLJ4GBY69KpAGjh6AdnseXtoxQ&oe=67152724"
//                       alt="profile"
//                       className="h-10 w-10 rounded-full object-cover overflow-hidden cursor-pointer "
//                     />
//                   </span>
//                   <span className="flex flex-col">
//                     <p className="text-sm font-semibold">Shallum Lama</p>
//                     <p className="text-slate-400 text-[0.7rem]">
//                       11.3k subscribers
//                     </p>
//                   </span>
//                   <span>
//                     <Button className="bg-white h-7   text-zinc-600 text-xs  hover:bg-zinc-200 rounded-full">
//                       Subscribe
//                     </Button>
//                   </span>
//                 </div>
//                 <div className="flex gap-3 items-center">
//                   <div className="h-7 w-28    rounded-full  cursor-pointer flex items-center justify-between">
//                     <span className="h-[100%] w-[75%] text-lg flex items-center  border-r border-zinc-400 bg-zinc-800 hover:bg-zinc-700 rounded-l-full pl-3  gap-1 text-zinc-200">
//                       <AiOutlineLike />
//                       <p className="text-xs font-semibold">10 k</p>
//                     </span>
//                     <span className="h-[100%] w-[40%] text-lg flex items-center justify-evenly text-zinc-200 hover:bg-zinc-700 bg-zinc-800 rounded-r-full p-2">
//                       <AiOutlineDislike />
//                     </span>
//                   </div>
//                   <span>
//                     <Button className=" h-7  px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200     rounded-full">
//                       <RiShareForwardLine className="text-lg" />
//                       <p className="text-xs">share</p>
//                     </Button>
//                   </span>
//                   <span>
//                     <Button className=" h-7  px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200     rounded-full">
//                       <RiDownloadLine className="text-lg" />
//                       <p className="text-xs">download</p>
//                     </Button>
//                   </span>
//                   <span>
//                     <Button className=" h-7  px-3 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200     rounded-full">
//                       <CiBookmark className="text-lg" />
//                       <p className="text-xs">save</p>
//                     </Button>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="w-full h-fit bg-zinc-800 text-zinc-200 text-xs p-3 rounded-xl font-semibold cursor-pointer"
//               onClick={toggleExpand}
//             >
//               <p
//                 className={`transition-all ${isExpanded ? "" : "line-clamp-4"}`}
//               >
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
//                 odio reiciendis nam a, dolores deserunt aut qui minima itaque
//                 sit suscipit harum! Eos tempore minus earum maiores eaque sit
//                 quaerat. Lorem ipsum dolor sit amet consectetur, adipisicing
//                 elit. Suscipit laboriosam nihil quod totam et nesciunt molestiae
//                 qui perferendis nobis enim, nulla, exercitationem odio alias
//                 blanditiis sit praesentium enim omnis. Lorem ipsum dolor sit
//                 amet consectetur adipisicing elit. Optio odio reiciendis nam a,
//                 dolores deserunt aut qui minima itaque sit suscipit harum! Eos
//                 tempore minus earum maiores eaque sit quaerat. Lorem ipsum dolor
//                 sit amet consectetur, adipisicing elit. Suscipit laboriosam
//                 nihil quod totam et nesciunt molestiae qui perferendis nobis
//                 enim, nulla, exercitationem odio alias blanditiis sit
//                 praesentium enim omnis. Lorem ipsum dolor sit amet consectetur
//                 adipisicing elit. Optio odio reiciendis nam a, dolores deserunt
//                 aut qui minima itaque sit suscipit harum! Eos tempore minus
//                 earum maiores eaque sit quaerat. Lorem ipsum dolor sit amet
//                 consectetur, adipisicing elit. Suscipit laboriosam nihil quod
//                 totam et nesciunt molestiae qui perferendis nobis enim, nulla,
//                 exercitationem odio alias blanditiis sit praesentium enim omnis.
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
//                 odio reiciendis nam a, dolores deserunt aut qui minima itaque
//                 sit suscipit harum! Eos tempore minus earum maiores eaque sit
//                 quaerat. Lorem ipsum dolor sit amet consectetur, adipisicing
//                 elit. Suscipit laboriosam nihil quod totam et nesciunt molestiae
//                 qui perferendis nobis enim, nulla, exercitationem odio alias
//                 blanditiis sit praesentium enim omnis. Lorem ipsum dolor sit
//                 amet consectetur adipisicing elit. Optio odio reiciendis nam a,
//                 dolores deserunt aut qui minima itaque sit suscipit harum! Eos
//                 tempore minus earum maiores eaque sit quaerat. Lorem ipsum dolor
//                 sit amet consectetur, adipisicing elit. Suscipit laboriosam
//                 nihil quod totam et nesciunt molestiae qui perferendis nobis
//                 enim, nulla, exercitationem odio alias blanditiis sit
//                 praesentium enim omnis.
//               </p>
//             </div>
//             <div className=" w-full h-fit bg-yellow-700">
//               comment section Lorem ipsum dolor sit amet consectetur adipisicing
//               elit. Optio odio reiciendis nam a, dolores deserunt aut qui minima
//               itaque sit suscipit harum! Eos tempore minus earum maiores eaque
//               sit quaerat. Lorem ipsum dolor sit amet consectetur, adipisicing
//               elit. Suscipit laboriosam nihil quod totam et nesciunt molestiae
//               qui perferendis nobis enim, nulla, exercitationem odio alias
//               blanditiis sit praesentium enim omnis. comment section Lorem ipsum
//               dolor sit amet consectetur adipisicing elit. Optio odio reiciendis
//               nam a, dolores deserunt aut qui minima itaque sit suscipit harum!
//               Eos tempore minus earum maiores eaque sit quaerat. Lorem ipsum
//               dolor sit amet consectetur, adipisicing elit. Suscipit laboriosam
//               nihil quod totam et nesciunt molestiae qui perferendis nobis enim,
//               nulla, exercitationem odio alias blanditiis sit praesentium enim
//               omnis. comment section Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Optio odio reiciendis nam a, dolores deserunt
//               aut qui minima itaque sit suscipit harum! Eos tempore minus earum
//               maiores eaque sit quaerat. Lorem ipsum dolor sit amet consectetur,
//               adipisicing elit. Suscipit laboriosam nihil quod totam et nesciunt
//               molestiae qui perferendis nobis enim, nulla, exercitationem odio
//               alias blanditiis sit praesentium enim omnis. comment section Lorem
//               ipsum dolor sit amet consectetur adipisicing elit. Optio odio
//               reiciendis nam a, dolores deserunt aut qui minima itaque sit
//               suscipit harum! Eos tempore minus earum maiores eaque sit quaerat.
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
//               laboriosam nihil quod totam et nesciunt molestiae qui perferendis
//               nobis enim, nulla, exercitationem odio alias blanditiis sit
//               praesentium enim omnis. comment section Lorem ipsum dolor sit amet
//               consectetur adipisicing elit. Optio odio reiciendis nam a, dolores
//               deserunt aut qui minima itaque sit suscipit harum! Eos tempore
//               minus earum maiores eaque sit quaerat. Lorem ipsum dolor sit amet
//               consectetur, adipisicing elit. Suscipit laboriosam nihil quod
//               totam et nesciunt molestiae qui perferendis nobis enim, nulla,
//               exercitationem odio alias blanditiis sit praesentium enim omnis.
//             </div>
//           </>
//         </div>

//         <div className="w-[30%] h-full  bg-blue-600">
//           requminded video list Lorem ipsum dolor sit amet consectetur
//           adipisicing elit. Similique perferendis tenetur corrupti provident
//           earum nesciunt nobis? Ut modi facilis necessitatibus sunt earum. Odio
//           vel voluptate laboriosam maiores nam sed quidem. Repellendus nihil
//           voluptas eius molestias. Et repudiandae libero consectetur totam
//           recusandae fuga commodi ut hic exercitationem earum, consequuntur
//           error, asperiores facere od
//         </div>
//       </div>
//     </main>
//   );
// }
