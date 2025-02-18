/* eslint-disable react/prop-types */
import {
  FaBox,
  FaUser,
  FaTruck,
  FaList,
  FaUsers,
  FaChartBar,
  FaStar,
  FaHome,
  FaTimes,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../shared/LoadingSpinner";
import { BiLogOut } from "react-icons/bi";

const Sidebar = ({ toggleSidebar }) => {
  const { user, userLogout } = useAuth();
  const [userType, isLoading] = useRole();

  if (isLoading) <LoadingSpinner></LoadingSpinner>;

  //   console.log(user.email, userType);

  // Define menus based on userType
  const menuItems = {
    User: [
      {
        name: "Book a Parcel",
        icon: <FaBox />,
        path: "/dashboard/bookParcel",
      },
      { name: "My Parcels", icon: <FaList />, path: "/dashboard/myParcels" },
      { name: "My Profile", icon: <FaUser />, path: "/dashboard/myProfile" },
    ],
    DeliveryMan: [
      {
        name: "My Delivery List",
        icon: <FaTruck />,
        path: "/dashboard/myDeliveryList",
      },
      { name: "My Reviews", icon: <FaStar />, path: "/dashboard/myReviews" },
      { name: "My Profile", icon: <FaUser />, path: "/dashboard/myProfile" },
    ],
    Admin: [
      {
        name: "Statistics",
        icon: <FaChartBar />,
        path: "/dashboard/statistics",
      },
      { name: "All Parcels", icon: <FaBox />, path: "/dashboard/allParcels" },
      { name: "All Users", icon: <FaUsers />, path: "/dashboard/allUsers" },
      {
        name: "All Delivery Man",
        icon: <FaTruck />,
        path: "/dashboard/allDeliveryMan",
      },
      { name: "My Profile", icon: <FaUser />, path: "/dashboard/myProfile" },
    ],
  };

  // Get menus for the current user type
  const currentMenu = menuItems[userType] || [];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen shadow-lg flex flex-col">
      {/* Header Section */}
      <div className="p-6 text-center flex lg:block justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">Dashboard</h2>
          {/* Replace with dynamic user type if needed */}
          <p className="text-sm text-gray-300 mt-2">
            Welcome, {user?.displayName}
          </p>
        </div>
        {/* Close Button for Mobile */}
        <div className=" lg:hidden ">
          <button
            onClick={toggleSidebar}
            className="text-red-500 text-sm focus:outline-none rounded-full border border-red-500 p-2"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col flex-grow mt-6 mx-2">
        {/* Main menu items */}
        <ul className="space-y-4">
          {currentMenu.map((item, index) => (
            <li id="sidebar" key={index}>
              <NavLink
                to={item.path}
                className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white rounded-md transition"
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* <ul className="space-y-4">
          {currentMenu.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition ${
                    isActive ||
                    item.path === "/dashboard/bookParcel" ||
                    (item.path === "/dashboard/myDeliveryList" &&
                      location.pathname === "/dashboard")
                      ? "bg-gray-700 text-white"
                      : "text-gray-200 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul> */}
        <div className="divider divider-warning px-3"></div>
        {/* Back to Home link */}
        <ul className="">
          <li>
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white rounded-md transition"
            >
              <span className="text-lg mr-3">
                <FaHome />
              </span>
              <span className="font-medium">Back to Home</span>
            </Link>
          </li>
          <li
            onClick={userLogout}
            className="cursor-pointer flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white rounded-md transition"
          >
            <span className="text-lg mr-3">
              <BiLogOut></BiLogOut>
            </span>
            <span className="font-medium">Logout</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
