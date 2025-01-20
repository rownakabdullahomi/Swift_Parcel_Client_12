import  { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserId from "../../../hooks/useUserId";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const [userId] = useUserId();
  const [modalData, setModalData] = useState(null); // Data for the map modal

  const {
    data: deliveryRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["deliveryRequests", userId],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all/deliveryRequests/${userId}`);
      return data;
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will mark the parcel as Cancelled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedStatus = { status: "cancel" };
        try {
          const res = await axiosSecure.put(
            `/deliveryMan/update/parcel/${id}`,
            updatedStatus
          );
          if (res.data.modifiedCount > 0) {
            Swal.fire("Cancelled!", "Your delivery request has been cancelled.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", `Failed to cancel parcel ${error}`, "error");
        }
      }
    });
  };

  const handleDeliver = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will mark the parcel as Delivered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deliver it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedStatus = { status: "delivered" };
        try {
          const res = await axiosSecure.put(
            `/deliveryMan/update/parcel/${id}`,
            updatedStatus
          );
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Delivered!", "Your parcel has been delivered.", "success");
          }
        } catch (error) {
          Swal.fire("Error", `Failed to deliver parcel ${error}`, "error");
        }
      }
    });
  };

  const handleViewLocation = (latitude, longitude) => {
    setModalData({ latitude, longitude });
  };

  const closeModal = () => {
    setModalData(null);
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-4">My Delivery List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Booked User's Name</th>
              <th className="border border-gray-300 p-2">Receiver's Name</th>
              <th className="border border-gray-300 p-2">User's Phone</th>
              <th className="border border-gray-300 p-2">Requested Delivery Date</th>
              <th className="border border-gray-300 p-2">Approximate Delivery Date</th>
              <th className="border border-gray-300 p-2">Receiver's Phone</th>
              <th className="border border-gray-300 p-2">Receiver's Address</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveryRequests.length > 0 ? (
              deliveryRequests.map((request) => (
                <tr key={request._id}>
                  <td className="border border-gray-300 p-2">{request.name}</td>
                  <td className="border border-gray-300 p-2">{request.receiverName}</td>
                  <td className="border border-gray-300 p-2">{request.phone}</td>
                  <td className="border border-gray-300 p-2">{request.requestedDeliveryDate}</td>
                  <td className="border border-gray-300 p-2">{request.approximateDate}</td>
                  <td className="border border-gray-300 p-2">{request.receiverPhone}</td>
                  <td className="border border-gray-300 p-2">{request.deliveryAddress}</td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <button
                      onClick={() => handleViewLocation(request.latitude, request.longitude)}
                      className="flex-1 bg-blue-500 text-white px-3 py-1 rounded  hover:bg-blue-600"
                    >
                      View Location
                    </button>
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="flex-1 bg-red-500 text-white px-3 py-1 rounded  hover:bg-red-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeliver(request._id)}
                      className="flex-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Deliver
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border border-gray-300 p-2 text-center">
                  No delivery requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Map */}
      {modalData && (
        <div className="fixed top-0 left-0 w-full lg:ml-32 h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-3/4 h-3/4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
            >
              &times;
            </button>
            <MapContainer
              center={[modalData.latitude, modalData.longitude]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[modalData.latitude, modalData.longitude]}>
                <Popup>Delivery Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDeliveryList;
