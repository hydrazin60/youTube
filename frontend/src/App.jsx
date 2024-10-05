import React from "react";
import { Button } from "./components/ui/button";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
export default function App() {
  return (
    <div className="bg-zinc-900 text-white  w-screen h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
