import React from "react";
import { CiYoutube } from "react-icons/ci";
import { HiOutlineSignal } from "react-icons/hi2";
import { TfiWrite } from "react-icons/tfi";
import UploadVideo from "./UploadVideo";
import StartLive from "./StartLive";
import CreatePost from "./CreatePost";

export default function CreateChannel({ open, setOpen }) {
  return (
    <main
      className={`h-22 w-40 bg-zinc-800 rounded-lg py-1 ${
        open ? "" : "hidden"
      } `}
    >
      <div className="flex flex-col gap-1 cursor-pointer">
        <div className="flex flex-row items-center  gap-3 hover:bg-zinc-700 w-full py-1 px-3 ">
          <span className="text-lg">
            <CiYoutube />
          </span>
          <span className="text-sm">
            <UploadVideo />
          </span>
        </div>
        <div className="flex flex-row items-center  gap-3 hover:bg-zinc-700 w-full py-1 px-3 ">
          <span className="text-lg">
            <HiOutlineSignal />
          </span>
          <span className="text-sm">
            <StartLive />
          </span>
        </div>
        <div className="flex flex-row items-center  gap-3 hover:bg-zinc-700 w-full py-1 px-3 ">
          <span className="text-md">
            <TfiWrite />
          </span>
          <span className="text-sm">
            <CreatePost />
          </span>
        </div>
      </div>
    </main>
  );
}
