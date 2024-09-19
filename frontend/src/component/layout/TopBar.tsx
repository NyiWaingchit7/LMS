import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-10  bg-white px-5 py-4 flex justify-end shadow-lg ">
      <Button
        variant="contained"
        sx={{ fontSize: "12px", textTransform: "capitalize" }}
        color="secondary"
        size="small"
        onClick={() => {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }}
      >
        Log out
      </Button>
    </header>
  );
};
