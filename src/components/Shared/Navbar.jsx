import { useContext, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import userImage from "../../assets/user.gif";

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, userLogout } = useContext(AuthContext);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen( !profileDropdownOpen);
  };

  const handleLogout = () => {
    userLogout()
      .then(() => {
        toast.success("Logout Successful!");
      })
      .catch((error) => {
        toast.error("Error logging out! " + error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
    </>
  );

  return (
    <div className="px-4 lg:px-6">
      <div className="navbar justify-between py-2">
        {/* Navbar Start */}
        <div className="flex items-center">
          <Link
            to="/"
            className="hidden lg:block text-4xl font-bold tracking-tight relative group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-30 group-hover:opacity-70 transition-opacity duration-300"></span>
            <div className="relative text-gray-600 group-hover:text-white transition-colors duration-300">
              <span className="text-blue-500">S</span>wift
              <span className="text-purple-500">P</span>arcel
            </div>
          </Link>

          <div className="dropdown lg:hidden">
            <button
              onClick={toggleDropdown}
              className="btn btn-ghost"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10">
                <li className="font-bold italic text-xl my-2 mx-auto tracking-tight relative group">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-30 group-hover:opacity-70 transition-opacity duration-300"></span>
                  <Link
                    to={"/"}
                    className="flex gap-0 relative text-gray-600 group-hover:text-white transition-colors duration-300"
                  >
                    <span className="text-blue-500">S</span>wift
                    <span className="text-purple-500">P</span>arcel
                  </Link>
                </li>
                {links}
              </ul>
            )}
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-6 font-semibold">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center space-x-4">
          {/* <p className="text-sm text-gray-500">{user && user.email}</p> */}

          {/* Theme Toggle */}
          <button
            className="btn btn-ghost text-2xl"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <FaMoon className="text-primary transition-transform duration-300 hover:scale-110" />
            ) : (
              <FaSun className="text-yellow-500 transition-transform duration-300 hover:scale-110" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end relative">
            <button
              onClick={toggleProfileDropdown}
              className="btn btn-ghost btn-circle avatar"
              aria-label="Toggle Profile Dropdown"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border border-gray-300 bg-gray-200">
                {user && user.email ? (
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile"
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={userImage} alt="" />
                )}
              </div>
            </button>
            {profileDropdownOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  {user && user?.email ? (
                    <button
                      onClick={handleLogout}
                      className="text-secondary font-semibold"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" className="text-primary font-semibold">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
