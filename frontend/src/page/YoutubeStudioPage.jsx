import { Input } from "@/components/ui/input";
import React from "react";
import { useParams } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";

import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { MdOutlineInsertComment } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FiDollarSign } from "react-icons/fi";
import { LiaFileAudio } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { BiCommentError } from "react-icons/bi";
import { icons } from "lucide-react";
import { TbLockOpenOff } from "react-icons/tb";

export default function YoutubeStudioPage() {
  const contentList = [
    {
      id: 1,
      name: "Videos",
    },
    {
      id: 2,
      name: "Shorts",
    },
    {
      id: 3,
      name: "Live",
    },
    {
      id: 4,
      name: "Post",
    },
    {
      id: 5,
      name: "Playlist",
    },
    {
      id: 6,
      name: "Podcasts",
    },
    {
      id: 7,
      name: "Promotions",
    },
  ];
  const YourChannelcontrollerIconsList = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      id: 2,
      name: "Content",
      icon: <MdOutlineVideoLibrary />,
    },
    {
      id: 3,
      name: "Analytics",
      icon: <MdOutlineAnalytics />,
    },
    {
      id: 4,
      name: "Comments",
      icon: <MdOutlineInsertComment />,
    },
    {
      id: 5,
      name: "Subtitles",
      icon: <MdOutlineSubtitles />,
    },
    {
      id: 6,
      name: "Copyright",
      icon: <AiOutlineCopyrightCircle />,
    },
    {
      id: 7,
      name: "Earn",
      icon: <FiDollarSign />,
    },
    {
      id: 8,
      name: "AUdio libary",
      icon: <LiaFileAudio />,
    },
    {
      id: 9,
      name: "Settings",
      icon: <IoSettingsOutline />,
    },
    {
      id: 10,
      name: "Send feedback",
      icon: <BiCommentError />,
    },
  ];
  const { id } = useParams();
  return (
    <main className="h-screen w-screen bg-zinc-800  mt-auto">
      <div className="h-full w-full flex">
        <div className="h-full w-[16%] py-4 bg-zinc-800  border-r border-zinc-600 flex justify-center flex-col gap-2">
          <div className="px-12">
            <span>
              <img
                src="https://scontent.fktm21-1.fna.fbcdn.net/v/t1.6435-9/124430192_112731063979533_9176685090302778504_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=oMkvQ9jWRHkQ7kNvgG8aBb3&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AkyAlgsuFR2lgqGiTX9X-Dv&oh=00_AYCkn_4iP_KX1-bbpyvmk-PzwlSjO7Nqji5SEUg2oYyovg&oe=6731FC1B"
                alt="logo"
                className="w-24 h-24 rounded-full"
              />
            </span>
            <span className=" flex items-center flex-col ">
              <p className=" font-semibold">Your channel</p>
              <p className="text-sm text-zinc-400">+2Helper</p>
            </span>
          </div>
          <div className="flex flex-col h-full  ">
            {YourChannelcontrollerIconsList.map((item) => {
              return (
                <div key={item.id}>
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 hover:bg-black rounded-md pl-4"
                  >
                    <>
                      <span className="text-zinc-100 text-xl">{item.icon}</span>
                      <span className="text-[0.8rem] font-semibold   text-zinc-400">
                        {item.name}
                      </span>
                    </>
                  </div>
                  {item.id === 8 ? (
                    <div className="h-[1px] w-full bg-zinc-600 my-1"></div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-full w-[85%] bg-zinc-800 flex flex-col">
          <div className="h-[14%] w-full border-b border-zinc-600 flex flex-col gap-5 p-4">
            <div>
              <h1 className="text-xl font-semibold"> Channel content</h1>
            </div>
            <div className="flex flex-row h-auto items-center w-full outline-none justify-center">
              {contentList.map((item) => {
                return (
                  <div
                    className="flex flex-row items-center gap-2 cursor-pointer w-full "
                    key={item.id}
                  >
                    <span className="text-[0.8rem] font-semibold hover:border-b-2 hover:border-zinc-500 text-zinc-400">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row h-auto items-center w-full outline-none justify-center border-b border-zinc-600 px-5">
            <span className="flex flex-row items-center gap-4">
              <IoFilterSharp className="text-md text-zinc-400" />
              <p className="text-[0.8rem] text-zinc-400">Filter</p>
            </span>
            <Input className="bg-zinc-800 border-none" />
          </div>
          <div>
            <div className="overflow-x-auto ">
              <table className="table-auto w-full text-left text-sm text-gray-500 overflow-x-scroll ">
                <thead className="border-b border-zinc-600">
                  <tr>
                    <th className="text-[0.7rem]  text-zinc-400 font-medium px-20 py-2">
                      Video
                    </th>
                    <th className="text-[0.7rem]  v text-zinc-400 font-medium px-4 py-2">
                      Visibility
                    </th>
                    <th className=" text-[0.7rem]  text-zinc-400 font-medium px-4 py-2">
                      Restrictions
                    </th>
                    <th className=" text-[0.7rem]   text-zinc-400 font-medium px-4 py-2 flex items-center gap-1">
                      <p>Date</p> <FaArrowDown className="text-zinc-400" />
                    </th>
                    <th className="text-[0.7rem]  text-zinc-400 font-medium px-4 py-2">
                      Views
                    </th>
                    <th className=" text-[0.7rem]   text-zinc-400 font-medium px-4 py-2">
                      Comments
                    </th>
                    <th className=" text-[0.7rem]   text-zinc-400 font-medium px-4 py-2">
                      Like(vs dislikes)
                    </th>
                  </tr>
                </thead>
                <tbody className="border-b border-zinc-600 hover:bg-black">
                  <tr>
                    <th className="text-xs  text-zinc-400 font-medium px-7 py-2 ">
                      <div className="pl-8 flex flex-row gap-2 ">
                        <span>
                          <img
                            src="https://www.pixelstalk.net/wp-content/uploads/2016/06/Nature-Wallpaper.jpg"
                            alt="image"
                            className=" w-28 h-16 rounded-md object-cover object-center overflow-hidden"
                          />
                        </span>
                        <span className="flex flex-col">
                          <p className="text-xs text-white">
                            my first youtube video
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            hello world description
                          </p>
                        </span>
                      </div>
                    </th>
                    <th className="px-4 py-2">
                      <div className="flex flex-row gap-2 items-center ">
                        {/* <MdOutlineLock className="text-sm text-white" /> */}
                        <TbLockOpenOff className="text-sm text-white" />
                        <p className=" text-[.7rem] text-white  font-normal">
                          Public
                        </p>
                      </div>
                    </th>
                    <th className="px-4 py-2">
                      <div>
                        <p className=" text-[.7rem] font-normal text-white">
                          Made for Kids
                        </p>
                      </div>
                    </th>
                    <th className="px-2 py-2">
                      <div className="flex flex-col  items-center">
                        <p className=" text-[.7rem] text-white  font-normal">
                          october 12, 2024
                        </p>
                        <p className="text-[0.6rem] text-zinc-400  font-normal">
                          Uploaded
                        </p>
                      </div>
                    </th>
                    <th className="px-5 py-2">
                      <div>
                        <p className=" text-[.7rem] text-white  font-normal">
                          10
                        </p>
                      </div>
                    </th>
                    <th className="px-8 py-2">
                      <div>
                        <p className=" text-[.7rem] text-white  font-normal">
                          6
                        </p>
                      </div>
                    </th>
                    <th className=" py-2">
                      <div className="flex flex-col items-center">
                        <p className="text-[.7rem] text-white  font-normal">
                          10
                        </p>
                        <p className="text-[0.6rem] text-zinc-400  font-normal">
                          Likes
                        </p>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
