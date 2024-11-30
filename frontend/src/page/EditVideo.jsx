// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { IoMdClose } from "react-icons/io";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function EditVideo() {
//   const [editFormData, seteditFormData] = useState({});
//   const { state } = useLocation();
//   const videoData = state?.videoData;
//   const [updateFormData, setUpdateFormData] = useState({
//     title: "",
//     description: "",
//     thumbnail: " ",
//     visibility: "",
//   });
//   console.log(updateFormData);

//   return (
//     <div className="min-h-screen min-w-full  flex justify-center items-center ">
//       <div className="min-h-[80vh] min-w-[30vw] bg-zinc-800 flex flex-col items-center  ">
//         <div className="w-full border-b border-gray-400 h-12 flex justify-between items-center p-4">
//           <span>
//             <p className="text-lg font-semibold">EDIT Video</p>
//           </span>
//           <span className=" p-1 flex items-center justify-center bg-zinc-600 rounded-full">
//             <IoMdClose className="text-white h-5 w-5" />
//           </span>
//         </div>
//         <div className="bg-zinc-600 min-h-[80vh] p-3 w-full flex flex-col gap-3  ">
//           <div className="max-h-40 max-w-40 min-h-28 min-w-24 rounded-full bg-white flex items-center justify-center">
//             <Input type="file" placeholder="Enter video title" />
//           </div>
//           <div className="max-h-40 max-w-40 min-h-28 min-w-24 rounded-full bg-white flex items-center justify-center">
//             <Input type="file" placeholder="Enter video title" />
//           </div>
//           <div className="flex flex-col gap-3">
//             <Input
//               type="text"
//               name="title"
//               value={updateFormData.title}
//               placeholder="Enter video title"
//               onChange={(e) =>
//                 updateFormData({ ...updateFormData, title: e.target.value })
//               }
//             />
//             <Input
//               type="text"
//               name="description"
//               placeholder="Enter video  description"
//               value={updateFormData.description}
//               onChange={(e) =>
//                 updateFormData({
//                   ...updateFormData,
//                   description: e.target.value,
//                 })
//               }
//             />
//           </div>
//           <div>
//             <div className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="visibility"
//                 value="private"
//                 id="private"
//                 checked={updateFormData.visibility === "private"}
//                 onChange={(e) =>
//                   setUpdateFormData({
//                     ...updateFormData,
//                     visibility: e.target.value,
//                   })
//                 }
//               />
//               <label htmlFor="private" className="text-[#eee6e6]">
//                 Private
//               </label>
//             </div>
//             <div className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="visibility"
//                 value="public"
//                 id="public"
//                 checked={updateFormData.visibility === "public"}
//                 onChange={(e) =>
//                   setUpdateFormData({
//                     ...updateFormData,
//                     visibility: e.target.value,
//                   })
//                 }
//               />
//               <label htmlFor="public" className="text-[#eee6e6]">
//                 Public
//               </label>
//             </div>
//           </div>
//           <div>
//             <Button className="w-full bg-blue-600 hover:bg-blue-500 text-xl">
//               Submit
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditVideo() {
  const { state } = useLocation();
  const videoData = state?.videoData;

  const [updateFormData, setUpdateFormData] = useState({
    title: videoData?.title || "",
    description: videoData?.description || "",
    thumbnail: "",
    visibility: videoData?.visibility || "",
  });

  const handleSubmit = () => {
    console.log("Updated video data:", updateFormData);
  };

  return (
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <div className="min-h-[80vh] min-w-[30vw] bg-zinc-800 flex flex-col items-center">
        <div className="w-full border-b border-gray-400 h-12 flex justify-between items-center p-4">
          <span>
            <p className="text-lg font-semibold">EDIT Video</p>
          </span>
          <span className="p-1 flex items-center justify-center bg-zinc-600 rounded-full">
            <IoMdClose className="text-white h-5 w-5" />
          </span>
        </div>
        <div className="bg-zinc-600 min-h-[80vh] p-3 w-full flex flex-col gap-3">
          <div className="flex flex-col items-center  ">
            <label htmlFor="thumbnail" className="text-white mb-2">
              Upload Thumbnail
            </label>
            <Input
              id="thumbnail"
              type="file"
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  thumbnail: e.target.files[0],
                })
              }
            />
          </div>

          {/* Video Title & Description */}
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              name="title"
              value={updateFormData.title}
              placeholder="Enter video title"
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, title: e.target.value })
              }
            />
            <Input
              type="text"
              name="description"
              placeholder="Enter video description"
              value={updateFormData.description}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* Visibility Options */}
          <div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="visibility"
                value="private"
                id="private"
                checked={updateFormData.visibility === "private"}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    visibility: e.target.value,
                  })
                }
              />
              <label htmlFor="private" className="text-[#eee6e6]">
                Private
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="visibility"
                value="public"
                id="public"
                checked={updateFormData.visibility === "public"}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    visibility: e.target.value,
                  })
                }
              />
              <label htmlFor="public" className="text-[#eee6e6]">
                Public
              </label>
            </div>
          </div>

          <div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-500 text-xl"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
