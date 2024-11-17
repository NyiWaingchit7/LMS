import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import useDebounce from "../utils/useDebounce";
import { useEffect, useState } from "react";

interface Props {
  path: string;
}

export const SearchButton = ({ path }: Props) => {
  const [searchKey, setSearchKey] = useState<string>("");

 useDebounce(searchKey, path);

  useEffect(() => {
    return () => {
      setSearchKey("");
    };
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
          placeholder="Search..."
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "info.dark",
              },
              "&:hover fieldset": {
                borderColor: "info.dark",
              },
              "&.Mui-focused fieldset": {
                borderColor: "info.dark",
              },
              bgcolor: "white",
            },
          }}
          slotProps={{
            input: {
              startAdornment: <SearchIcon className="me-2" />,
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
