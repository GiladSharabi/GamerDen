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
