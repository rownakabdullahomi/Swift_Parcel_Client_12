import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import BookParcel from "../pages/dashboard/user/BookParcel";
import MyParcels from "../pages/dashboard/user/MyParcels";
import MyProfile from "../pages/dashboard/user/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <p>404 Not Found</p>,
    children: [
      // { path: "/login", element: <Login /> },
      // { path: "/signup", element: <SignUp /> },
      { path: "/", element: <Home></Home> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <PrivateRoute><BookParcel></BookParcel></PrivateRoute>
      },
      {
        path: "bookParcel",
        element: <PrivateRoute><BookParcel></BookParcel></PrivateRoute>
      },
      {
        path: "myParcels",
        element: <PrivateRoute><MyParcels></MyParcels></PrivateRoute>
      },
      {
        path: "myProfile",
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
    ],
  },
]);

export default router;
