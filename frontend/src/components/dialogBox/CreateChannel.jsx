import React from "react";
import { CiYoutube } from "react-icons/ci";
import { HiOutlineSignal } from "react-icons/hi2";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateChannel({ open, setOpen }) {
  const { user } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  return (
    <main
      className={`h-22 w-40 bg-zinc-800 rounded-lg py-1 ${
        open ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-1 cursor-pointer">
        <div
          className="flex flex-row items-center gap-3 hover:bg-zinc-700 w-full py-1 px-3"
          onClick={() => navigate(`/youtube-studio/${user._id}`)}  
        >
          <span className="text-lg">
            <CiYoutube />
          </span>
          <span className="text-sm">
            <p>Upload Video</p>
          </span>
        </div>
        <div className="flex flex-row items-center gap-3 hover:bg-zinc-700 w-full py-1 px-3">
          <span className="text-lg">
            <HiOutlineSignal />
          </span>
          <span className="text-sm">
            <p>Start Live</p>
          </span>
        </div>
        <div className="flex flex-row items-center gap-3 hover:bg-zinc-700 w-full py-1 px-3">
          <span className="text-md">
            <TfiWrite />
          </span>
          <span className="text-sm">
            <p>Create Post</p>
          </span>
        </div>
      </div>
    </main>
  );
}

// import React from "react";
// import { CiYoutube } from "react-icons/ci";
// import { HiOutlineSignal } from "react-icons/hi2";
// import { TfiWrite } from "react-icons/tfi";
// import UploadVideo from "./UploadVideo";
// import StartLive from "./StartLive";
// import CreatePost from "./CreatePost";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function CreateChannel({ open, setOpen }) {
//   const { user } = useSelector((state) => state.userAuth);
//   const navigate = useNavigate();
//   return (
//     <main
//       className={`h-22 w-40 bg-zinc-800 rounded-lg py-1 ${
//         open ? "" : "hidden"
//       } `}
//     >
//       <div className="flex flex-col gap-1 cursor-pointer">
//         <div
//           className="flex flex-row items-center  gap-3 hover:bg-zinc-700 w-full py-1 px-3 "
//           onClick={() =>  navigate(`/youtube_studio/${user._id}`)}
//         >
//           <span className="text-lg">
//             <CiYoutube />
//           </span>

//           <span className="text-sm">
//             <p> Upload Video</p>
//           </span>
//         </div>
//         <div className="flex flex-row items-center  gap-3 hover:bg-zinc-700 w-full py-1 px-3 ">
//           <span className="text-lg">
//             <HiOutlineSignal />
//           </span>
//           <span className="text-sm">
//             <p>Start Live</p>
//           </span>
//         </div>
//         <div className="flex flex-row items-center  gap-3 hover:bg-zinc-700 w-full py-1 px-3 ">
//           <span className="text-md">
//             <TfiWrite />
//           </span>
//           <span className="text-sm">
//             <p>Create Post</p>
//           </span>
//         </div>
//       </div>
//     </main>
//   );
// }
