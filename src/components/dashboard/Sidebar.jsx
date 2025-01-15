import {
  FaBox,
  FaUser,
  FaTruck,
  FaList,
  FaUsers,
  FaChartBar,
  FaStar,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../shared/LoadingSpinner";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
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
        path: "/dashboard/book-parcel",
      },
      { name: "My Parcels", icon: <FaList />, path: "/dashboard/my-parcels" },
      { name: "My Profile", icon: <FaUser />, path: "/dashboard/my-profile" },
    ],
    DeliveryMan: [
      {
        name: "My Delivery List",
        icon: <FaTruck />,
        path: "/dashboard/delivery-list",
      },
      { name: "My Reviews", icon: <FaStar />, path: "/dashboard/my-reviews" },
    ],
    Admin: [
      { name: "All Parcels", icon: <FaBox />, path: "/dashboard/all-parcels" },
      { name: "All Users", icon: <FaUsers />, path: "/dashboard/all-users" },
      {
        name: "All Delivery Men",
        icon: <FaTruck />,
        path: "/dashboard/all-delivery-men",
      },
      {
        name: "Statistics",
        icon: <FaChartBar />,
        path: "/dashboard/statistics",
      },
    ],
  };

  // Get menus for the current user type
    const currentMenu = menuItems[userType] || [];
//   const currentMenu = menuItems["User"] || [];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen shadow-lg flex flex-col">
      {/* Header Section */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-yellow-400">Dashboard</h2>
        {/* Replace with dynamic user type if needed */}
        <p className="text-sm text-gray-300 mt-2">Welcome, {user?.displayName}</p>
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col flex-grow mt-6">
        {/* Main menu items */}
        <ul className="space-y-4">
          {currentMenu.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white rounded-md transition"
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Back to Home link */}
        <ul className="mt-auto mb-5">
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
            <li
              onClick={userLogout}
              className="cursor-pointer flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white rounded-md transition"
            >
              <span className="text-lg mr-3">
                <BiLogOut></BiLogOut>
              </span>
              <span className="font-medium">Logout</span>
            </li>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
