import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface Props {
  src: string;
}

export const Image = ({ src }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <img
        src={src}
        className="cursor-pointer max-w-14 h-12 overflow-hidden"
        onClick={() => setOpen(true)}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: { backgroundColor: "transparent", boxShadow: "none" },
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <img src={src} className="w-56" />
        </DialogContent>
      </Dialog>
    </div>
  );
};
