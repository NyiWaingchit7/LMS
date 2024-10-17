import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#568DCA",
    },
    secondary: {
      main: "#000000",
    },
    info: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    fontSize: 15,
    fontWeightRegular: "500",
  },
});
