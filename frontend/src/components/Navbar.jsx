// import React from "react";
// import { BsYoutube } from "react-icons/bs";
// import { IoMenuOutline } from "react-icons/io5";
// import { Input } from "./ui/input";
// import { IoSearch } from "react-icons/io5";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { Button } from "./ui/button";
// import { CgProfile } from "react-icons/cg";
// export default function Navbar() {
//   return (
//     <div className=" bg-zinc-950 w-screen h-12 fixed top-0 flex items-center">
//       <div className="px-4 flex flex-row w-full justify-between">
//         <div className="flex flex-row gap-4 cursor-pointer">
//           <span className="text-2xl h-8 w-8 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
//             <IoMenuOutline />
//           </span>
//           <span className="flex flex-row items-center gap-1">
//             <BsYoutube className="text-2xl text-red-600   " />
//             <p className="text-xl " style={{ fontWeight: 400 }}>
//               YouTube
//             </p>
//           </span>
//         </div>
//         <div className="flex flex-row h-8 w-96 rounded-full items-center     ">
//           <span>
//             {/* <Input
//               type="text"
//               placeholder="Search"
//               icon={<IoSearch />}
//               className="  h-8  w-96 rounded-l-full bg-zinc-900 border border-zinc-500 px-3 text-white placeholder-white focus:outline-none focus:border-transparent"
//             /> */}
//             <Input
//               type="text"
//               placeholder="Search"
//               icon={<IoSearch />}
//               className="h-8 w-96 rounded-l-full bg-zinc-900 border border-zinc-500 px-3 text-white placeholder-white focus:outline-none focus:border-transparent"
//             />
//           </span>
//           <span className="h-8 bg-zinc-800  p-1 flex items-center px-3 rounded-r-full  border-t border-r border-b border-zinc-500 ">
//             <IoSearch className="text-xl" />
//           </span>
//         </div>
//         <div className="flex flex-row items-center justify-between gap-6 ">
//           <span className="cursor-pointer flex items-center justify-center">
//             <BsThreeDotsVertical />
//           </span>
//           <span className=" rounded-full  ">
//             <Button className=" h-7 rounded-full flex items-center justify-between gap-1 border border-zinc-500 px-3 hover:bg-slate-700">
//               <CgProfile className="text-xl" /> <p>Sign in</p>
//             </Button>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { BsYoutube } from "react-icons/bs";
import { IoMenuOutline, IoSearch } from "react-icons/io5";
import { Input } from "./ui/input"; // Custom Input component
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "./ui/button";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  return (
    <div className=" bg-zinc-950 w-screen h-12 fixed top-0 flex items-center">
      <div className="px-4 flex flex-row w-full justify-between">
        <div className="flex flex-row gap-4 cursor-pointer">
          <span className="text-2xl h-8 w-8 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
            <IoMenuOutline />
          </span>
          <span className="flex flex-row items-center gap-1">
            <BsYoutube className="text-2xl text-red-600" />
            <p className="text-xl" style={{ fontWeight: 400 }}>
              YouTube
            </p>
          </span>
        </div>
        <div className="flex flex-row h-8 w-96 rounded-full items-center">
          <span>
            <Input
              type="text"
              placeholder="Search"
              className="h-8 w-96 rounded-l-full bg-zinc-900 border border-zinc-500 px-3 text-white placeholder-white focus:outline-none focus:border-blue-500"
            />
          </span>
          <span className="h-8 bg-zinc-800 p-1 flex items-center px-3 rounded-r-full border-t border-r border-b border-zinc-500">
            <IoSearch className="text-xl" />
          </span>
        </div>
        <div className="flex flex-row items-center justify-between gap-6">
          <span className="cursor-pointer flex items-center justify-center">
            <BsThreeDotsVertical />
          </span>
          <span className="rounded-full">
            <Button className="h-7 rounded-full flex items-center justify-between gap-1 border border-zinc-500 px-3 hover:bg-slate-700">
              <CgProfile className="text-xl" /> <p>Sign in</p>
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
