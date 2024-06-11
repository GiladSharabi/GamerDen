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
import NavBarLoggedin from "./NavBarLoggedin";
import NavBarLoggedout from "./NavBarLoggedout";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  return user ? <NavBarLoggedin /> : <NavBarLoggedout />;
};

export default Navbar;
