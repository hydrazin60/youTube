import { Input } from "@/components/ui/input";
import React from "react";
import { useParams } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";

export default function YoutubeStudioPage() {
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
  const { id } = useParams();
  return (
    <main className="h-screen w-screen bg-zinc-800  mt-auto">
      <div className="h-full w-full flex">
        <div className="h-full w-[16%] bg-zinc-800  border-r border-zinc-600"></div>
        <div className="h-full w-[85%] bg-zinc-800 flex flex-col">
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
                    <span className="text-[0.8rem] font-semibold hover:border-b-2 hover:border-zinc-500 text-zinc-400">
                      {item.name}
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
          <div>
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
                  </tr>
                </thead>
                <tbody className="border-b border-zinc-600">
                  <tr>
                    <th className="text-xs  text-zinc-400 font-medium px-12 py-2">
                      <div className="pl-8 flex flex-row gap-2 py-2">
                        <span>
                          <img
                            src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/292694884_729606568152974_711651807545817504_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=kZulNBXicMcQ7kNvgHvAYuW&_nc_ht=scontent.fktm21-1.fna&_nc_gid=ATlu7BHpCIHLCeTNkYFrL9H&oh=00_AYC0s7ucvGbiKxPfP0uDe871f2ZhrPIpXoLtS_r5PuetFg&oe=67101964"
                            alt="image"
                            className=" w-28 h-16 rounded-md object-cover object-center overflow-hidden"
                          />
                        </span>
                        <span className="flex flex-col">
                          <p className="text-xs text-white">
                            my first youtube video
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            hello world description
                          </p>
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className="flex flex-row gap-2 items-center ">
                        <MdOutlineLock className="text-sm text-white" />
                        <p className=" text-[.7rem] text-white  font-normal">
                          Private
                        </p>
                      </div>
                    </th>
                    <th>
                      <div>
                        <p className=" text-[.7rem] font-normal text-white">
                          Made for Kids
                        </p>
                      </div>
                    </th>
                    <th>
                      <div className="flex flex-col  items-center">
                        <p className=" text-[.7rem] text-white  font-normal">
                          Jan 1, 2022
                        </p>
                        <p className="text-[0.6rem] text-zinc-400  font-normal">
                          Uploaded
                        </p>
                      </div>
                    </th>
                    <th className="px-4 py-2">
                      <div>
                        <p className=" text-[.7rem] text-white  font-normal">
                          100k
                        </p>
                      </div>
                    </th>
                    <th className="px-4 py-2">
                      <div>
                        <p className=" text-[.7rem] text-white  font-normal">
                          10k
                        </p>
                      </div>
                    </th>
                    <th className="px-2 py-2">
                      <div className="flex flex-col items-center">
                        <p className="text-[.7rem] text-white  font-normal">
                          100k
                        </p>
                        <p className="text-[0.6rem] text-zinc-400  font-normal">
                          Likes
                        </p>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
