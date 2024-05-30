import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { iconPosition } from "./NavItem";
import NavItem from "./NavItem";
import { isLoggedIn } from "../App";

const Nav = () => {
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(!isClick);
  };
  const collapseMenuContent = (
    <>
      <div
        className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition"
        onMouseLeave={handleClick}
      >
        <ul className=" text-center text-xl p-20">
          <NavItem
            text="Home"
            to={isLoggedIn ? "/user-loggedin-homepage" : "/"}
            isCollapseMenu={true}
          />
          {isLoggedIn ? (
            <>
              <NavItem text="My Account" to="/account" isCollapseMenu={true} />
              <NavItem text="Logout" to="/" isCollapseMenu={true} />
            </>
          ) : (
            <>
              <NavItem text="Login" to="/login" isCollapseMenu={true} />
              <NavItem text="Sign Up" to="/sign-up" isCollapseMenu={true} />
            </>
          )}
        </ul>
      </div>
    </>
  );
  return (
    <nav className="bg-slate-900 mb-10">
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4">
        <div className="flex items-center flex-1 -ml-12">
          <span className="text-3xl font-bold">GamerDen</span>
        </div>
        <div className="lg:flex md:flex lg:flex-1 items center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <NavItem
                text="Home"
                to={isLoggedIn ? "/user-loggedin-homepage" : "/"}
              />
              {isLoggedIn ? (
                <>
                  <NavItem
                    text="My Account"
                    to="/account"
                    icon={<CgProfile />}
                    iconPos={iconPosition.Left}
                  />
                  <NavItem
                    text="Logout"
                    to="/"
                    icon={<HiOutlineLogout />}
                    iconPos={iconPosition.Right}
                  />
                </>
              ) : (
                <>
                  <NavItem text="Login" to="/login" />
                  <NavItem text="Sign Up" to="/sign-up" />
                </>
              )}
            </ul>
          </div>
        </div>
        <div>{isClick && collapseMenuContent}</div>
        <button className="block sm:hidden transition " onClick={handleClick}>
          {isClick ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
