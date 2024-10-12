import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function UploadVideo() {
  return (
    <Dialog>
      <DialogTrigger className="text-xs">Upload Video</DialogTrigger>
      <DialogContent className="w-[100%] h-[60%]">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          aut quisquam, eligendi harum dolor, sequi totam, perferendis nobis
          architecto vel accusantium quis sit eos autem quasi qui! Animi, porro
          voluptatum?
        </div>
      </DialogContent>
    </Dialog>
  );
}
