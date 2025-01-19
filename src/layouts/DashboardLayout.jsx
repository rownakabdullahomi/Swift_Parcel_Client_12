import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { FaBars } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-base-200 lg:flex">
      <Helmet>
        <title>Dashboard | SwiftParcel</title>
      </Helmet>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar Content */}
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:mx-10">
        {/* Top Bar */}
        <div className="bg-gray-800 text-white p-4 flex items-center lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-xl focus:outline-none focus:ring"
          >
            <FaBars />
          </button>
          <h1 className="ml-4 text-lg font-bold">Dashboard</h1>
        </div>

        {/* Content Area */}
        <div className="py-6 mx-6">
          <Outlet />
        </div>
      </div>

      {/* Overlay for Small Devices */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
