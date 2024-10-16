import React from "react";
import { BsYoutube } from "react-icons/bs";
import { IoMenuOutline, IoSearch } from "react-icons/io5";
import { Input } from "./ui/input";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "./ui/button";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import ProfileOpen from "./dialogBox/ProfileOpen";
import CreateChannel from "./dialogBox/CreateChannel";

export default function Navbar() {
  const youtubeTag = [
    { id: 1, tag: "Trending" },
    { id: 2, tag: "Music" },
    { id: 3, tag: "Gaming" },
    { id: 4, tag: "News" },
    { id: 5, tag: "Live" },
    { id: 6, tag: "Sports" },
    { id: 7, tag: "Learning" },
    { id: 8, tag: "Movies" },
    { id: 9, tag: "Fashion" },
    { id: 10, tag: "Travel" },
    { id: 11, tag: "Technology" },
    { id: 12, tag: "Comedy" },
    { id: 13, tag: "Entertainment" },
    { id: 14, tag: "How-to" },
    { id: 15, tag: "Science" },
    { id: 16, tag: "Food" },
    { id: 17, tag: "Health" },
    { id: 18, tag: "Lifestyle" },
    { id: 19, tag: "DIY" },
    { id: 20, tag: "Vlogs" },
    { id: 21, tag: "Podcasts" },
  ];

  const { user } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const [OpenProfileDialog, setOpenProfileDialog] = React.useState(false);
  const [OpenCreateChannel, setOpenCreateChannel] = React.useState(false);
  const isYoutubeStudioPage = location.pathname === "/";

  return (
    <>
      <div className=" bg-zinc-950 w-screen h-auto fixed top-1 flex flex-col items-end gap-3 pr-4">
        <div className="px-4 flex flex-row w-full justify-between -inset-10">
          <div className="flex flex-row gap-4 cursor-pointer">
            <span className="text-xl h-8 w-8 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
              <IoMenuOutline />
            </span>
            <span
              className="flex flex-row items-center gap-1"
              onClick={() => navigate("/")}
            >
              <BsYoutube className="text-xl text-red-600" />
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
          <div className="flex flex-row items-center justify-between gap-6 relative">
            {user ? (
              <>
                <span
                  className="rounded-full cursor-pointer"
                  onClick={() => setOpenCreateChannel(!OpenCreateChannel)}
                >
                  <MdOutlineVideoCall className="text-xl text-white cursor-pointer" />
                </span>
                <span className="rounded-full cursor-pointer">
                  <IoMdNotificationsOutline className="text-xl cursor-pointer" />
                  <span className="bg-red-700 h-3 w-5 absolute bottom-4 right-10 rounded-full flex items-center justify-center text-[10px] font-semibold">
                    9+
                  </span>
                </span>
              </>
            ) : (
              <span className="cursor-pointer flex items-center justify-center">
                <BsThreeDotsVertical />
              </span>
            )}
            <span className="rounded-full cursor-pointer">
              {user ? (
                <div className="relative">
                  {user.channelId.profilePic ? (
                    <div
                      onClick={() => setOpenProfileDialog(!OpenProfileDialog)}
                    >
                      <img
                        src={user.channelId.profilePic}
                        alt="profile"
                        className="h-8 w-8 rounded-full object-cover overflow-hidden cursor-pointer "
                      />
                    </div>
                  ) : (
                    <div
                      className="h-6 w-6 p-2 rounded-full bg-blue-800 flex items-center justify-center"
                      onClick={() => setOpenProfileDialog(!OpenProfileDialog)}
                    >
                      <p className="text-xs font-semibold text-blue-100">
                        {user?.name[0] + user?.name[1]}
                      </p>
                    </div>
                  )}
                  <span className="z-10 absolute -right-4">
                    <ProfileOpen
                      open={OpenProfileDialog}
                      setOpen={setOpenProfileDialog}
                    />
                  </span>
                  <span className="z-10 absolute -right-7">
                    <CreateChannel
                      open={OpenCreateChannel}
                      setOpen={setOpenCreateChannel}
                    />
                  </span>
                </div>
              ) : (
                <span className="rounded-full">
                  <Button
                    className="h-7 rounded-full flex items-center justify-between gap-1 border border-zinc-500 px-2 hover:bg-slate-600"
                    onClick={() => navigate("/sign-in")}
                  >
                    <CgProfile className="text-xl" /> <p>Sign in</p>
                  </Button>
                </span>
              )}
            </span>
          </div>
        </div>
        {user && isYoutubeStudioPage ? (
          <div className="w-[83.5%] overflow-x-auto hide-scrollbar whitespace-nowrap flex items-center">
            {youtubeTag.map((tag) => (
              <span
                key={tag.id}
                className="text-white font-semibold text-normal px-2 py-2"
              >
                <p className="h-6 bg-zinc-800 px-4 text-normal rounded-normal hover:bg-zinc-700 cursor-pointer flex items-center">
                  {tag.tag}
                </p>
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
// import React from "react";
// import { BsYoutube } from "react-icons/bs";
// import { IoMenuOutline, IoSearch } from "react-icons/io5";
// import { Input } from "./ui/input"; // Custom Input component
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { Button } from "./ui/button";
// import { CgProfile } from "react-icons/cg";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { MdOutlineVideoCall } from "react-icons/md";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import ProfileOpen from "./dialogBox/ProfileOpen";
// import CreateChannel from "./dialogBox/CreateChannel";
// import SignupDialog from "./dialogBox/SignupDialog";

// export default function Navbar() {
//   const youtubeTag = [
//     { id: 1, tag: "Trending" },
//     { id: 2, tag: "Music" },
//     { id: 3, tag: "Gaming" },
//     { id: 4, tag: "News" },
//     { id: 5, tag: "Live" },
//     { id: 6, tag: "Sports" },
//     { id: 7, tag: "Learning" },
//     { id: 8, tag: "Movies" },
//     { id: 9, tag: "Fashion" },
//     { id: 10, tag: "Travel" },
//     { id: 11, tag: "Technology" },
//     { id: 12, tag: "Comedy" },
//     { id: 13, tag: "Entertainment" },
//     { id: 14, tag: "How-to" },
//     { id: 15, tag: "Science" },
//     { id: 16, tag: "Food" },
//     { id: 17, tag: "Health" },
//     { id: 18, tag: "Lifestyle" },
//     { id: 19, tag: "DIY" },
//     { id: 20, tag: "Vlogs" },
//     { id: 21, tag: "Podcasts" },
//   ];

//   const { user } = useSelector((state) => state.userAuth);
//   const navigate = useNavigate();
//   const [OpenProfileDialog, setOpenProfileDialog] = React.useState(false);
//   const [OpenCreateChannel, setOpenCreateChannel] = React.useState(false);
//   return (
//     <>
//       <div className=" bg-zinc-950 w-screen h-auto  fixed  top-1 flex flex-col items-end gap-3  pr-4">
//         <div className="px-4 flex flex-row w-full justify-between -inset-10">
//           <div className="flex flex-row gap-4 cursor-pointer">
//             <span className="text-xl h-8 w-8 rounded-full hover:bg-zinc-800 cursor-pointer flex items-center justify-center">
//               <IoMenuOutline />
//             </span>
//             <span
//               className="flex flex-row items-center gap-1"
//               onClick={() => navigate("/")}
//             >
//               <BsYoutube className="text-xl text-red-600" />
//               <p className="text-xl" style={{ fontWeight: 400 }}>
//                 YouTube
//               </p>
//             </span>
//           </div>
//           <div className="flex flex-row h-8 w-96 rounded-full items-center">
//             <span>
//               <Input
//                 type="text"
//                 placeholder="Search"
//                 className="h-8 w-96 rounded-l-full bg-zinc-900 border border-zinc-500 px-3 text-white placeholder-white focus:outline-none focus:border-blue-500"
//               />
//             </span>
//             <span className="h-8 bg-zinc-800 p-1 flex items-center px-3 rounded-r-full border-t border-r border-b border-zinc-500">
//               <IoSearch className="text-xl" />
//             </span>
//           </div>
//           <div className="flex flex-row items-center justify-between gap-6 relative ">
//             {user ? (
//               <>
//                 <span
//                   className="rounded-full cursor-pointer"
//                   onClick={() => setOpenCreateChannel(!OpenCreateChannel)}
//                 >
//                   <MdOutlineVideoCall className="text-xl text-white  cursor-pointer" />
//                 </span>
//                 <span className="rounded-full cursor-pointer ">
//                   <IoMdNotificationsOutline className="text-xl  cursor-pointer  " />
//                   <span className="bg-red-700 h-3 w-5 absolute bottom-4 right-10   rounded-full flex items-center justify-center text-[10px] font-semibold ">
//                     9+
//                   </span>
//                 </span>
//               </>
//             ) : (
//               <span className="cursor-pointer flex items-center justify-center">
//                 <BsThreeDotsVertical />
//               </span>
//             )}
//             <span className="rounded-full cursor-pointer">
//               {user ? (
//                 <div className="relative">
//                   {user?.profilePic ? (
//                     <div
//                       onClick={() => setOpenProfileDialog(!OpenProfileDialog)}
//                     >
//                       <img
//                         src={user?.profilePicture}
//                         alt="profile"
//                         className="h-8 w-8 rounded-full"
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className=" h-6 w-6 p-2 rounded-full bg-blue-800 flex items-center justify-center"
//                       onClick={() => setOpenProfileDialog(!OpenProfileDialog)}
//                     >
//                       <p className="text-xs font-semibold text-blue-100">
//                         {user?.name[0] + user?.name[1]}
//                       </p>
//                     </div>
//                   )}
//                   <span className="z-10 absolute -right-4  ">
//                     <ProfileOpen
//                       open={OpenProfileDialog}
//                       setOpen={setOpenProfileDialog}
//                     />
//                   </span>
//                   <span className="z-10 absolute -right-7">
//                     <CreateChannel
//                       open={OpenCreateChannel}
//                       setOpen={setOpenCreateChannel}
//                     />
//                   </span>
//                 </div>
//               ) : (
//                 <span className="rounded-full">
//                   <Button
//                     className="h-7 rounded-full flex items-center justify-between gap-1 border border-zinc-500 px-2 hover:bg-slate-600"
//                     onClick={() => navigate("/sign-in")}
//                   >
//                     <CgProfile className="text-xl" /> <p>Sign in</p>
//                   </Button>
//                 </span>
//               )}
//             </span>
//           </div>
//         </div>
//         {user  ? (
//           <div className=" w-[83.5%] overflow-x-auto hide-scrollbar whitespace-nowrap flex items-center">
//             {youtubeTag.map((tag) => {
//               return (
//                 <span
//                   key={tag.id}
//                   className="text-white font-semibold text-normal px-2 py-2"
//                 >
//                   <p className="h-6 bg-zinc-800 px-4 text-normal rounded-normal hover:bg-zinc-700 cursor-pointer flex items-center">
//                     {tag.tag}
//                   </p>
//                 </span>
//               );
//             })}
//           </div>
//         ) : (
//           ""
//         )}
//       </div>
//     </>
//   );
// }
