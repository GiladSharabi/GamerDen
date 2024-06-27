import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, ThemeProvider, Grid } from "@mui/material";
import { Home as HomeIcon, Login, Edit } from "@mui/icons-material";
import theme from "../Theme";

const NavBarLoggedout = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar className="flex justify-between">
          <Grid className="flex items-center">
            <IconButton >
              <Typography variant="h6">
                <Link to="/">
                  GamerDen
                </Link>
              </Typography>
            </IconButton>
          </Grid>
          <Grid className="flex items-center">

            <Link to="/">
              <IconButton>
                <HomeIcon />
                <Typography sx={{ marginLeft: 1 }}>
                  Home
                </Typography>
              </IconButton>
            </Link>

            <Link to="/login">
              <IconButton>
                <Login />
                <Typography sx={{ marginLeft: 1 }}>
                  Sign In
                </Typography>
              </IconButton>
            </Link>

            <Link to="/sign-up">
              <IconButton>
                <Edit />
                <Typography sx={{ marginLeft: 1 }}>
                  Sign Up
                </Typography>
              </IconButton>
            </Link>

          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider >
  );
};

export default NavBarLoggedout;
