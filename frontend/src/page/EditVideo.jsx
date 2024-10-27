import React from "react";
import { useLocation } from "react-router-dom";

export default function EditVideo() {
    const { state } = useLocation();
    const videoData = state?.videoData;
  return (
    <div>
      <p>hello video edit</p>
      <p>{videoData.title}</p>
    </div>
  );
}
