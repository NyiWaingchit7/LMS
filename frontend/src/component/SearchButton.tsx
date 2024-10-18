import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import useDebounce from "../utils/useDebounce";
import { useEffect } from "react";

interface Props {
  searchKey: string;
  setSearchKey: (data?: any) => void;
  path: string;
  getFunction: (data?: any) => void;
}

export const SearchButton = ({
  searchKey,
  setSearchKey,
  path,
  getFunction,
}: Props) => {
  const debounceValue = useDebounce(searchKey, 500, getFunction);
  useEffect(() => {
    if (!searchKey) {
      setSearchKey(debounceValue);
    }
  }, []);

  return (
    <div className="flex justify-between items-center mt-5">
      <div>
        <TextField
          size="small"
          autoComplete="off"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          value={searchKey}
          slotProps={{
            input: {
              startAdornment: <SearchIcon />,
            },
          }}
        />
      </div>
      <div className="flex justify-end">
        <Link to={`/${path}/create`}>
          <Button variant="contained">Create</Button>
        </Link>
      </div>
    </div>
  );
};
