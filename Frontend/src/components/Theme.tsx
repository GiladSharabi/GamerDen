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
  typography: {
    fontFamily: "Arial",
    h6: {
      fontWeight: 200,
      color: "white",
    },
  }
});

export default theme;
