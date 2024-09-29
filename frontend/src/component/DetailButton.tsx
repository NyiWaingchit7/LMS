import ListIcon from "@mui/icons-material/List";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

interface Props {
  path: string;
  id: number;
}
export const DetailButton = ({ path, id }: Props) => {
  return (
    <div className="my-5">
      <div className="flex items-center justify-end gap-2">
        <Link to={`/${path}`}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            endIcon={<ListIcon />}
          >
            List
          </Button>
        </Link>
        <Link to={`/${path}/${id}/edit`}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            endIcon={<BorderColorIcon />}
          >
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};
