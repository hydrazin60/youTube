import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { MdOutlineInsertComment } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FiDollarSign } from "react-icons/fi";
import { LiaFileAudio } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { BiCommentError } from "react-icons/bi";
import { icons } from "lucide-react";
import { TbLockOpenOff } from "react-icons/tb";
import axios from "axios";
import { toast } from "sonner";
import { MdLockOutline } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { TbShare3 } from "react-icons/tb";

export default function YoutubeStudioPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userAuth);
  const contentList = [
    {
      id: 1,
      name: "Videos",
    },
    {
      id: 2,
      name: "Shorts",
    },
    {
      id: 3,
      name: "Live",
    },
    {
      id: 4,
      name: "Post",
    },
    {
      id: 5,
      name: "Playlist",
    },
    {
      id: 6,
      name: "Podcasts",
    },
    {
      id: 7,
      name: "Promotions",
    },
  ];
  const YourChannelcontrollerIconsList = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      id: 2,
      name: "Content",
      icon: <MdOutlineVideoLibrary />,
    },
    {
      id: 3,
      name: "Analytics",
      icon: <MdOutlineAnalytics />,
    },
    {
      id: 4,
      name: "Comments",
      icon: <MdOutlineInsertComment />,
    },
    {
      id: 5,
      name: "Subtitles",
      icon: <MdOutlineSubtitles />,
    },
    {
      id: 6,
      name: "Copyright",
      icon: <AiOutlineCopyrightCircle />,
    },
    {
      id: 7,
      name: "Earn",
      icon: <FiDollarSign />,
    },
    {
      id: 8,
      name: "AUdio libary",
      icon: <LiaFileAudio />,
    },
    {
      id: 9,
      name: "Settings",
      icon: <IoSettingsOutline />,
    },
    {
      id: 10,
      name: "Send feedback",
      icon: <BiCommentError />,
    },
  ];
  const { id } = useParams();
  const [ownChannelData, setOwnChannelData] = React.useState([]);
  const [loading, setLoding] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [video, setVideo] = React.useState(true);
  const [ChoseContentList, setChoseContentList] = React.useState(1);
  const [openVideomenu, setOpenVideomenu] = React.useState(false);
  const [openVideomenuId, setOpenVideomenuId] = React.useState(null);
  const [ChoseContentListName, setChoseContentListName] =
    React.useState("Videos");
  const HandlechosContentList = (id, name) => {
    setChoseContentList(id);
    setChoseContentListName(name);
  };

  // useEffect(() => {
  //   const fetchOwnChannelData = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:4000/youtube/api/v1/user/view/Yourchannel",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       if (res.data.success) {
  //         setOwnChannelData(res.data.data);
  //         console.log(res.data.data);
  //       } else {
  //         console.log(ownChannelData);
  //         toast.error(res.data.message);
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  //   fetchOwnChannelData();
  // }, []);

  useEffect(() => {
    const fetchOwnChannelData = async () => {
      try {
        // Set loading to true while fetching the channel data
        setLoding(true);

        // Get the channel data from the server
        const res = await axios.get(
          "http://localhost:4000/youtube/api/v1/user/view/Yourchannel",
          {
            withCredentials: true,
          }
        );

        // If the request is successful, update the channel data
        if (res.data.success) {
          setOwnChannelData(res.data.channel);
          console.log(ownChannelData);
        } else {
          // If the request fails, show an error message
          toast.error(res.data.message);
        }
      } catch (err) {
        // If there is an error, log it to the console
        console.log("Error fetching channel data:", err.message);
      } finally {
        // Set loading to false after the request is finished
        setLoding(false);
      }
    };

    fetchOwnChannelData();
  }, []);

  const toggleMenu = (id) => {
    if (openVideomenuId === id) {
      setOpenVideomenuId(null); // Close the menu if it's already open
    } else {
      setOpenVideomenuId(id); // Open the menu for this specific video
    }
  };
  const LongVideoDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/youtube_studio/api/v1/post/long_video/delete/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const SHortVideoDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/youtube_studio/api/v1/post/short_video/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!ownChannelData) return <p>No channel data available</p>;

  return (
    <main className="h-screen w-screen bg-zinc-800  mt-auto  pb-12">
      <div className="h-full w-full flex">
        <div className="h-full w-[16%]  py-4 bg-zinc-800  border-r border-zinc-600 flex justify-center flex-col gap-2">
          <div className="px-[3.4rem] mt-10">
            <>
              {user.channelId.profilePic ? (
                <img
                  src={user.channelId.profilePic}
                  alt="logo"
                  className="w-24 h-24 p-1 rounded-full border border-blue-600"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center rounded-full  bg-blue-600">
                  <p className="text-3xl font-bold text-white">
                    {user?.name[0] + user?.name[1]}
                  </p>
                </div>
              )}
            </>
            <span className=" flex items-center flex-col ">
              <p className=" font-semibold">Your Channel</p>
              <p className="text-sm text-blue-400">
                {ownChannelData?.channelName}
              </p>
            </span>
          </div>
          <div className="flex flex-col h-full  ">
            {YourChannelcontrollerIconsList.map((item) => {
              return (
                <div key={item.id}>
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 hover:bg-black rounded-md pl-4"
                  >
                    <>
                      <span className="text-zinc-100 text-xl">{item.icon}</span>
                      <span className="text-[0.8rem] font-semibold   text-zinc-400">
                        {item.name}
                      </span>
                    </>
                  </div>
                  {item.id === 8 ? (
                    <div className="h-[1px] w-full bg-zinc-600 my-1"></div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-full w-[85%] bg-zinc-800 flex flex-col overflow-y-scroll">
          <div className="h-[14%] w-full border-b border-zinc-600 flex flex-col gap-5 p-4">
            <div>
              <h1 className="text-xl font-semibold"> Channel content</h1>
            </div>
            <div className="flex flex-row h-auto items-center w-full outline-none justify-center">
              {contentList.map((item) => {
                return (
                  <div
                    className="flex flex-row items-center gap-2 cursor-pointer w-full "
                    key={item.id}
                  >
                    <span
                      className={`text-[0.8rem] font-semibold hover:border-b-2 hover:border-zinc-500 text-zinc-400 ${
                        ChoseContentList === item.id &&
                        "border-b-2 border-white"
                      }`}
                    >
                      <button
                        onClick={() =>
                          HandlechosContentList(item.id, item.name)
                        }
                        className={`${
                          ChoseContentList === item.id && "text-white"
                        }`}
                      >
                        {item.name}
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row h-auto items-center w-full outline-none justify-center border-b border-zinc-600 px-5">
            <span className="flex flex-row items-center gap-4">
              <IoFilterSharp className="text-md text-zinc-400" />
              <p className="text-[0.8rem] text-zinc-400">Filter</p>
            </span>
            <Input className="bg-zinc-800 border-none" />
          </div>
          <>
            <div className="overflow-x-auto ">
              <table className="table-auto w-full text-left text-sm text-gray-500 overflow-x-scroll ">
                <thead className="border-b border-zinc-600">
                  <tr>
                    <th className="text-[0.7rem]  text-zinc-400 font-medium px-20 py-2">
                      Video
                    </th>
                    <th className="text-[0.7rem]  v text-zinc-400 font-medium px-4 py-2">
                      Visibility
                    </th>
                    <th className=" text-[0.7rem]  text-zinc-400 font-medium px-4 py-2">
                      Restrictions
                    </th>
                    <th className=" text-[0.7rem]   text-zinc-400 font-medium px-4 py-2 flex items-center gap-1">
                      <p>Date</p> <FaArrowDown className="text-zinc-400" />
                    </th>
                    <th className="text-[0.7rem]  text-zinc-400 font-medium px-4 py-2">
                      Views
                    </th>
                    <th className=" text-[0.7rem]   text-zinc-400 font-medium px-4 py-2">
                      Comments
                    </th>
                    <th className=" text-[0.7rem]   text-zinc-400 font-medium px-4 py-2">
                      Like(vs dislikes)
                    </th>
                    <th className=" text-[0.7rem]   text-zinc-400 font-medium px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                {ChoseContentList === 1 ? (
                  <tbody className="border-b border-zinc-600 ">
                    {ownChannelData.LongVideoId.map((video) => (
                      <tr
                        key={video._id}
                        className="hover:bg-black hover:border-b hover:border-red-600"
                      >
                        <th className="text-xs text-zinc-400  px-7 py-2">
                          <div className="pl-8 flex flex-row gap-2">
                            <span>
                              <video
                                width="200"
                                height="100"
                                controls
                                className="rounded-lg object-contain overflow-hidden cursor-pointer"
                              >
                                <source
                                  src={video.LongVideo}
                                  type="video/mp4"
                                />
                              </video>
                            </span>
                            <span className="flex flex-col w-96 ">
                              <p className="text-xs text-white  line-clamp-2">
                                {video.title}
                              </p>
                              <p className="text-[10px] text-zinc-400  line-clamp-2">
                                {video.description}
                              </p>
                            </span>
                          </div>
                        </th>
                        <th className="px-4 py-2">
                          <div className="flex items-center">
                            <span className=" px-3  text-white text-[0.8rem] font-[400]">
                              {video.visibility === "public" ? (
                                <span className="flex flex-row gap-2 items-center">
                                  <BiWorld className="text-zinc-400 text-lg" />{" "}
                                  {video.visibility}
                                </span>
                              ) : (
                                <span className="flex flex-row gap-2 items-center justify-center">
                                  <MdLockOutline className="text-zinc-400 text-lg" />
                                  {video.visibility}
                                </span>
                              )}
                            </span>
                          </div>
                        </th>
                        <th className="px-4 py-2">
                          <div className="flex items-center">
                            {video.restrictions ? (
                              <span className="bg-red-600 px-3 rounded-md text-white text-[0.7rem]">
                                {video.restrictions}
                              </span>
                            ) : (
                              <span className="  px-3 rounded-md text-white text-[0.7rem]">
                                No Restrictions
                              </span>
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-2">
                          <p className="text-zinc-400 text-[0.7rem]">
                            {video.date}
                          </p>
                        </th>
                        <th className="px-4 py-2">
                          <p className="text-zinc-400 text-[0.7rem]">
                            {video.views}
                          </p>
                        </th>
                        <th className="px-4 py-2">
                          <p className="text-zinc-400 text-[0.7rem]">
                            {video.comments}
                          </p>
                        </th>
                        <th className="px-4 py-2">
                          <p className="text-zinc-400 text-[0.7rem]">
                            {video.likes} (vs {video.dislikes})
                          </p>
                        </th>
                        <th className="px-4 py-2">
                          <div className="relative">
                            <button
                              onClick={() => toggleMenu(video._id)}
                              className="bg-zinc-600 px-1 py-1 rounded-full text-white text-[0.8rem]"
                            >
                              <BsThreeDotsVertical />
                            </button>

                            {openVideomenuId === video._id && (
                              <div className="   z-10 border absolute border-zinc-500 py-1 -top-[4.5rem] rounded-xl right-9 shadow-[0.01rem_0rem_0.1rem_0.01rem] shadow-yellow-200 bg-black text-white text-[0.8rem] h-[5rem] w-28">
                                <ul className="flex gap-2 flex-col   w-full">
                                  <li
                                    className=" px-4 cursor-pointer hover:text-yellow-500 flex gap-4 w-full hover:bg-zinc-800 rounded-md items-center"
                                    onClick={() =>
                                      navigate(
                                        `/youtube-studio/videos/edit/${video._id}`,
                                        {
                                          state: {
                                            videoData: video,
                                          },
                                        }
                                      )
                                    }
                                  >
                                    <CiEdit className="text-lg" /> edit
                                  </li>
                                  <li
                                    className=" px-4 hover:text-red-600 flex gap-4 cursor-pointer hover:bg-zinc-800 rounded-md items-center"
                                    onClick={() => LongVideoDelete(video._id)}
                                  >
                                    <>
                                      <MdDeleteOutline className="text-lg" />
                                      delete
                                    </>
                                  </li>
                                  <li className=" px-4 cursor-pointer hover:text-red-600 hover:bg-zinc-800 rounded-md flex gap-4 items-center">
                                    <TbShare3 className="text-lg" /> share
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                ) : ChoseContentList === 2 ? (
                  <tbody className="border-b border-zinc-600 ">
                    {ownChannelData.ShortVideoId.map((video) => (
                      <tr
                        key={video._id}
                        className="border-b border-zinc-600 hover:bg-black hover:border-red-600"
                      >
                        <th className="text-xs text-zinc-400  px-7 py-2  ">
                          <div className="pl-8  flex flex-row gap-2">
                            <span className="flex flex-row gap-2">
                              <video
                                height="300"
                                width="300"
                                controls
                                className="rounded-lg object-contain overflow-hidden cursor-pointer"
                              >
                                <source
                                  src={video.ShortVideo}
                                  type="video/mp4"
                                />
                              </video>
                            </span>
                            <span className="flex flex-col">
                              <p className="text-xs text-white line-clamp-2">
                                {video.title}
                              </p>
                              <p className="text-[10px] line-clamp-2 text-zinc-400">
                                {video.description}
                              </p>
                            </span>
                          </div>
                        </th>
                        <th className="px-4 py-2">
                          <div className="flex items-center  ">
                            <span className=" px-3   text-white text-[0.7rem] font-[400]">
                              {video.visibility === "public" ? (
                                <span className="flex flex-row gap-2 items-center">
                                  <BiWorld className="text-zinc-400 text-lg" />
                                  {video.visibility}
                                </span>
                              ) : (
                                <span className="flex flex-row gap-2 items-center justify-center">
                                  <MdLockOutline className="text-zinc-400 text-lg" />
                                  {video.visibility}
                                </span>
                              )}
                            </span>
                          </div>
                        </th>
                        <th className="px-4 py-2">
                          <div className="flex items-center font-[400]">
                            {video.restrictions ? (
                              <span className="bg-red-600 px-3 rounded-md text-white text-[0.7rem]">
                                {video.restrictions}
                              </span>
                            ) : (
                              <span className="bg-green-600 px-3 rounded-md  text-white text-[0.7rem]">
                                No restrictions
                              </span>
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-2">
                          <p className="text-zinc-400 text-[0.7rem] ">
                            {video.date}
                          </p>
                        </th>
                        <th className="px-4 py-2">
                          <p className="text-zinc-400 text-[0.7rem]">
                            {video.views}
                          </p>
                        </th>
                        <th className="px-4 py-2">
                          <p className="text-zinc-400 text-[0.7rem]">
                            {video.comments}
                          </p>
                        </th>
                        <th className="px-4 py-2">
                          <p className="text-zinc-400 text-[0.7rem] font-[400]">
                            Likes : {video.likes} <br />
                            Dislikes: {video.dislikes}
                          </p>
                        </th>
                        <th className="px-4 py-2">
                          <div className="relative">
                            <button
                              onClick={() => toggleMenu(video._id)}
                              className="bg-zinc-600 px-1 py-1 rounded-full text-white text-[0.8rem]"
                            >
                              <BsThreeDotsVertical />
                            </button>

                            {openVideomenuId === video._id && (
                              <div className="   z-10 border absolute border-zinc-500 py-1 -top-[6.5rem] rounded-xl right-9 shadow-[0.01rem_0rem_0.1rem_0.01rem] shadow-yellow-200 bg-black text-white text-[0.9rem] h-[7rem] w-28">
                                <ul className="flex gap-2  flex-col h-full  w-full">
                                  <li
                                    className=" px-4 cursor-pointer hover:text-yellow-500 flex gap-4 rounded-sm p-1 w-full hover:bg-zinc-800 items-center"
                                    onClick={() =>
                                      navigate(
                                        `/youtube-studio/videos/edit/${video._id}`,
                                        {
                                          state: {
                                            videoData: video,
                                          },
                                        }
                                      )
                                    }
                                  >
                                    <CiEdit className="text-lg" /> edit
                                  </li>
                                  <li
                                    className=" px-4 hover:text-red-600 flex gap-4 cursor-pointer hover:bg-zinc-800 rounded-sm p-1 items-center"
                                    onClick={() => SHortVideoDelete(video._id)}
                                  >
                                    <>
                                      <MdDeleteOutline className="text-lg" />
                                      delete
                                    </>
                                  </li>
                                  <li className=" px-4 cursor-pointer hover:text-red-600 hover:bg-zinc-800   rounded-sm p-1  flex gap-4 items-center">
                                    <TbShare3 className="text-lg" /> share
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <div className="w-full h-full mt-10 flex items-center justify-center">
                    <div>
                      <p className="text-red-600 text-5xl font-bold">
                        {ChoseContentListName} Not Found
                      </p>
                    </div>
                  </div>
                )}
              </table>
            </div>
          </>
        </div>
      </div>
    </main>
  );
}

// {/*
// /*{ownChannelData.LongVideoId.map((video) => (
//                     <tr key={video._id} className="hover:bg-black">
//                       <th className="text-xs text-zinc-400 font-medium px-7 py-2">
//                         <div className="pl-8 flex flex-row gap-2">
//                           <span>
//                             <video
//                               width="150"
//                               height="80"
//                               controls
//                               className="rounded-lg object-contain overflow-hidden"
//                             >
//                               <source src={video.LongVideo} type="video/mp4" />
//                             </video>
//                           </span>
//                           <span className="flex flex-col">
//                             <p className="text-xs text-white">{video.title}</p>
//                             <p className="text-[10px] text-zinc-400">
//                               {video.description}
//                             </p>
//                           </span>
//                         </div>
//                       </th>
//                       <th className="px-4 py-2">
//                         <div className="flex items-center">
//                           <span className="bg-green-600 px-3 rounded-md text-white text-[0.7rem]">
//                             {video.visibility}
//                           </span>
//                         </div>
//                       </th>
//                       <th className="px-4 py-2">
//                         <div className="flex items-center">
//                           {video.restrictions ? (
//                             <span className="bg-red-600 px-3 rounded-md text-white text-[0.7rem]">
//                               {video.restrictions}
//                             </span>
//                           ) : (
//                             <span className="bg-green-600 px-3 rounded-md text-white text-[0.7rem]">
//                               No Restrictions
//                             </span>
//                           )}
//                         </div>
//                       </th>
//                       <th className="px-4 py-2">
//                         <p className="text-zinc-400 text-[0.7rem]">
//                           {video.date}
//                         </p>
//                       </th>
//                       <th className="px-4 py-2">
//                         <p className="text-zinc-400 text-[0.7rem]">
//                           {video.views}
//                         </p>
//                       </th>
//                       <th className="px-4 py-2">
//                         <p className="text-zinc-400 text-[0.7rem]">
//                           {video.comments}
//                         </p>
//                       </th>
//                       <th className="px-4 py-2">
//                         <p className="text-zinc-400 text-[0.7rem]">
//                           {video.likes} (vs {video.dislikes})
//                         </p>
//                       </th>
//                     </tr>
//                   ))}*/

//   /* <tbody className="border-b border-zinc-600 ">
//                   {ownChannelData.ShortVideoId.map((video) => (
//                     <tr
//                       key={video._id}
//                       className="border-b border-zinc-600 hover:bg-black hover:border-red-600"
//                     >
//                       <th className="text-xs text-zinc-400 font-medium px-7 py-2  ">
//                         <div className="pl-8 flex flex-row gap-2">
//                           <span>
//                             <video
//                               width="100"
//                               height="100"
//                               controls
//                               className="rounded-lg object-contain overflow-hidden"
//                             >
//                               <source src={video.ShortVideo} type="video/mp4" />
//                             </video>
//                           </span>
//                           <span className="flex flex-col">
//                             <p className="text-xs text-white">{video.title}</p>
//                             <p className="text-[10px] text-zinc-400">
//                               {video.description}
//                             </p>
//                           </span>
//                         </div>
//                       </th>
//                       <th className="px-4 py-2">
//                         <div className="flex items-center  ">
//                           <span className="bg-green-600 px-3 rounded-md text-white text-[0.7rem]">
//                             {video.visibility}
//                           </span>
//                         </div>
//                       </th>
//                       <th className="px-4 py-2">
//                         <div className="flex items-center">
//                           {video.restrictions ? (
//                             <span className="bg-red-600 px-3 rounded-md text-white text-[0.7rem]">
//                               {video.restrictions}
//                             </span>
//                           ) : (
//                             <span className="bg-green-600 px-3 rounded-md text-white text-[0.7rem]">
//                               No restrictions
//                             </span>
//                           )}
//                         </div>
//                       </th>
//                       <th className="px-4 py-2">
//                         <p className="text-zinc-400 text-[0.7rem]">
//                           {video.date}
//                         </p>
//                       </th>
//                       <th className="px-4 py-2">
//                         <p className="text-zinc-400 text-[0.7rem]">
//                           {video.views}
//                         </p>
//                       </th>
//                       <th className="px-4 py-2">
//                         <p className="text-zinc-400 text-[0.7rem]">
//                           {video.comments}
//                         </p>
//                       </th>
//                       <th className="px-4 py-2">
//                         <p className="text-zinc-400 text-[0.7rem]">
//                           Likes : {video.likes} <br />
//                           Dislikes: {video.dislikes}
//                         </p>
//                       </th>
//                     </tr>
//                   ))}
//                 </tbody>

// // /*<tr>
// //                     <th className="text-xs  text-zinc-400 font-medium px-7 py-2 ">
// //                       <div className="pl-8 flex flex-row gap-2 ">
// //                         <span>
// //                           <div className="flex flex-col gap-4 mt-4">
// //                             {ownChannelData.LongVideoId.map((video, index) => (
// //                               <video
// //                                 key={index}
// //                                 width="150"
// //                                 height="80"
// //                                 controls
// //                                 className="rounded-lg object-contain  overflow-hidden"
// //                               >
// //                                 <source
// //                                   src={video.LongVideo}
// //                                   type="video/mp4"
// //                                 />
// //                               </video>
// //                             ))}
// //                           </div>
// //                         </span>
// //                         <span className="flex flex-col">
// //                           <p className="text-xs text-white">
// //                             {ownChannelData.LongVideoId.map((video, index) => (
// //                               <p key={index}>{video.title}</p>
// //                             ))}
// //                           </p>
// //                           <p className="text-[10px] text-zinc-400">
// //                             heare description
// //                           </p>
// //                         </span>
// //                       </div>
// //                     </th>
// //                     <th className="px-4 py-2">
// //                       <div className="flex flex-row gap-2 items-center ">
// //                         {/* <MdOutlineLock className="text-sm text-white" /> */
// }
// {/* //                         <TbLockOpenOff className="text-sm text-white" />
// //                         <p className=" text-[.7rem] text-white  font-normal">
// //                           Public
// //                         </p>
// //                       </div>
// //                     </th>
// //                     <th className="px-4 py-2">
// //                       <div>
// //                         <p className=" text-[.7rem] font-normal text-white">
// //                           Made for Kids
// //                         </p>
// //                       </div>
// //                     </th>
// //                     <th className="px-2 py-2">
// //                       <div className="flex flex-col  items-center">
// //                         <p className=" text-[.7rem] text-white  font-normal">
// //                           october 12, 2024
// //                         </p>
// //                         <p className="text-[0.6rem] text-zinc-400  font-normal">
// //                           Uploaded
// //                         </p>
// //                       </div>
// //                     </th>
// //                     <th className="px-5 py-2">
// //                       <div>
// //                         <p className=" text-[.7rem] text-white  font-normal">
// //                           10
// //                         </p>
// //                       </div>
// //                     </th>
// //                     <th className="px-8 py-2">
// //                       <div>
// //                         <p className=" text-[.7rem] text-white  font-normal">
// //                           6
// //                         </p>
// //                       </div>
// //                     </th>
// //                     <th className=" py-2">
// //                       <div className="flex flex-col items-center">
// //                         <p className="text-[.7rem] text-white  font-normal">
// //                           10
// //                         </p>
// //                         <p className="text-[0.6rem] text-zinc-400  font-normal">
// //                           Likes
// //                         </p>
// //                       </div>
// //                     </th>
// //                   </tr> */}
