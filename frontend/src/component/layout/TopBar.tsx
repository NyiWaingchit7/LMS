import { Button } from "@mui/material";

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-10 overflow-y-hidden bg-white px-5 py-4 flex justify-end shadow-lg ">
      <Button
        variant="contained"
        sx={{ fontSize: "12px", textTransform: "capitalize" }}
        color="secondary"
        size="small"
      >
        Log out
      </Button>
    </header>
  );
};
