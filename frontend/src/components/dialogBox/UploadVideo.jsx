// import React, { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
// import { HiUpload } from "react-icons/hi";
// import { PuffLoader } from "react-spinners"; // Example loader, install react-spinners
// import { Input } from "../ui/input";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

// export default function UploadVideo() {
//   const [filePreview, setFilePreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLoading(true); // Start loading
//       const fileURL = URL.createObjectURL(file); // Create preview URL
//       setTimeout(() => {
//         setFilePreview(fileURL); // Store file preview URL
//         setLoading(false); // Stop loading after simulating upload delay
//       }, 2000); // Simulate a delay (e.g., for file upload)
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger className="text-xs">Upload Video</DialogTrigger>
//       <DialogContent className="w-[100%] h-[99%] bg-zinc-800 text-white">
//         <div className="h-full w-full flex flex-col gap-4">
//           <div className="w-full h-12 border-b border-zinc-500 flex items-center p-2">
//             <p className="text-md font-bold">Upload Video</p>
//           </div>

//           <div className="w-full h-full flex items-center flex-col gap-2 overflow-y-scroll">
//             <form className="w-full px-4">
//               <div className="w-full h-full flex flex-col justify-center gap-10">
//                 <div className="flex flex-col items-center gap-2">
//                   <div className="relative rounded-full w-24 h-24 flex items-center justify-center bg-zinc-900">
//                     {loading ? (
//                       <PuffLoader color="#ffffff" size={60} />
//                     ) : filePreview ? (
//                       <video
//                         src={filePreview}
//                         controls
//                         className="rounded-full w-24 h-24 object-cover"
//                       />
//                     ) : (
//                       <>
//                         <HiUpload className="text-5xl font-bold" />
//                         <input
//                           type="file"
//                           accept="video/*,image/*"
//                           className="absolute inset-0 opacity-0 cursor-pointer"
//                           onChange={handleFileChange}
//                         />
//                       </>
//                     )}
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <p className="text-normal font-semibold text-zinc-200">
//                       Drag and drop video files to upload
//                     </p>
//                     <p className="text-[0.6rem] text-zinc-400">
//                       Your videos will be private until you publish them.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full flex flex-col gap-4">
//                   <div className="w-full">
//                     <label
//                       htmlFor="title"
//                       className="block text-sm font-medium text-white mb-1"
//                     >
//                       Details
//                     </label>
//                     <Input
//                       type="text"
//                       name="title"
//                       placeholder="Title"
//                       className="w-full h-12 px-2 text-black" // Ensure full width
//                     />
//                   </div>

//                   <div className="w-full">
//                     <label
//                       htmlFor="description"
//                       className="block text-sm font-medium text-white mb-1"
//                     >
//                       Description
//                     </label>
//                     <Input
//                       type="text"
//                       name="description"
//                       placeholder="Tell viewers about your video (Type @ to mention a channel)"
//                       className="w-full h-24 px-2 text-black" // Ensure full width
//                     />
//                   </div>
//                   <div>
//                     <span>Audience</span>
//                     <span>
//                       <p>This video is set to 'Made for Kids'</p>
//                       <p>Set by you</p>
//                     </span>
//                     <span>
//                       <p>
//                         Regardless of your location, you're legally required to
//                         comply with the Children's Online Privacy Protection Act
//                         (COPPA) and/or other laws. You're required to tell us
//                         whether your videos are 'Made for Kids'
//                       </p>
//                       What is 'Made for Kids' content?<p></p>
//                     </span>
//                     <span>
//                       <p>
//                         Features like personalised ads and notifications won't
//                         be available on videos 'Made for Kids'. Videos that are
//                         set as 'Made for Kids' by you are more likely to be
//                         recommended alongside other children's videos. Learn
//                         more
//                       </p>
//                     </span>
//                     <span>
//                       <RadioGroup>
//                         <div>
//                           <RadioGroupItem value=" " id="public" />
//                           <label htmlFor="public">this is public</label>
//                         </div>
//                         <div>
//                           <RadioGroupItem value="private" id="private" />
//                           <label htmlFor="private">this is private</label>
//                         </div>
//                       </RadioGroup>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { HiUpload } from "react-icons/hi";
import { PuffLoader } from "react-spinners"; // Example loader, install react-spinners
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GrStatusGood } from "react-icons/gr";
import { Button } from "../ui/button";

export default function UploadVideo() {
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true); // Start loading
      const fileURL = URL.createObjectURL(file); // Create preview URL
      setTimeout(() => {
        setFilePreview(fileURL); // Store file preview URL
        setLoading(false); // Stop loading after simulating upload delay
      }, 2000); // Simulate a delay (e.g., for file upload)
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs">Upload Video</DialogTrigger>
      <DialogContent className="w-full h-[90vh] bg-zinc-800 text-white overflow-y-scroll  ">
        <div className="h-full w-full flex flex-col gap-4">
          <div className="w-full h-12 border-b border-zinc-500 flex items-center p-2">
            <p className="text-md font-bold">Upload Video</p>
          </div>

          <div className="w-full h-full flex flex-col p-4">
            <form className="w-full flex flex-col gap-10">
              <div className="flex flex-col items-center gap-2">
                <div className="relative rounded-full w-24 h-24 flex items-center justify-center bg-zinc-900">
                  {loading ? (
                    <PuffLoader color="#ffffff" size={60} />
                  ) : filePreview ? (
                    <video
                      src={filePreview}
                      controls
                      className="rounded-full w-24 h-24 object-cover"
                    />
                  ) : (
                    <>
                      <HiUpload className="text-5xl font-bold" />
                      <input
                        type="file"
                        accept="video/*,image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                    </>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-normal font-semibold text-zinc-200">
                    Drag and drop video files to upload
                  </p>
                  <p className="text-[0.6rem] text-zinc-400">
                    Your videos will be private until you publish them.
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="w-full">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Details
                  </label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-full h-12 px-2 text-black"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Description
                  </label>
                  <Input
                    type="text"
                    name="description"
                    placeholder="Tell viewers about your video (Type @ to mention a channel)"
                    className="w-full h-24 px-2 text-black"
                  />
                </div>

                <div>
                  <p className="font-semibold text-md">Audience</p>
                  <p className="text-sm text-zinc-200">
                    This video is set to "Made for Kids"
                  </p>
                  <p className="text-sm text-zinc-100">Set by you</p>
                  <p className="text-[0.7rem] text-zinc-100 mt-2">
                    Regardless of your location, you're legally required to
                    comply with the Children's Online Privacy Protection Act
                    (COPPA) and/or other laws. You're required to tell us
                    whether your videos are "Made for Kids".
                  </p>
                  <p className="text-xs text-blue-400 mt-2">
                    What is 'Made for Kids' content?
                  </p>
                  <p className="text-[0.7rem] text-zinc-100 mt-2">
                    Features like personalised ads and notifications won't be
                    available on videos "Made for Kids". Videos that are set as
                    "Made for Kids" by you are more likely to be recommended
                    alongside other children's videos.
                  </p>
                  <div className="mt-4">
                    <>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visibility" // Same name for both radio buttons
                          value="public"
                          id="public"
                        />
                        <label htmlFor="public" className="text-[#eee6e6]">
                          This is public
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visibility"
                          value="private"
                          id="private"
                          defaultChecked
                        />
                        <label htmlFor="private" className="text-[#eee6e6]">
                          This is private
                        </label>
                      </div>
                    </>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between border-t border-gray-400 py-3 ">
                <div className="flex items-center gap-2">
                  <span>
                    <HiUpload />
                  </span>
                  <span>
                    <GrStatusGood />
                  </span>
                  <span>
                    <p className="text-[0.6rem]">
                      Checks complete. Copyright-protected content found. Go to
                      checks
                    </p>
                  </span>
                </div>
                <div>
                  <Button className="rounded-full bg-white px-4 py-1 text-black">
                    Upload
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
