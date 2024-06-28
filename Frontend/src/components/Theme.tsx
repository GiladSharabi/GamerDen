import { createTheme } from "@mui/material";
import { blue, green } from '@mui/material/colors';

// Extend the Palette interface to include the custom color
declare module '@mui/material/styles' {
  interface Palette {
    navbar: Palette['primary'];
  }
  interface PaletteOptions {
    navbar?: PaletteOptions['primary'];
  }
}

// Extend the AppBarProps interface to include the custom color
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    navbar: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      main: '#000000',
    },
    navbar: {
      main: '#ffffff',
    },
  },
});

export default theme;
