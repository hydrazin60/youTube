import React from "react";
import LeftSidbar from "./LeftSidbar";

export default function Signup() {
  return (
    <div className="h-screen">
      <div className="flex flex-row h-full">
        <div className="w-1/6 bg-yellow-500 h-full">
          <LeftSidbar />
        </div>
        <div className="flex bg-blue-600 w-5/6 h-full">right side home page</div>
      </div>
    </div>
  );
}
 