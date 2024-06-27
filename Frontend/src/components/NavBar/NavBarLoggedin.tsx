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
          <IconButton>
            <Typography variant="h6">
              <Link to="/">
                GamerDen
              </Link>
            </Typography>
          </IconButton>
          <div style={{ flexGrow: 1 }} />

          <Link to={"/dashboard"}>
            <IconButton>
              <HomeIcon />
              <Typography sx={{ ml: 1 }}>
                Home
              </Typography>
            </IconButton>
          </Link>

          <>
            <Link to="/account">
              <IconButton>
                <AccountCircleIcon />
                <Typography sx={{ ml: 1 }}>
                  Profile
                </Typography>
              </IconButton>
            </Link>

            <Link to="/">
              <IconButton onClick={() => { AuthLogout() }} >
                <MdLogout />
                <Typography sx={{ ml: 1 }}>
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