import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, ThemeProvider } from "@mui/material";
import { Home as HomeIcon, Login, Edit } from "@mui/icons-material";
import theme from "../Theme";

const NavBarLoggedout = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Typography variant="h6" component="div">
                <Link
                  to="/"
                  className="no-underline text-inherit"
                >
                  GamerDen
                </Link>
              </Typography>
            </IconButton>
          </div>
          <div className="flex items-center">
            <Link to="/" className="no-underline text-inherit">
              <IconButton color="inherit" aria-label="home">
                <HomeIcon />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                  Home
                </Typography>
              </IconButton>
            </Link>
            <Link to="/login" className="no-underline text-inherit">
              <IconButton color="inherit" aria-label="sign-in">
                <Login />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                  Sign In
                </Typography>
              </IconButton>
            </Link>
            <Link to="/sign-up" className="no-underline text-inherit">
              <IconButton color="inherit" aria-label="sign-up">
                <Edit />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                  Sign Up
                </Typography>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider >
  );
};

export default NavBarLoggedout;
