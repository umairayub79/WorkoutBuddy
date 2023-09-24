import React, { useContext } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { MdMenu, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";
import useToast from "../hooks/useToast";
import { decodeToken } from "react-jwt";

function NavList({ currentUser, logoutUser }) {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {currentUser ? (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            Welcome, {currentUser.username}
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <button
              onClick={logoutUser}
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              Logout
            </button>
          </Typography>
        </>
      ) : (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <NavLink
              to={"/login"}
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              Login
            </NavLink>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <NavLink
              to="/signup"
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              Register
            </NavLink>
          </Typography>
        </>
      )}
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const showToast = useToast();
  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    showToast("success", "User logged out", 100, 1500);
  };

  const decodeUser = (token) => {
    if (!token) {
      return undefined;
    } else {
      const res = decodeToken(token);
      console.log(res);
      return { username: res?.username };
    }
  };
  const currentUser = decodeUser(state.token);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="p" variant="h6" className="mr-4 cursor-pointer py-1.5">
          <NavLink to="/">WorkoutBuddy</NavLink>
        </Typography>
        <div className="hidden lg:block">
          <NavList currentUser={currentUser} logoutUser={logoutUser} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <MdClose className="h-6 w-6" />
          ) : (
            <MdMenu className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList currentUser={currentUser} logoutUser={logoutUser} />
      </Collapse>
    </Navbar>
  );
}
