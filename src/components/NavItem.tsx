import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
type props = {
  text: string;
  to: string;
  isCollapseMenu?: boolean;
};
const NavItem = ({ text, to = "/", isCollapseMenu = false }: props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  return (
    <Link to={to}>
      <li
        onClick={handleClick}
        className={`hover:text-fuchsia-600 transtion border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer ${
          isCollapseMenu ? "mb-3" : ""
        }`}
      >
        {text}
      </li>
    </Link>
  );
};

export default NavItem;
