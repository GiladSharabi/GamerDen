import { createTheme } from "@mui/material";
import { blue, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blue[900],
    },
    text: {
      primary: '#ffffff',
    },
  },
});

export default theme;
