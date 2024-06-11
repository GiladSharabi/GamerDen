import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import { Login, Edit, VideogameAsset } from "@mui/icons-material";

const NavBarLoggedout = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                GamerDen
              </Link>
            </Typography>
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton color="inherit" aria-label="home">
              <HomeIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                Home
              </Typography>
            </IconButton>
          </Link>

          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton color="inherit" aria-label="sign-in">
              <Login />
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
              <Edit />
              <Typography variant="body1" sx={{ ml: 1 }}>
                Sign Up
              </Typography>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBarLoggedout;
