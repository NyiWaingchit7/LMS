import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
  src: string;
}

export const Image = ({ src }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <img
        src={src}
        className="cursor-pointer max-w-14 max-h-36"
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
          <img src={src} className="max-w-44 h-fit" />
        </DialogContent>
      </Dialog>
    </div>
  );
};
