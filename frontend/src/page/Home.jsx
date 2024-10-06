import SignupDialog from "@/components/dialogBox/SignupDialog";
import LeftSidebar from "@/components/LeftSidbar";
import React from "react";

export default function Home() {
  return (
    <div className="h-screen mt-12 ">
      <div className="flex flex-row h-full">
        <div className="w-1/6  h-full">
          <LeftSidebar />
        </div>
        <div className="flex w-5/6 h-full flex-col items-center gap-10">
          <div className="flex bg-zinc-900 h-20 w-1/2 flex-col items-center justify-center rounded-3xl ">
            <span>
              <p className="text-xl font-semibold">
                Try searching to get started
              </p>
            </span>
            <span>
              <p className="text-zinc-400 text-sm">
                Start watching videos to help us build a feed of videos you'll
                love.
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
