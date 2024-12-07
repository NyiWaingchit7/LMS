import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Props {
  id: number;
  path: string;
  handleDelete?: (data: any) => void;
  edit?: boolean;
  show?: boolean;
  deleted?: boolean;
}

export const TableAction = ({
  id,
  path,
  handleDelete,
  edit = true,
  show = true,
  deleted = true,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {show && (
        <Link to={`/${path}/${id}`} title="view">
          <IconButton size="small">
            <VisibilityIcon />
          </IconButton>
        </Link>
      )}
      {edit && (
        <Link to={`/${path}/${id}/edit`} title="edit">
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </Link>
      )}
      {deleted && (
        <IconButton size="small" onClick={() => setOpen(true)} title="delete">
          <DeleteIcon />
        </IconButton>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent sx={{ minWidth: "30rem" }}>
          <DialogContentText sx={{ fontSize: "15px" }}>
            Are you sure to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="flex justify-end items-center gap-2">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={handleDelete}
            >
              confirm
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
