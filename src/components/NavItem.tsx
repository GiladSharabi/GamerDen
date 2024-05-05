import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
type props = {
  text: string;
  to: string;
};
const NavItem = ({ text, to = "/" }: props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${to}`);
  };

  return (
    <Link to={to}>
      <li
        onClick={handleClick}
        className="hover:text-fuchsia-600 transtion border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
      >
        {text}
      </li>
    </Link>
  );
};

export default NavItem;
