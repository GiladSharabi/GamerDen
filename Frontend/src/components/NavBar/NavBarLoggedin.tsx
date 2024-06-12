import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import { MdLogout } from "react-icons/md";

const NavBarLoggedin = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { AuthLogout } = authContext;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to={"/dashboard"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                GamerDen
              </Link>
            </Typography>
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <Link
            to={"/dashboard"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton color="inherit" aria-label="home">
              <HomeIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                Home
              </Typography>
            </IconButton>
          </Link>

          <>
            <Link
              to="/account"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton color="inherit" aria-label="profile">
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
                <MdLogout />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Logout
                </Typography>
              </IconButton>
            </Link>
          </>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBarLoggedin;