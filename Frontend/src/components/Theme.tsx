import { createTheme } from "@mui/material";
import { blue, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blue[300],
    },
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
  },
});

export default theme;
