import React from "react";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import {
  MdSubscriptions,
  MdOndemandVideo,
  MdMusicNote,
  MdFeedback,
} from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import {
  FaFireAlt,
  FaYoutube,
  FaRegFlag,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { SiYoutubegaming, SiYoutubemusic, SiYoutubekids } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function LeftSidebar() {
  const leftSidebariconsFirst = [
    { icon: <IoMdHome className="text-2xl" />, title: "Home", id: 1 },
    { icon: <SiYoutubeshorts className="text-2xl" />, title: "Shorts", id: 2 },
    {
      icon: <MdSubscriptions className="text-2xl" />,
      title: "Subscriptions",
      id: 3,
    },
  ];

  const leftSidebariconsSecond = [
    { icon: <MdOndemandVideo className="text-2xl" />, title: "You", id: 4 },
    { icon: <LuHistory className="text-2xl" />, title: "History", id: 5 },
  ];

  const leftSidebariconsThird = [
    { icon: <FaFireAlt className="text-2xl" />, title: "Trending", id: 6 },
    { icon: <MdMusicNote className="text-2xl" />, title: "Music", id: 7 },
    { icon: <SiYoutubegaming className="text-2xl" />, title: "Gaming", id: 8 },
    { icon: <CiTrophy className="text-2xl" />, title: "Sports", id: 9 },
  ];

  const leftSidebariconsFourth = [
    {
      icon: <FaYoutube className="text-2xl text-red-600" />,
      title: "YouTube Premium",
      id: 10,
    },
    {
      icon: <SiYoutubemusic className="text-2xl text-red-600" />,
      title: "YouTube Music",
      id: 11,
    },
    {
      icon: <SiYoutubekids className="text-2xl text-red-600" />,
      title: "YouTube Kids",
      id: 12,
    },
  ];

  const LeftSidbarIconsFive = [
    {
      icon: <IoSettingsOutline className="text-2xl" />,
      title: "Settings",
      id: 13,
    },
    {
      icon: <FaRegFlag className="text-2xl" />,
      title: "Report history",
      id: 14,
    },
    {
      icon: <FaRegQuestionCircle className="text-2xl" />,
      title: "Help",
      id: 15,
    },
    {
      icon: <MdFeedback className="text-2xl" />,
      title: "Send feedback",
      id: 16,
    },
  ];
  const navigate = useNavigate(); // Corrected the hook usage

  return (
    <div className="left-sidebar h-screen overflow-y-auto pb-10 ">
      <div className="pl-2 border-b border-gray-600 py-3">
        <ul>
          {leftSidebariconsFirst.map((item) => (
            <li
              key={item.id}
              className="text-xs w-[90%] text-gray-200 flex flex-row items-center gap-2 px-4 py-2 hover:bg-zinc-800 hover:rounded-xl cursor-pointer"
            >
              {item.icon} {item.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 border-b border-gray-600 py-3">
        <ul>
          {leftSidebariconsSecond.map((item) => (
            <li
              key={item.id}
              className="text-xs w-[90%] text-gray-200 flex flex-row items-center gap-2 px-4 py-2 hover:bg-zinc-800 hover:rounded-xl cursor-pointer"
            >
              {item.icon} {item.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 border-b border-gray-600 py-3 flex flex-col gap-3">
        <span className="text-xs">
          <p>
            Sign in to like videos,
            <br /> comment, and subscribe.
          </p>
        </span>

        <span className="rounded-full">
          <Button
            className="h-6 py-3 rounded-full flex items-center justify-between gap-1 border border-zinc-500 px-3 hover:bg-slate-700"
            onClick={() => navigate("sign-in")}
          >
            <CgProfile className="text-lg  text-blue-600" />
            <p className="text-xs text-blue-600">Sign in</p>
          </Button>
        </span>
      </div>

      <div className="px-4 border-b border-gray-600 py-3">
        <p className="pl-3 text-lg text-gray-200">Explore</p>
        <ul>
          {leftSidebariconsThird.map((item) => (
            <li
              key={item.id}
              className="text-xs text-gray-200 flex flex-row items-center gap-2 py-2 px-4 hover:bg-zinc-800 hover:rounded-xl cursor-pointer"
            >
              {item.icon} {item.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 border-b border-gray-600 py-3">
        <p className="pl-3 text-lg text-gray-200">More from YouTube</p>
        <ul>
          {leftSidebariconsFourth.map((item) => (
            <li
              key={item.id}
              className="text-xs text-gray-200 flex flex-row items-center gap-2 py-2 px-4 hover:bg-zinc-800 hover:rounded-xl cursor-pointer"
            >
              {item.icon} {item.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 border-b border-gray-600 py-3">
        <ul>
          {LeftSidbarIconsFive.map((item) => (
            <li
              key={item.id}
              className="text-xs text-gray-200 flex flex-row items-center gap-2 py-2 px-4 hover:bg-zinc-800 hover:rounded-xl cursor-pointer"
            >
              {item.icon} {item.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 border-b border-gray-600 py-3 flex flex-col text-start gap-4 ">
        <span>
          <p className="text-xs text-gray-400">
            AboutPressCopyrightContact usCreatorsAdvertiseDevelopers
          </p>
        </span>
        <span>
          <p className="text-xs text-gray-400">
            TermsPrivacyPolicy & SafetyHow YouTube worksTest new features
          </p>
        </span>
        <span>
          <p className="text-xs text-gray-500">© 2024 Google LLC</p>
        </span>
      </div>
    </div>
  );
}
