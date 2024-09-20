import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  path: string;
  handleDelete: (data: any) => void;
}

export const TableAction = ({ id, path, handleDelete }: Props) => {
  return (
    <div>
      <Link to={`/${path}/${id}`}>
        <IconButton size="small">
          <VisibilityIcon />
        </IconButton>
      </Link>
      <Link to={`/${path}/${id}`}>
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton size="small" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
