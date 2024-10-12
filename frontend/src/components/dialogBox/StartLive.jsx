import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function StartLive() {
  return (
    <Dialog>
      <DialogTrigger className="text-xs">Start Live</DialogTrigger>
      <DialogContent>
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
