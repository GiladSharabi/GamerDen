import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ffcc80",
    },
    background: {
      default: "#303030",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

export default theme;
