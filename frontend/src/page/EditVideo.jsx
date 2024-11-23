import React from "react";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditVideo() {
  const { state } = useLocation();
  const videoData = state?.videoData;
  return (
    <div className="min-h-screen min-w-full bg-red-500 flex justify-center items-center ">
      <div className="min-h-[80vh] min-w-[30vw] bg-black  flex flex-col items-center  ">
        <div className="w-full border-b border-gray-400 h-12 flex justify-between items-center p-4">
          <span>
            <p className="text-lg font-semibold">EDIT Video</p>
          </span>
          <span className=" p-1 flex items-center justify-center bg-zinc-600 rounded-full">
            <IoMdClose className="text-white h-5 w-5" />
          </span>
        </div>
        <div className="bg-green-500 min-h-[80vh] p-3 w-full flex flex-col gap-3">
          <div className="max-h-40 max-w-40 min-h-28 min-w-24 rounded-full bg-white">
            <input type="file" className="hidden" />
          </div>
          <div className="max-h-40 max-w-40 min-h-28 min-w-24 rounded-full bg-white">
            <Input
              type="file"
              placeholder="Enter video title"
              className="hidden"
            />
          </div>
          <div>
            <Input type="text" placeholder="Enter video title" />
            <Input type="text" placeholder="Enter video title" />
            <Input type="text" placeholder="Enter video title" />
          </div>
          <div>
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
