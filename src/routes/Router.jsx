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
import MyDeliveryList from "../pages/dashboard/deliveryMan/MyDeliveryList";
import MyReviews from "../pages/dashboard/deliveryMan/MyReviews";
import Statistics from "../pages/dashboard/admin/Statistics";
import AllParcels from "../pages/dashboard/admin/AllParcels";
import UpdateParcel from "../pages/dashboard/user/UpdateParcel";
import AllDeliveryMan from "../pages/dashboard/admin/AllDeliveryMan";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import CheckoutPage from "../pages/dashboard/user/CheckoutPage";
import PaymentSuccess from "../pages/dashboard/user/PaymentSuccess";

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
      // {
      //   index: true,
      //   element: <PrivateRoute><BookParcel></BookParcel></PrivateRoute>
      // },
      {
        path: "bookParcel",
        element: <PrivateRoute><BookParcel></BookParcel></PrivateRoute>
      },
      {
        path: "myParcels",
        element: <PrivateRoute><MyParcels></MyParcels></PrivateRoute>
      },
      {
        path: "update/parcel/:id",
        element: <PrivateRoute><UpdateParcel></UpdateParcel></PrivateRoute>
      },
      {
        path: "myProfile",
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: "myDeliveryList",
        element: <PrivateRoute><MyDeliveryList></MyDeliveryList></PrivateRoute>
      },
      {
        path: "myReviews",
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path: "checkout",
        element: <PrivateRoute><CheckoutPage></CheckoutPage></PrivateRoute>
      },
      {
        path: "payment-success",
        element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
      },
      // Admin
      {
        path: "statistics",
        element: <PrivateRoute><Statistics></Statistics></PrivateRoute>
      },
      {
        path: "allParcels",
        element: <PrivateRoute><AllParcels></AllParcels></PrivateRoute>
      },
      {
        path: "allDeliveryMan",
        element: <PrivateRoute><AllDeliveryMan></AllDeliveryMan></PrivateRoute>
      },
      {
        path: "allUsers",
        element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
      },
      
    ],
  },
]);

export default router;
