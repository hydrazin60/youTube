import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { HiUpload } from "react-icons/hi";
import { PuffLoader } from "react-spinners";
import { Input } from "../ui/input";
import { GrStatusGood } from "react-icons/gr";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { IoMdClose, IoMdPhotos } from "react-icons/io";

export default function UploadVideo() {
  const [loading, setLoading] = useState(false);
  const [LodingDuringUpload, setLodingDuringUpload] = useState(false);
  // long Video
  const [filePreview, setFilePreview] = useState(null);
  const [ThumbnailPreview, setThumbnailPreview] = useState(null);
  const [ReelThumbnailPreview, setReelThumbnailPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "",
    LongVideo: null,
    thumbnail: null,
  });

  const [openPreviewImage, setOpenPreviewImage] = useState(false);
  const [isReelThumbnailImageOpen, setIsReelThumbnailImageOpen] =
    useState(false);
  // Handle file change for long video
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setFilePreview(URL.createObjectURL(file)); // For video preview
      setFormData({ ...formData, LongVideo: file }); // Storing the file object
      setLoading(false);
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setThumbnailPreview(URL.createObjectURL(file)); // For video preview
      setFormData({ ...formData, thumbnail: file }); // Storing the file object
      setLoading(false);
    }
  };

  const handleReelThumbnailImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setReelThumbnailPreview(URL.createObjectURL(file)); // For video preview
      setReelsData({ ...ReelsData, thumbnail: file }); // Storing the file object
      setLoading(false);
    }
  };
  // short video
  const [selectContentType, setSelectContentType] = useState("UploadVideo");
  const [ReelsPreview, setReelsPreview] = useState(null);
  const [ReelsData, setReelsData] = useState({
    title: "",
    description: "",
    visibility: "",
    ShortVideo: null,
    thumbnail: null,
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    setLodingDuringUpload(true);

    try {
      if (!formData.LongVideo) {
        toast.error("Please upload a video");
        return;
      }
      if (!formData.thumbnail) {
        toast.error("Please upload a thumbnail");
        return;
      }
      if (!formData.description) {
        toast.error("Please enter a description");
        return;
      }

      const data = new FormData();
      data.append("LongVideo", formData.LongVideo); // Ensure the key matches the multer configuration
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("visibility", formData.visibility);
      data.append("thumbnail", formData.thumbnail);

      const res = await axios.post(
        "http://localhost:4000/youtube_studio/api/v1/post/long_video/upload",
        data,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Video uploaded successfully!");
      } else {
        toast.error(res.data.message || "Upload failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload failed!");
    } finally {
      setLodingDuringUpload(false);
    }
  };
  // Handle file change and handleSubmit for short video
  const handleReelsFileChange = async (e) => {
    const file = e.target?.files[0];
    if (file) {
      setLoading(true);
      const fileURL = URL.createObjectURL(file);
      setTimeout(() => {
        setReelsPreview(fileURL);
        setReelsData({ ...ReelsData, ShortVideo: file });
        setLoading(false);
      }, 2000);
    }
  };
  const handleReelsSubmit = async (e) => {
    e.preventDefault();
    console.log("ReelsData : ", ReelsData);
    try {
      if (!ReelsData?.ShortVideo) {
        toast.error("Please select video");
        return;
      }

      const data = new FormData();
      data.append("title", ReelsData.title);
      data.append("description", ReelsData.description);
      data.append("visibility", ReelsData.visibility);
      data.append("ShortVideo", ReelsData.ShortVideo);
      data.append("thumbnail", ReelsData.thumbnail);
      setLodingDuringUpload(true);
      const res = await axios.post(
        "http://localhost:4000/youtube_studio/api/v1/post/short_video/upload",
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setLodingDuringUpload(false);
        setReelsData({
          title: "",
          description: "",
          visibility: "",
          ShortVideo: null,
        });
        setReelsPreview(null);
        toast.success(res.data.message);
      } else {
        setLodingDuringUpload(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Upload failed!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          border: "1px solid #f44336",
          background: "#ffebee",
          color: "#f44336",
        },
      });
    } finally {
      setLodingDuringUpload(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="text-xs">Upload Video</DialogTrigger>
      <DialogContent className="w-full h-[90vh] bg-zinc-800 text-white overflow-y-scroll">
        <div className="h-full w-full flex flex-col gap-4">
          <div className="w-full h-12 border-b border-zinc-500 text-gray-400 flex justify-between px-10 items-center p-2">
            <button
              className={`text-md font-bold ${
                selectContentType === "UploadVideo"
                  ? "border-b-2 border-white text-white"
                  : ""
              } `}
              onClick={() => setSelectContentType("UploadVideo")}
            >
              Upload Video
            </button>
            <button
              className={`text-md font-bold    ${
                selectContentType === "UploadReels"
                  ? "border-b-2 border-white text-white"
                  : ""
              } `}
              onClick={() => setSelectContentType("UploadReels")}
            >
              Upload Reels
            </button>
          </div>

          {selectContentType === "UploadReels" ? (
            // <div className="  w-full h-full flex flex-col p-4">
            //   <form
            //     className="w-full flex flex-col gap-10"
            //     onSubmit={handleReelsSubmit}
            //   >
            //     <div className="flex flex-col items-center gap-2">
            //       <div className=" rounded-full w-24 h-24 flex items-center justify-center bg-zinc-900">
            //         {loading ? (
            //           <PuffLoader color="#ffffff" size={60} />
            //         ) : ReelsPreview ? (
            //           <video
            //             src={ReelsPreview}
            //             controls
            //             className="rounded-full w-24 h-24 object-cover"
            //           />
            //         ) : (
            //           <>
            //             <HiUpload className="text-5xl font-bold" />
            //             <input
            //               type="file"
            //               accept="video/*"
            //               className="absolute inset-0 opacity-0  cursor-pointer"
            //               onChange={handleReelsFileChange}
            //             />
            //           </>
            //         )}
            //       </div>
            //       <div className="flex flex-col items-center">
            //         <p className="text-normal font-semibold text-zinc-200">
            //           Drag and drop Reel (short video) files to upload
            //         </p>
            //         <p className="text-[0.6rem] text-zinc-400">
            //           Your Reel will be private until you publish them.
            //         </p>
            //       </div>
            //     </div>
            //     <>
            //       <div className="w-full h-24  border border-gray-400 flex items-center gap-10">
            //         <div className="relative w-[32%] h-full flex items-center justify-center border-dotted border-2 border-gray-400">

            //           <IoMdPhotos className="text-5xl font-bold" />
            //         </div>
            //         <div>
            //           <img
            //             src={ReelThumbnailPreview}
            //             alt="preview"
            //             className="w-32 max-w-36 h-full max-h-[99px] object-cover cursor-pointer"
            //             onClick={() =>
            //               setIsReelThumbnailImageOpen(!isReelThumbnailImageOpen)
            //             }
            //           />
            //         </div>
            //       </div>
            //     </>
            //     <div className="w-full flex flex-col gap-4">
            //       <div className="w-full">
            //         <label
            //           htmlFor="title"
            //           className="block text-sm font-medium text-white mb-1"
            //         >
            //           Title
            //         </label>
            //         <Input
            //           type="text"
            //           name="title"
            //           value={ReelsData.title}
            //           placeholder="Enter  Reel (short video) title"
            //           className="w-full h-12 px-2 text-white"
            //           onChange={(e) =>
            //             setReelsData({ ...ReelsData, title: e.target.value })
            //           }
            //         />
            //       </div>

            //       <div className="w-full">
            //         <label
            //           htmlFor="description"
            //           className="block text-sm font-medium text-white mb-1"
            //         >
            //           Description
            //         </label>
            //         <Input
            //           type="text"
            //           name="description"
            //           value={ReelsData.description}
            //           placeholder="Enter  Reel (short video) description"
            //           className="w-full h-24 px-2 text-white"
            //           onChange={(e) =>
            //             setReelsData({
            //               ...ReelsData,
            //               description: e.target.value,
            //             })
            //           }
            //         />
            //       </div>

            //       <div>
            //         <p className="font-semibold text-md">Visibility</p>
            //         <div className="mt-4">
            //           <div className="flex items-center gap-2">
            //             <input
            //               type="radio"
            //               name="visibility"
            //               value="public"
            //               id="public"
            //               checked={ReelsData.visibility === "public"}
            //               onChange={(e) =>
            //                 setReelsData({
            //                   ...ReelsData,
            //                   visibility: e.target.value,
            //                 })
            //               }
            //             />
            //             <label htmlFor="public" className="text-[#eee6e6]">
            //               Public
            //             </label>
            //           </div>
            //           <div className="flex items-center gap-2">
            //             <input
            //               type="radio"
            //               name="visibility"
            //               value="private"
            //               id="private"
            //               checked={ReelsData.visibility === "private"}
            //               onChange={(e) =>
            //                 setReelsData({
            //                   ...ReelsData,
            //                   visibility: e.target.value,
            //                 })
            //               }
            //             />
            //             <label htmlFor="private" className="text-[#eee6e6]">
            //               Private
            //             </label>
            //           </div>
            //         </div>
            //       </div>
            //     </div>

            //     <div className="w-full flex justify-between border-t border-gray-400 py-3">
            //       <div className="flex items-center gap-2">
            //         <span>
            //           <HiUpload />
            //         </span>
            //         <span>
            //           <GrStatusGood />
            //         </span>
            //         <span>
            //           <p className="text-[0.6rem]">
            //             Checks complete. Copyright-protected content found.
            //           </p>
            //         </span>
            //       </div>
            //       <div>
            //         <Button
            //           type="submit"
            //           className="rounded-full px-2 py-1 bg-white text-black hover:bg-white hover:text-black flex items-center justify-center"
            //         >
            //           {LodingDuringUpload ? (
            //             <>
            //               <span>Uploading...</span>
            //               <div className="ml-2">
            //                 <PuffLoader color="blue" size={27} />
            //               </div>
            //             </>
            //           ) : (
            //             "Upload Video"
            //           )}
            //         </Button>
            //       </div>
            //     </div>
            //   </form>
            //   <div
            //     className={` ${
            //       isReelThumbnailImageOpen ? "block" : "hidden"
            //     } z-10  absolute top-32 left-0 w-full h-full`}
            //   >
            //     <span>
            //       <IoMdClose
            //         className="text-white text-5xl cursor-pointer"
            //         onClick={() =>
            //           setIsReelThumbnailImageOpen(!isReelThumbnailImageOpen)
            //         }
            //       />
            //     </span>
            //     <img
            //       src={ReelThumbnailPreview}
            //       alt="image"
            //       className="oppacity-50 h-96 object-cover"
            //     />
            //   </div>
            // </div>
            <div className="w-full h-full flex flex-col p-4">
              <form
                className="w-full flex flex-col gap-10"
                onSubmit={handleReelsSubmit}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="relative rounded-full w-24 h-24 flex items-center justify-center bg-zinc-900">
                    {loading ? (
                      <PuffLoader color="#ffffff" size={50} />
                    ) : ReelsPreview ? (
                      <video
                        src={ReelsPreview}
                        controls
                        className="rounded-full w-24  h-24 object-cover"
                      />
                    ) : (
                      <>
                        <HiUpload className="text-5xl font-bold" />
                        <input
                          type="file"
                          accept="video/*"
                          className="absolute   w-16 inset-0 opacity-0  cursor-pointer"
                          onChange={handleReelsFileChange}
                        />
                      </>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-normal font-semibold text-zinc-200">
                      Drag and drop Reel (short video) files to upload
                    </p>
                    <p className="text-[0.6rem] text-zinc-400">
                      Your Reel will be private until you publish them.
                    </p>
                  </div>
                </div>

                <div className="w-full h-24 border border-gray-400 flex items-center gap-10">
                  <div className="relative w-[32%] h-full flex items-center justify-center border-dotted border-2 border-gray-400">
                    <input
                      accept="image/*"
                      type="file"
                      onChange={handleReelThumbnailImageChange}
                      className="absolute  inset-0 opacity-0 cursor-pointer h-20 w-28 z-10"
                    />
                    <IoMdPhotos className="text-5xl font-bold" />
                  </div>
                  <div>
                    {ReelThumbnailPreview && (
                      <img
                        src={ReelThumbnailPreview}
                        alt="thumbnail preview"
                        className="w-32 max-w-36 h-full max-h-[99px] object-cover cursor-pointer"
                        onClick={() =>
                          setIsReelThumbnailImageOpen(!isReelThumbnailImageOpen)
                        }
                      />
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4">
                  <div className="w-full">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Title
                    </label>
                    <Input
                      type="text"
                      name="title"
                      value={ReelsData.title}
                      placeholder="Enter Reel (short video) title"
                      className="w-full h-12 px-2 text-white"
                      onChange={(e) =>
                        setReelsData({ ...ReelsData, title: e.target.value })
                      }
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
                      value={ReelsData.description}
                      placeholder="Enter Reel (short video) description"
                      className="w-full h-24 px-2 text-white"
                      onChange={(e) =>
                        setReelsData({
                          ...ReelsData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-md">Visibility</p>
                    <div className="mt-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visibility"
                          value="public"
                          id="public"
                          checked={ReelsData.visibility === "public"}
                          onChange={(e) =>
                            setReelsData({
                              ...ReelsData,
                              visibility: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="public" className="text-[#eee6e6]">
                          Public
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visibility"
                          value="private"
                          id="private"
                          checked={ReelsData.visibility === "private"}
                          onChange={(e) =>
                            setReelsData({
                              ...ReelsData,
                              visibility: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="private" className="text-[#eee6e6]">
                          Private
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between border-t border-gray-400 py-3">
                  <div className="flex items-center gap-2">
                    <span>
                      <HiUpload />
                    </span>
                    <span>
                      <GrStatusGood />
                    </span>
                    <span>
                      <p className="text-[0.6rem]">
                        Checks complete. Copyright-protected content found.
                      </p>
                    </span>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="rounded-full px-2 py-1 bg-white text-black hover:bg-white hover:text-black flex items-center justify-center"
                    >
                      {LodingDuringUpload ? (
                        <>
                          <span>Uploading...</span>
                          <div className="ml-2">
                            <PuffLoader color="blue" size={27} />
                          </div>
                        </>
                      ) : (
                        "Upload Video"
                      )}
                    </Button>
                  </div>
                </div>
              </form>

              {/* Thumbnail Preview Modal */}
              {isReelThumbnailImageOpen && (
                <div className="absolute top-32 left-0 w-full h-full z-10">
                  <span>
                    <IoMdClose
                      className="text-white text-5xl cursor-pointer"
                      onClick={() =>
                        setIsReelThumbnailImageOpen(!isReelThumbnailImageOpen)
                      }
                    />
                  </span>
                  <img
                    src={ReelThumbnailPreview}
                    alt="thumbnail"
                    className="opacity-50 h-96 object-cover"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="w-full relative h-full flex flex-col p-4">
              <form
                className="w-full flex flex-col gap-10"
                onSubmit={handleFormSubmit}
              >
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
                          accept="video/*"
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
                <>
                  <div className="w-full h-24  border border-gray-400 flex items-center gap-10">
                    <div className="relative w-[32%] h-full flex items-center justify-center border-dotted border-2 border-gray-400">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" // Ensures the input is on top
                      />
                      <IoMdPhotos className="text-5xl font-bold" />
                    </div>
                    <div>
                      <img
                        src={ThumbnailPreview}
                        alt="preview"
                        className="w-32 max-w-36 h-full max-h-[99px] object-cover cursor-pointer"
                        onClick={() => setOpenPreviewImage(!openPreviewImage)}
                      />
                    </div>
                  </div>
                </>

                <div className="w-full flex flex-col gap-4">
                  <div className="w-full">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Title
                    </label>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      placeholder="Enter video title"
                      className="w-full h-12 px-2 text-white"
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
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
                      value={formData.description}
                      placeholder="Enter video description"
                      className="w-full h-24 px-2 text-white"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-md">Visibility</p>
                    <div className="mt-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visibility"
                          value="public"
                          id="public"
                          checked={formData.visibility === "public"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              visibility: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="public" className="text-[#eee6e6]">
                          Public
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visibility"
                          value="private"
                          id="private"
                          checked={formData.visibility === "private"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              visibility: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="private" className="text-[#eee6e6]">
                          Private
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between border-t border-gray-400 py-3">
                  <div className="flex items-center gap-2">
                    <span>
                      <HiUpload />
                    </span>
                    <span>
                      <GrStatusGood />
                    </span>
                    <span>
                      <p className="text-[0.6rem]">
                        Checks complete. Copyright-protected content found.
                      </p>
                    </span>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="rounded-full px-2 py-1 bg-white text-black hover:bg-white hover:text-black flex items-center justify-center"
                    >
                      {LodingDuringUpload ? (
                        <>
                          <span>Uploading...</span>
                          <div className="ml-2">
                            <PuffLoader color="blue" size={27} />
                          </div>
                        </>
                      ) : (
                        "Upload"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
              <div
                className={`z-10 ${
                  openPreviewImage ? "block" : "hidden"
                } absolute top-32 left-0 w-full h-full`}
              >
                <span>
                  <IoMdClose
                    className="text-white text-5xl cursor-pointer"
                    onClick={() => setOpenPreviewImage(!openPreviewImage)}
                  />
                </span>
                <img
                  src={ThumbnailPreview}
                  alt="image"
                  className="oppacity-50 h-96 object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// import React, { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
// import { HiUpload } from "react-icons/hi";
// import { PuffLoader } from "react-spinners";
// import { Input } from "../ui/input";
// import { GrStatusGood } from "react-icons/gr";
// import { Button } from "../ui/button";
// import { toast } from "sonner";
// import axios from "axios";

// export default function UploadVideo() {
//   const [loading, setLoading] = useState(false);
//   const [LodingDuringUpload, setLodingDuringUpload] = useState(false);
//   const [selectContentType, setSelectContentType] = useState("UploadVideo");
//   const [ReelsPreview, setReelsPreview] = useState(null);
//   const [ReelsData, setReelsData] = useState({
//     title: "",
//     description: "",
//     visibility: "",
//     ShortVideo: null,
//   });

//   // Handle file change for short video
//   const handleReelsFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLoading(true);
//       setReelsPreview(URL.createObjectURL(file));
//       setReelsData({ ...ReelsData, ShortVideo: file });
//       setLoading(false);
//     }
//   };

//   // Handle form submission
//   const handleReelsSubmit = async (e) => {
//     e.preventDefault();
//     console.log(ReelsData);

//   };

//   return (
//     <Dialog>
//       <DialogTrigger className="text-xs">Upload Video</DialogTrigger>
//       <DialogContent className="w-full h-[90vh] bg-zinc-800 text-white overflow-y-scroll">
//         <div className="h-full w-full flex flex-col gap-4">
//           <div className="w-full h-12 border-b border-zinc-500 flex justify-between px-10 items-center p-2">
//             <button
//               className="text-md font-bold text-zinc-400 hover:border-b-2 hover:text-white"
//               onClick={() => setSelectContentType("UploadVideo")}
//             >
//               Upload Video
//             </button>
//             <button
//               className="text-md font-bold text-zinc-400 hover:border-b-2 hover:text-white"
//               onClick={() => setSelectContentType("UploadReels")}
//             >
//               Upload Reels
//             </button>
//           </div>

//           {selectContentType === "UploadReels" ? (
//             <div className="w-full h-full flex flex-col p-4">
//               <form
//                 className="w-full flex flex-col gap-10"
//                 onSubmit={handleReelsSubmit}
//               >
//                 <div className="flex flex-col items-center gap-2">
//                   <div className="relative rounded-full w-24 h-24 flex items-center justify-center bg-zinc-900">
//                     {loading ? (
//                       <PuffLoader color="#ffffff" size={60} />
//                     ) : ReelsPreview ? (
//                       <video
//                         src={ReelsPreview}
//                         controls
//                         className="rounded-full w-24 h-24 object-cover"
//                       />
//                     ) : (
//                       <>
//                         <HiUpload className="text-5xl font-bold" />
//                         <input
//                           type="file"
//                           accept="video/*"
//                           className="absolute inset-0 opacity-0 cursor-pointer"
//                           onChange={handleReelsFileChange}
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
//                       Title
//                     </label>
//                     <Input
//                       type="text"
//                       name="title"
//                       value={ReelsData.title}
//                       placeholder="Enter video title"
//                       className="w-full h-12 px-2 text-white"
//                       onChange={(e) =>
//                         setReelsData({ ...ReelsData, title: e.target.value })
//                       }
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
//                       value={ReelsData.description}
//                       placeholder="Enter video description"
//                       className="w-full h-24 px-2 text-white"
//                       onChange={(e) =>
//                         setReelsData({
//                           ...ReelsData,
//                           description: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   <div>
//                     <p className="font-semibold text-md">Visibility</p>
//                     <div className="mt-4">
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="radio"
//                           name="visibility"
//                           value="public"
//                           id="public"
//                           checked={ReelsData.visibility === "public"}
//                           onChange={(e) =>
//                             setReelsData({
//                               ...ReelsData,
//                               visibility: e.target.value,
//                             })
//                           }
//                         />
//                         <label htmlFor="public" className="text-[#eee6e6]">
//                           Public
//                         </label>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="radio"
//                           name="visibility"
//                           value="private"
//                           id="private"
//                           checked={ReelsData.visibility === "private"}
//                           onChange={(e) =>
//                             setReelsData({
//                               ...ReelsData,
//                               visibility: e.target.value,
//                             })
//                           }
//                         />
//                         <label htmlFor="private" className="text-[#eee6e6]">
//                           Private
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-full flex justify-between border-t border-gray-400 py-3">
//                   <div className="flex items-center gap-2">
//                     <span>
//                       <HiUpload />
//                     </span>
//                     <span>
//                       <GrStatusGood />
//                     </span>
//                     <span>
//                       <p className="text-[0.6rem]">
//                         Checks complete. Copyright-protected content found.
//                       </p>
//                     </span>
//                   </div>
//                   <div>
//                     <Button
//                       type="submit"
//                       className="rounded-full px-2 py-1 bg-white text-black hover:bg-white hover:text-black flex items-center justify-center"
//                     >
//                       {LodingDuringUpload ? (
//                         <>
//                           <span>Uploading...</span>
//                           <div className="ml-2">
//                             <PuffLoader color="blue" size={27} />
//                           </div>
//                         </>
//                       ) : (
//                         "Upload"
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

//  today up to here
/*

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
  const [LongVideo, setLongVideo] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "",
  });

  const handleFileChange = (e) => {
    const file = e.target?.files[0];
    if (file) {
      setLoading(true);
      const fileURL = URL.createObjectURL(file);
      setTimeout(() => {
        setFilePreview(fileURL);
        setLongVideo({ ...LongVideo, LongVideo: fileURL });
        setLoading(false);
      }, 2000);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(LongVideo);
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
            <form
              className="w-full flex flex-col gap-10"
              onSubmit={handleFormSubmit}
            >
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
                    value={formData.title}
                    placeholder="Title"
                    className="w-full h-12 px-2 text-white"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
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
                    value={formData.description}
                    placeholder="Tell viewers about your video (Type @ to mention a channel)"
                    className="w-full h-24 px-2 text-white"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
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
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        id="public"
                        checked={formData.visibility === "public"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            visibility: e.target.value,
                          })
                        }
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
                        checked={formData.visibility === "private"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            visibility: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="private" className="text-[#eee6e6]">
                        This is private
                      </label>
                    </div>
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
                  <Button
                    type="submit"
                    className="rounded-full bg-white px-4 py-1 text-black"
                  >
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
}*/
// import React, { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
// import { HiUpload } from "react-icons/hi";
// import { PuffLoader } from "react-spinners"; // Example loader, install react-spinners
// import { Input } from "../ui/input";
// import { GrStatusGood } from "react-icons/gr";
// import { Button } from "../ui/button";
// import { readFileAsDataURL } from "@/lib/utils";
// import { toast } from "sonner";
// import axios from "axios";

// export default function UploadVideo() {
//   const [filePreview, setFilePreview] = useState(null); // For showing the video preview
//   const [loading, setLoading] = useState(false); // For showing loader during file processing
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     visibility: "",
//     LongVideo: "", // This will store the DataURI of the uploaded video
//   });

//   const handleFileChange = async (e) => {
//     const file = e.target?.files[0];
//     if (file) {
//       setLoading(true); // Show loading spinner
//       try {
//         const dataUrl = await readFileAsDataURL(file); // Wait for the DataURI conversion
//         setFilePreview(URL.createObjectURL(file)); // For video preview
//         setFormData({ ...formData, LongVideo: dataUrl }); // Storing the DataURI
//       } catch (error) {
//         console.error("Error converting file to DataURI", error);
//       }
//       setLoading(false); // Stop loading spinner
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!formData.LongVideo) {
//         toast.error("Please upload a video");
//         return;
//       }
//       if (!formData.description) {
//         toast.error("Please enter a description");
//         return;
//       }
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("description", formData.description);
//       data.append("visibility", formData.visibility);
//       data.append("LongVideo", formData.LongVideo); // Assuming LongVideo is a File

//       const res = await axios.post(
//         "http://localhost:4000/youtube_studio/api/v1/post/long_video/upload",
//         data,
//         {
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message || "Video uploaded successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//           style: {
//             border: "1px solid #f44336",
//             background: "#0000ff",
//             color: "#ffffff",
//           },
//         });
//       } else {
//         toast.error(res.data.message || "Upload failed!", {
//           position: "top-right",
//           autoClose: 3000,
//           style: {
//             border: "1px solid #f44336",
//             background: "#ffebee",
//             color: "#f44336",
//           },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Upload failed!", {
//         position: "top-right",
//         autoClose: 3000,
//         style: {
//           border: "1px solid #f44336",
//           background: "#ffebee",
//           color: "#f44336",
//         },
//       });
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger className="text-xs">Upload Video</DialogTrigger>
//       <DialogContent className="w-full h-[90vh] bg-zinc-800 text-white overflow-y-scroll">
//         <div className="h-full w-full flex flex-col gap-4">
//           <div className="w-full h-12 border-b border-zinc-500 flex items-center p-2">
//             <p className="text-md font-bold">Upload Video</p>
//           </div>

//           <div className="w-full h-full flex flex-col p-4">
//             <form
//               className="w-full flex flex-col gap-10"
//               onSubmit={handleFormSubmit}
//             >
//               <div className="flex flex-col items-center gap-2">
//                 <div className="relative rounded-full w-24 h-24 flex items-center justify-center bg-zinc-900">
//                   {loading ? (
//                     <PuffLoader color="#ffffff" size={60} />
//                   ) : filePreview ? (
//                     <video
//                       src={filePreview}
//                       controls
//                       className="rounded-full w-24 h-24 object-cover"
//                     />
//                   ) : (
//                     <>
//                       <HiUpload className="text-5xl font-bold" />
//                       <input
//                         type="file"
//                         accept="video/*"
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         onChange={handleFileChange}
//                       />
//                     </>
//                   )}
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-normal font-semibold text-zinc-200">
//                     Drag and drop video files to upload
//                   </p>
//                   <p className="text-[0.6rem] text-zinc-400">
//                     Your videos will be private until you publish them.
//                   </p>
//                 </div>
//               </div>

//               <div className="w-full flex flex-col gap-4">
//                 <div className="w-full">
//                   <label
//                     htmlFor="title"
//                     className="block text-sm font-medium text-white mb-1"
//                   >
//                     Title
//                   </label>
//                   <Input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     placeholder="Enter video title"
//                     className="w-full h-12 px-2 text-white"
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="w-full">
//                   <label
//                     htmlFor="description"
//                     className="block text-sm font-medium text-white mb-1"
//                   >
//                     Description
//                   </label>
//                   <Input
//                     type="text"
//                     name="description"
//                     value={formData.description}
//                     placeholder="Enter video description"
//                     className="w-full h-24 px-2 text-white"
//                     onChange={(e) =>
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-md">Visibility</p>
//                   <div className="mt-4">
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="visibility"
//                         value="public"
//                         id="public"
//                         checked={formData.visibility === "public"}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             visibility: e.target.value,
//                           })
//                         }
//                       />
//                       <label htmlFor="public" className="text-[#eee6e6]">
//                         Public
//                       </label>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="visibility"
//                         value="private"
//                         id="private"
//                         checked={formData.visibility === "private"}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             visibility: e.target.value,
//                           })
//                         }
//                       />
//                       <label htmlFor="private" className="text-[#eee6e6]">
//                         Private
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full flex justify-between border-t border-gray-400 py-3">
//                 <div className="flex items-center gap-2">
//                   <span>
//                     <HiUpload />
//                   </span>
//                   <span>
//                     <GrStatusGood />
//                   </span>
//                   <span>
//                     <p className="text-[0.6rem]">
//                       Checks complete. Copyright-protected content found.
//                     </p>
//                   </span>
//                 </div>
//                 <div>
//                   <Button
//                     type="submit"
//                     className="rounded-full bg-white px-4 py-1 text-black"
//                   >
//                     Upload
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// import React, { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
// import { HiUpload } from "react-icons/hi";
// import { PuffLoader } from "react-spinners"; // Example loader, install react-spinners
// import { Input } from "../ui/input";
// import { GrStatusGood } from "react-icons/gr";
// import { Button } from "../ui/button";
// import { toast } from "sonner";
// import axios from "axios";

// export default function UploadVideo() {
//   const [filePreview, setFilePreview] = useState(null); // For showing the video preview
//   const [loading, setLoading] = useState(false); // For showing loader during file processing
//   const [LodingDuringUpload, setLodingDuringUpload] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     visibility: "",
//     LongVideo: null, // Store the file object instead of DataURI
//   });

//   const handleFileChange = async (e) => {
//     const file = e.target?.files[0];
//     if (file) {
//       setLoading(true); // Show loading spinner
//       try {
//         setFilePreview(URL.createObjectURL(file)); // For video preview
//         setFormData({ ...formData, LongVideo: file }); // Storing the file object
//       } catch (error) {
//         console.error("Error processing the file", error);
//       }
//       setLoading(false); // Stop loading spinner
//     }
//   };

//   // const handleFormSubmit = async (e) => {
//   //   setLodingDuringUpload(true); // Start loading
//   //   e.preventDefault();

//   //   try {
//   //     if (!formData.LongVideo) {
//   //       toast.error("Please upload a video");
//   //       setLodingDuringUpload(false); // Stop loading if error occurs
//   //       return;
//   //     }
//   //     if (!formData.description) {
//   //       toast.error("Please enter a description");
//   //       setLodingDuringUpload(false); // Stop loading if error occurs
//   //       return;
//   //     }

//   //     const data = new FormData();
//   //     data.append("title", formData.title);
//   //     data.append("description", formData.description);
//   //     data.append("visibility", formData.visibility);
//   //     data.append("LongVideo", formData.LongVideo); // Append file object here

//   //     const res = await axios.post(
//   //       "http://localhost:4000/youtube_studio/api/v1/post/long_video/upload",
//   //       data,
//   //       {
//   //         withCredentials: true,
//   //       }
//   //     );

//   //     if (res.data.success) {
//   //       toast.success(res.data.message || "Video uploaded successfully!", {
//   //         position: "top-right",
//   //         autoClose: 3000,
//   //         style: {
//   //           border: "1px solid #f44336",
//   //           background: "#0000ff",
//   //           color: "#ffffff",
//   //         },
//   //       });
//   //     } else {
//   //       toast.error(res.data.message || "Upload failed!", {
//   //         position: "top-right",
//   //         autoClose: 3000,
//   //         style: {
//   //           border: "1px solid #f44336",
//   //           background: "#ffebee",
//   //           color: "#f44336",
//   //         },
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error(error.response?.data?.message || "Upload failed!", {
//   //       position: "top-right",
//   //       autoClose: 3000,
//   //       style: {
//   //         border: "1px solid #f44336",
//   //         background: "#ffebee",
//   //         color: "#f44336",
//   //       },
//   //     });
//   //   } finally {
//   //     setLodingDuringUpload(false); // Stop loading in the `finally` block
//   //   }
//   // };

//   const handleFormSubmit = async (e) => {
//     setLodingDuringUpload(true); // Start loading
//     e.preventDefault();

//     try {
//       if (!formData.LongVideo) {
//         toast.error("Please upload a video");
//         return;
//       }
//       if (!formData.description) {
//         toast.error("Please enter a description");
//         return;
//       }

//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("description", formData.description);
//       data.append("visibility", formData.visibility);
//       data.append("LongVideo", formData.LongVideo); // Append file object here

//       const res = await axios.post(
//         "http://localhost:4000/youtube_studio/api/v1/post/long_video/upload",
//         data,
//         {
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message || "Video uploaded successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//           style: {
//             border: "1px solid #f44336",
//             background: "#0000ff",
//             color: "#ffffff",
//           },
//         });
//       } else {
//         toast.error(res.data.message || "Upload failed!", {
//           position: "top-right",
//           autoClose: 3000,
//           style: {
//             border: "1px solid #f44336",
//             background: "#ffebee",
//             color: "#f44336",
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Upload error:", error); // Added error logging
//       toast.error(error.response?.data?.message || "Upload failed!", {
//         position: "top-right",
//         autoClose: 3000,
//         style: {
//           border: "1px solid #f44336",
//           background: "#ffebee",
//           color: "#f44336",
//         },
//       });
//     } finally {
//       setLodingDuringUpload(false); // Stop loading in the `finally` block
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger className="text-xs">Upload Video</DialogTrigger>
//       <DialogContent className="w-full h-[90vh] bg-zinc-800 text-white overflow-y-scroll">
//         <div className="h-full w-full flex flex-col gap-4">
//           <div className="w-full h-12 border-b border-zinc-500 flex items-center p-2">
//             <p className="text-md font-bold">Upload Video</p>
//           </div>

//           <div className="w-full h-full flex flex-col p-4">
//             <form
//               className="w-full flex flex-col gap-10"
//               onSubmit={handleFormSubmit}
//             >
//               <div className="flex flex-col items-center gap-2">
//                 <div className="relative rounded-full w-24 h-24 flex items-center justify-center bg-zinc-900">
//                   {loading ? (
//                     <PuffLoader color="#ffffff" size={60} />
//                   ) : filePreview ? (
//                     <video
//                       src={filePreview}
//                       controls
//                       className="rounded-full w-24 h-24 object-cover"
//                     />
//                   ) : (
//                     <>
//                       <HiUpload className="text-5xl font-bold" />
//                       <input
//                         type="file"
//                         accept="video/*"
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         onChange={handleFileChange}
//                       />
//                     </>
//                   )}
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-normal font-semibold text-zinc-200">
//                     Drag and drop video files to upload
//                   </p>
//                   <p className="text-[0.6rem] text-zinc-400">
//                     Your videos will be private until you publish them.
//                   </p>
//                 </div>
//               </div>

//               <div className="w-full flex flex-col gap-4">
//                 <div className="w-full">
//                   <label
//                     htmlFor="title"
//                     className="block text-sm font-medium text-white mb-1"
//                   >
//                     Title
//                   </label>
//                   <Input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     placeholder="Enter video title"
//                     className="w-full h-12 px-2 text-white"
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="w-full">
//                   <label
//                     htmlFor="description"
//                     className="block text-sm font-medium text-white mb-1"
//                   >
//                     Description
//                   </label>
//                   <Input
//                     type="text"
//                     name="description"
//                     value={formData.description}
//                     placeholder="Enter video description"
//                     className="w-full h-24 px-2 text-white"
//                     onChange={(e) =>
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-md">Visibility</p>
//                   <div className="mt-4">
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="visibility"
//                         value="public"
//                         id="public"
//                         checked={formData.visibility === "public"}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             visibility: e.target.value,
//                           })
//                         }
//                       />
//                       <label htmlFor="public" className="text-[#eee6e6]">
//                         Public
//                       </label>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="visibility"
//                         value="private"
//                         id="private"
//                         checked={formData.visibility === "private"}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             visibility: e.target.value,
//                           })
//                         }
//                       />
//                       <label htmlFor="private" className="text-[#eee6e6]">
//                         Private
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full flex justify-between border-t border-gray-400 py-3">
//                 <div className="flex items-center gap-2">
//                   <span>
//                     <HiUpload />
//                   </span>
//                   <span>
//                     <GrStatusGood />
//                   </span>
//                   <span>
//                     <p className="text-[0.6rem]">
//                       Checks complete. Copyright-protected content found.
//                     </p>
//                   </span>
//                 </div>
//                 {/* <div>
//                   <Button
//                     type="submit"
//                     className="rounded-full bg-white px-4 py-1 text-black"
//                   >
//                     {
//                       LodingDuringUpload ? ("Uploading....." <div>
//                         <PuffLoader color="#ffffff" size={20} /></div> ):( "Upload Video")
//                     }
//                   </Button>
//                 </div> */}
//                 <div>
//                   <Button
//                     type="submit"
//                     className="rounded-full px-2 py-1 bg-white text-black hover:bg-white hover:text-black flex items-center justify-center"
//                   >
//                     {LodingDuringUpload ? (
//                       <>
//                         <span>Uploading...</span>
//                         <div className="ml-2">
//                           <PuffLoader color="blue" size={27} />
//                         </div>
//                       </>
//                     ) : (
//                       "Upload"
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
