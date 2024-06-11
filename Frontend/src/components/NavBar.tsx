import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, ThemeProvider } from "@mui/material";
import { Home as HomeIcon, AccountCircle as AccountCircleIcon, ExitToApp as ExitToAppIcon, Person as PersonIcon, Assignment as AssignmentIcon } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import theme from "./Theme";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user, AuthLogout } = authContext;
  console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                GamerDen
              </Link>
            </Typography>
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton color="inherit" aria-label="home">
              <HomeIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                Home
              </Typography>
            </IconButton>
          </Link>
          {user ? (
            <>
              <Link
                to="/account"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <IconButton color="inherit" aria-label="account">
                  <AccountCircleIcon />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    Profile
                  </Typography>
                </IconButton>
              </Link>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <IconButton
                  color="inherit"
                  aria-label="logout"
                  onClick={() => {
                    AuthLogout();
                  }}
                >
                  <ExitToAppIcon />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    Logout
                  </Typography>
                </IconButton>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <IconButton color="inherit" aria-label="sign-in">
                  <PersonIcon />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    Sign In
                  </Typography>
                </IconButton>
              </Link>
              <Link
                to="/sign-up"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <IconButton color="inherit" aria-label="sign-up">
                  <AssignmentIcon />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    Sign Up
                  </Typography>
                </IconButton>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
