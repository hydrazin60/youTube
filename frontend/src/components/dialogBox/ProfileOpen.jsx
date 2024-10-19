import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { PiSignOutFill } from "react-icons/pi";
import { SiYoutubestudio } from "react-icons/si";
import { CiBadgeDollar } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { GoMoon } from "react-icons/go";
import { IoLanguage } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { GrLanguage } from "react-icons/gr";
import { FaKeyboard } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../../redux/userAuthSlice";
export default function ProfileOpen({ open, setOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

  const firstSectionIcon = [
    {
      name: "Google Account",
      icon: <FaGoogle />,
      id: 1,
    },
    {
      name: "Switch Account",
      icon: <MdOutlineSwitchAccount />,
      id: 2,
    },
    {
      name: "Sign Out",
      icon: <PiSignOutFill />,
      id: 3,
    },
  ];

  const secondSectionIcon = [
    {
      name: "Youtube Studio",
      icon: <SiYoutubestudio />,
      id: 1,
    },
    {
      name: "Purchase and membership",
      icon: <CiBadgeDollar />,
      id: 2,
    },
  ];
  const thirdSectionIcon = [
    {
      name: "Your data in Youtube",
      icon: <ImProfile />,
      id: 1,
    },
    {
      name: "Appearance : Device theme",
      icon: <GoMoon />,
      id: 2,
    },
    {
      name: "Language: British English",
      icon: <IoLanguage />,
      id: 3,
    },
    {
      name: "Location: Nepal",
      icon: <TbWorld />,
      id: 4,
    },
    {
      name: "Keyboard shortcuts",
      icon: <FaKeyboard />,
      id: 5,
    },
  ];

  const fourthSectionIcon = [
    {
      name: "Help",
      icon: <IoIosHelpCircleOutline />,
      id: 1,
    },
    {
      name: "Send feedback",
      icon: <RiFeedbackLine />,
      id: 2,
    },
  ];

  const LogoutHandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/youtube/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(null));
        toast.success(res.data.message || "Logout successful!", {
          position: "top-right",
          autoClose: 3000,
          style: {
            border: "1px solid #f44336",
            background: "#0000ff",
            color: "#ffffff",
          },
        });
      }
    } catch (error) {
      console.log(
        `Something went wrong on logout User! err : ${error.message}`
      );
      toast.error(
        `Something went wrong on logout User! err : ${error.message}`
      );
    }
  };

  const RightsideIconChivk = (id, name) => {
    if (id === 3 && name === "Sign Out") {
      LogoutHandler();
    }
  };
  return (
    <main
      className={`w-[19vw] h-[92vh] bg-zinc-800 z-50  rounded-xl overflow-hidden  ${
        open ? " " : "hidden"
      }  `}
    >
      <div className="flex flex-col gap-2 ">
        <div>
          <div className="flex flex-row gap-4 p-3 overflow-hidden  ">
            <span>
              {user.channelId.profilePic !== null ? (
                <img
                  src={user.channelId.profilePic}
                  alt="profile"
                  className="h-9 w-9 rounded-full object-cover overflow-hidden"
                />
              ) : (
                <div className="h-9 w-9  rounded-full bg-blue-800 flex items-center justify-center">
                  <p className="text-[1.1rem] font-semibold text-blue-200">
                    {user.name[0] + user.name[1]}
                  </p>
                </div>
              )}
            </span>
            <span>
              <p className="text-zinc-200 text-normal font-semibold ">
                {user.name}
              </p>
              <p className="text-zinc-200 text-normal font-semibold overflow-hidden ">
                @{user.channelId.channelName}
              </p>
              <p className="text-blue-400 text-[11px] my-1">
                View your channel
              </p>
            </span>
          </div>
          <hr className="w-full border border-zinc-500" />
        </div>
        <div className="flex flex-col">
          {firstSectionIcon.map((item) => {
            return (
              <div
                key={item.id}
                className="flex py-2 px-3  gap-3 items-center hover:bg-zinc-700 "
                onClick={() => RightsideIconChivk(item.id, item.name)}
              >
                <span className="text-white text-md  ">{item.icon}</span>
                <span className="flex w-full justify-between ">
                  <p className="text-zinc-200 text-xs font-semibold">
                    {item.name}
                  </p>
                  {item.id === 2 ? (
                    <FaAngleRight className="text-zinc-200 text-sm font-semibold" />
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
        <hr />
        <div>
          {secondSectionIcon.map((item) => {
            return (
              <div
                key={item.id}
                className="flex py-2 px-3  gap-3 items-center hover:bg-zinc-700 "
              >
                <span className="text-white text-md  ">{item.icon}</span>
                <p className="text-zinc-200 text-xs font-semibold">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
        <hr />
        <div className="flex flex-col">
          {thirdSectionIcon.map((item) => {
            return (
              <div
                key={item.id}
                className="flex py-2 px-3  gap-3 items-center hover:bg-zinc-700 "
              >
                <span className="text-white text-md  ">{item.icon}</span>
                <span className="flex w-full justify-between items-center ">
                  <p className="text-zinc-200 text-xs font-semibold">
                    {item.name}
                  </p>
                  {item.id === 2 || item.id === 3 || item.id === 4 ? (
                    <FaAngleRight className="text-zinc-200 text-sm font-semibold" />
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
        <hr />
        <>
          <div>
            <div className="flex py-2 px-3  gap-3 items-center hover:bg-zinc-700 ">
              <span className="text-white text-lg  ">
                <CiSettings />
              </span>
              <p className="text-zinc-200 text-xs font-semibold">Settings</p>
            </div>
          </div>
        </>
        <hr />
        <div>
          {fourthSectionIcon.map((item) => {
            return (
              <div
                key={item.id}
                className="flex py-2 px-3  gap-3 items-center hover:bg-zinc-700 "
              >
                <span className="text-white text-lg  ">{item.icon}</span>
                <p className="text-zinc-200 text-xs font-semibold">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
