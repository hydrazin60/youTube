import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import SignIn from "./page/SignIn";
import YoutubeStudioPage from "./page/YoutubeStudioPage";
import LongVideoOpen from "./page/LongVideoOpen";

export default function App() {
  return (
    <div className="bg-zinc-950 text-white  w-screen h-screen  fixed ">
      <BrowserRouter>
        <Navbar />
        <div className="mt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/youtube-studio/:id" element={<YoutubeStudioPage />} />
            <Route path="/video/watch/:id" element={<LongVideoOpen />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
