// import LeftSidebar from "@/components/LeftSidbar";
// import React, { useEffect, useRef } from "react";
// import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
// import { MdOutlineInsertComment } from "react-icons/md";
// import { PiShareFatThin } from "react-icons/pi";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { Button } from "@/components/ui/button";
// import { useLocation } from "react-router-dom";

// const icons = [
//   { id: 1, icon: <AiOutlineLike />, name: "Likes" },
//   { id: 2, icon: <AiOutlineDislike />, name: "Dislikes" },
//   { id: 3, icon: <MdOutlineInsertComment />, name: "Comments" },
//   { id: 4, icon: <PiShareFatThin />, name: "Share" },
//   { id: 5, icon: <BsThreeDotsVertical />, name: "More" },
// ];

// export default function ShortVideoOpen() {
//   const { state } = useLocation();
//   const videoData = state?.videoData;
//   const channelData = state?.channelData;
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current && videoData) {
//       videoRef.current.load();
//       videoRef.current.play();
//     }
//   }, [videoData]);

//   if (!videoData || !channelData) {
//     return (
//       <div className="h-screen w-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   console.log(`shortvideoopen`, channelData.profilePic);

//   return (
//     <main className="w-full h-screen flex">
//       <div className="w-[16%] h-full">
//         <LeftSidebar />
//       </div>

//       {/* Video Section */}
//       <div className="w-[84%] h-full overflow-y-scroll snap-y snap-mandatory scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent ">
//         {[1, 2, 3, 4].map((item) => (
//           <div
//             key={item}
//             className="w-full h-screen flex justify-center items-center snap-center"
//           >
//             <div className="w-[38%] h-[90%] rounded-xl flex">
//               <div className="h-full w-[80%] shadow-sm shadow-white rounded-xl">
//                 <div className="w-full relative h-full ">
//                   <video
//                     className="rounded-xl w-full h-full object-cover overflow-hidden"
//                     controls
//                   >
//                     <source src={videoData.ShortVideo} type="video/mp4" />
//                   </video>
//                   <div className="absolute bottom-20 left-6 flex flex-col gap-2">
//                     <div className="flex gap-2 items-center">
//                       <img
//                         src={channelData.profilePic}
//                         alt="channel icon"
//                         className="h-7 w-7 object-cover overflow-hidden rounded-full border "
//                       />
//                       <p className="text-xs font-semibold">
//                         {channelData.channelName}
//                       </p>
//                       <Button className="h-6 px-3 flex items-center justify-center gap-2 bg-white text-xs text-black hover:bg-zinc-700 rounded-full">
//                         subscribe
//                       </Button>
//                     </div>
//                     <p className="text-white text-[0.7rem] line-clamp-2 cursor-pointer">
//                       {videoData.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="h-full w-[15%] flex items-end">
//                 <div className="h-[70%] w-full flex justify-evenly items-center flex-col">
//                   {icons.map((item, index) => (
//                     <div
//                       key={index}
//                       className="h-10 w-10 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer text-xl  hover:bg-zinc-700"
//                     >
//                       {item.icon}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

import LeftSidebar from "@/components/LeftSidbar";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { PiShareFatThin } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux Hook

const icons = [
  { id: 1, icon: <AiOutlineLike />, name: "Likes" },
  { id: 2, icon: <AiOutlineDislike />, name: "Dislikes" },
  { id: 3, icon: <MdOutlineInsertComment />, name: "Comments" },
  { id: 4, icon: <PiShareFatThin />, name: "Share" },
  { id: 5, icon: <BsThreeDotsVertical />, name: "More" },
];

export default function ShortVideoOpen() {
  // Get channel and video data from Redux store
  const { ChannelsData } = useSelector((state) => state.ChannelsData);

  const videoRefs = useRef([]); // Store refs to the video elements
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
            setActiveVideo(video);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.75 } // Trigger when 75% of the video is visible
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [ChannelsData]); // Dependency on ChannelsData so it re-runs when data changes

  if (!ChannelsData || ChannelsData.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="w-full h-screen flex">
      <div className="w-[16%] h-full">
        <LeftSidebar />
      </div>

      {/* Video Section */}
      <div className="w-[84%] h-full overflow-y-scroll snap-y snap-mandatory scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {ChannelsData.map((channel, channelIndex) =>
          channel.ShortVideoId.map((video, index) => (
            <div
              key={`${channelIndex}-${video._id}-${index}`}
              className="w-full h-screen flex justify-center items-center snap-center"
            >
              <div className="w-[38%] h-[90%] rounded-xl flex pb-4">
                <div className="h-full w-[80%] shadow-sm shadow-white rounded-xl ">
                  <div className="w-full relative h-full">
                    <video
                      className="rounded-xl w-full h-full object-cover overflow-hidden"
                      controls
                      ref={(el) => (videoRefs.current[index] = el)}  
                    >
                      <source src={video.ShortVideo} type="video/mp4" />
                    </video>
                    <div className="absolute bottom-20 left-6 flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <img
                          src={channel.profilePic}
                          alt="channel icon"
                          className="h-7 w-7 object-cover overflow-hidden rounded-full border"
                        />
                        <p className="text-xs font-semibold">
                          {channel.channelName}
                        </p>
                        <Button className="h-6 px-3 flex items-center justify-center gap-2 bg-white text-xs text-black hover:bg-zinc-700 rounded-full">
                          subscribe
                        </Button>
                      </div>
                      <p className="text-white text-[0.7rem] line-clamp-2 cursor-pointer">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-full w-[15%] flex items-end">
                  <div className="h-[60%] w-full flex justify-evenly items-center flex-col">
                    {icons.map((icon, i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer text-xl hover:bg-zinc-700"
                      >
                        {icon.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
