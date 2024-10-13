import SignupDialog from "@/components/dialogBox/SignupDialog";
import LeftSidebar from "@/components/LeftSidbar";
import { RxCross1 } from "react-icons/rx";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import { SiYoutubeshorts } from "react-icons/si";
import { useSelector } from "react-redux";
export default function Home() {
  const { user } = useSelector((state) => state.userAuth);

  const shortVideoList = [1, 2, 3, 4, 5, 6];
  const longvideoList = [1, 2, 3, 4, 5, 6, 7, 8];

  const fetchYoutubeChannel = () => {};
  return (
    <div className="h-screen mt-20">
      <div className="flex flex-row h-full">
        <div className="w-[16%] h-full">
          <LeftSidebar />
        </div>

        <div className="w-[85%] h-full">
          {user ? (
            <main className="w-full h-full overflow-y-scroll pb-20 ">
              <div className="flex flex-wrap gap-3 p-1">
                {longvideoList.map((video, index) => {
                  return (
                    <div
                      key={index}
                      className=" h-60    cursor-pointer hover:bg-zinc-800 flex rounded-xl p-2 flex-col gap-2"
                      style={{ flexBasis: "calc(25% - 16px)" }}
                    >
                      <div>
                        <img
                          src="youtubethembel.jpg"
                          alt="logo"
                          className="rounded-xl w-full h-36 object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <img src="googlelogo.png" alt="icon" className="h-7" />
                        <span>
                          <p className="text-sm font-semibold">
                            5 Day solo Amazon Jungle survival | Not Food, Water,
                            or
                          </p>
                          <p className="text-normal font-semibold text-slate-400">
                            Xander Budnick
                          </p>
                          <p className="text-normal text-slate-400">
                            634K views • 1 year ago
                          </p>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="flex justify-between px-3 gap-3 items-center h-12 mt-6">
                  <div className="flex gap-2 items-center">
                    <span>
                      <SiYoutubeshorts className="text-xl text-red-600" />
                    </span>
                    <span>
                      <p className="text-sm font-semibold">SHorts</p>
                    </span>
                  </div>
                  <div>
                    <span className=" text-xl  h-9 w-9 p-1 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
                      <RxCross1 className="text-xl text-zinc-300" />
                    </span>
                  </div>
                </div>
                <div className="flex ">
                  {shortVideoList.map((video, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[12rem] h-[21rem]  p-2 hover:bg-zinc-700 rounded-xl transition duration-500 flex flex-col gap-2"
                      >
                        <div>
                          <img
                            src="youtubethembel.jpg"
                            alt="logo"
                            className="rounded-xl w-full h-60 object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-semibold flex justify-between ">
                            <span>
                              <p>5 Day solo Amazon Jungle survival or</p>
                            </span>
                            <span className=" text-xl  h-8 w-8 p-2 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
                              <BsThreeDotsVertical className="text-xl" />
                            </span>
                          </div>
                          <p className="text-normal text-slate-400">
                            634K views
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          ) : (
            <main className="flex w-5/6 h-full flex-col items-center gap-10">
              <div className="flex bg-zinc-900 h-20 w-1/2 flex-col items-center justify-center rounded-3xl">
                <span>
                  <p className="text-xl font-semibold">
                    Try searching to get started
                  </p>
                </span>
                <span>
                  <p className="text-zinc-400 text-sm">
                    Start watching videos to help us build a feed of videos
                    you'll love.
                  </p>
                </span>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
