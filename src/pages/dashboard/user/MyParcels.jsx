import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // State to manage the selected status filter
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: parcels = [],
    isLoading,
     refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email, statusFilter], // Add statusFilter to the query key
    queryFn: async () => {
      const { data } = await axiosSecure(`/all/parcels/${user?.email}`);
      return data;
    },
  });

  // console.log(parcels);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  const filteredParcels = statusFilter === "all" ? parcels : parcels.filter(parcel => parcel.status === statusFilter);

  

  const handleCancel = async (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const status = { status: "cancel" };
          const res = await axiosSecure.patch(`/user/cancel/parcel/${parcelId}`, status); // Await the promise
          // console.log(res);
  
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Cancelled!",
              text: "Your parcel has been cancelled.",
              icon: "success",
            });
            refetch(); 
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to cancel the parcel. Please try again.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error cancelling parcel:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
          });
        }
      }
    });
  };
  

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="on the way" >On The Way</option>
          <option value="delivered">Delivered</option>
          <option value="cancel">Canceled</option>
        </select>
      </div>

      {/* Parcel Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Parcel Type</th>
            <th className="border border-gray-300 p-2">Requested Delivery Date</th>
            <th className="border border-gray-300 p-2">Approximate Delivery Date</th>
            <th className="border border-gray-300 p-2">Booking Date</th>
            <th className="border border-gray-300 p-2">Delivery Men ID</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.map((parcel) => (
            <tr className="text-center" key={parcel._id}>
              <td className="border border-gray-300 p-2">{parcel?.parcelType}</td>
              <td className="border border-gray-300 p-2">
                {/* {moment(parcel.requestedDeliveryDate, "YYYY-MM-DD").format("DD/MM/YYYY")} */}
                {parcel?.requestedDeliveryDate}
              </td>
              <td className="border border-gray-300 p-2">{parcel?.approximateDate || "Not Assigned Yet"}</td>
              <td className="border border-gray-300 p-2">
                {moment(parcel?.bookingDate).format("DD/MM/YYYY")}
              </td>
              <td className="border border-gray-300 p-2">{parcel?.deliveryManId || "Not Assigned Yet"}</td>
              <td className="border border-gray-300 p-2 capitalize">{parcel?.status}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <Link to={`/dashboard/update/parcel/${parcel?._id}`}
                  // onClick={() => handleUpdate(parcel._id, parcel.status)}
                  className={`m-1 px-2 py-1 rounded capitalize ${
                    parcel.status === "pending"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={parcel.status !== "pending"}
                >
                  Update
                </Link>

                <button
                  onClick={() => handleCancel(parcel?._id)}
                  className={`m-1 px-2 py-1 rounded ${
                    parcel.status === "pending"
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={parcel.status !== "pending"}
                >
                  Cancel
                </button>

                {parcel.status === "delivered" && (
                  <button className="m-1 px-2 py-1 rounded bg-green-500 text-white">
                    Review
                  </button>
                )}

                <button className="px-2 py-1 rounded bg-yellow-500 text-white">
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
