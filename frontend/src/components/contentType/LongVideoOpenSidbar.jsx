import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineHistory } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function LongVideoOpenSidbar() {
  const { ChannelsData } = useSelector((state) => state.ChannelsData);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full relative flex flex-col gap-2">
      {ChannelsData?.map((channel, index) => {
        return channel.LongVideoId?.map((video, Videoindex) => {
          return (
            <div
              className="flex w-full  flex-row justify-between  rounded-xl"
              key={Videoindex}
              onClick={() =>
                navigate(`/video/watch/${video._id}`, {
                  state: { videoData: video, channelData: channel },
                })
              }
            >
              <div className="rounded-lg overflow-hidden cursor-pointer flex w-full h-full justify-between gap-2 ">
                <div className="  w-[55%] ">
                  <img
                    src={video.thumbnail}
                    className="rounded-lg w-full h-24 object-cover overflow-hidden"
                    controls
                  ></img>
                </div>
                <div className="  w-[45%]">
                  <div className="w-full">
                    <p className="text-[0.7rem] font-bold flex-wrap line-clamp-2 ">
                      {video.title}
                    </p>
                    <p className="text-[0.6rem] font-semibold text-zinc-400">
                      {channel.channelName}
                    </p>
                    <p className="text-[0.6rem] text-zinc-400">
                      634K views • 1 year ago
                    </p>
                  </div>
                </div>
                <div>
                  <BsThreeDotsVertical className="text-zinc-400 text-sm" />
                </div>
              </div>
              <div className=" absolute  hover:bg-zinc-950 opacity-70 w-[50%] h-24 rounded-lg   z-40 flex-col   p-1 pb-4 "></div>
            </div>
          );
        });
      })}
    </div>
  );
}
