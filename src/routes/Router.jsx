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
import DeliveryManRoute from "./DeliveryManRoute";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";

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

       // Normal user routes
      {
        path: "bookParcel",
        element: <UserRoute><BookParcel></BookParcel></UserRoute>
      },
      {
        path: "myParcels",
        element: <UserRoute><MyParcels></MyParcels></UserRoute>
      },
      {
        path: "update/parcel/:id",
        element: <UserRoute><UpdateParcel></UpdateParcel></UserRoute>
      },
      {
        path: "checkout",
        element: <UserRoute><CheckoutPage></CheckoutPage></UserRoute>
      },
      {
        path: "payment-success",
        element: <UserRoute><PaymentSuccess></PaymentSuccess></UserRoute>
      },
      {
        path: "myProfile",
        element: <UserRoute><MyProfile></MyProfile></UserRoute>
      },



      // Delivery man routes
      {
        path: "myDeliveryList",
        element: <DeliveryManRoute><MyDeliveryList></MyDeliveryList></DeliveryManRoute>
      },
      {
        path: "myReviews",
        element: <DeliveryManRoute><MyReviews></MyReviews></DeliveryManRoute>
      },
      
      
      // Admin routs
      {
        path: "statistics",
        element: <AdminRoute><Statistics></Statistics></AdminRoute>
      },
      {
        path: "allParcels",
        element: <AdminRoute><AllParcels></AllParcels></AdminRoute>
      },
      {
        path: "allDeliveryMan",
        element: <AdminRoute><AllDeliveryMan></AllDeliveryMan></AdminRoute>
      },
      {
        path: "allUsers",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      
    ],
  },
]);

export default router;
