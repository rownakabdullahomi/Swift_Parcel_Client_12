import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";

const MyParcels = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const filteredParcels = statusFilter === "all" ? parcels : parcels.filter(parcel => parcel.status === statusFilter);

  const handleUpdate = (id, status) => {
    if (status !== "pending") return;
    navigate(`/update-booking/${id}`);
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        Swal.fire("Canceled!", "Your booking has been canceled.", "success");
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
          <option value="canceled">Canceled</option>
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
                {moment(parcel.requestedDeliveryDate, "YYYY-MM-DD").format("DD/MM/YYYY")}
              </td>
              <td className="border border-gray-300 p-2">{parcel?.approximateDate || "Not Assigned Yet"}</td>
              <td className="border border-gray-300 p-2">
                {moment(parcel?.bookingDate).format("DD/MM/YYYY")}
              </td>
              <td className="border border-gray-300 p-2">{parcel?.deliveryManId || "Not Assigned Yet"}</td>
              <td className="border border-gray-300 p-2 capitalize">{parcel?.status}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  onClick={() => handleUpdate(parcel._id, parcel.status)}
                  className={`m-1 px-2 py-1 rounded capitalize ${
                    parcel.status === "pending"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={parcel.status !== "pending"}
                >
                  Update
                </button>

                <button
                  onClick={() => handleCancel(parcel.id)}
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
