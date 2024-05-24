import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { ReactNode } from "react";

export enum iconPosition {
  Left,
  Right,
}

type props = {
  text: string;
  to: string;
  isCollapseMenu?: boolean;
  icon?: ReactNode;
  iconPos?: iconPosition;
};
const NavItem = ({
  text,
  to = "/",
  isCollapseMenu = false,
  icon,
  iconPos,
}: props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  return (
    <Link to={to}>
      <li
        onClick={handleClick}
        className={`  hover:text-fuchsia-600 transtion border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer ${
          isCollapseMenu ? "mb-3" : "flex item-center"
        }`}
      >
        {
          <span className="mr-2 mt-1">
            {iconPos === iconPosition.Left && icon}
          </span>
        }
        {text}
        {
          <span className="ml-2 mt-1">
            {iconPos === iconPosition.Right && icon}
          </span>
        }
      </li>
    </Link>
  );
};

export default NavItem;
