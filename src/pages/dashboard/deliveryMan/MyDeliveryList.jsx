import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserId from "../../../hooks/useUserId";

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const [userId] = useUserId();

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

  console.log(deliveryRequests);

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
        // API call to update the database
        try {
          const res = await axiosSecure.put(
            `/deliveryMan/update/parcel/${id}`,
            updatedStatus
          );
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Cancelled!",
              text: "Your delivery request has been cancelled.",
              icon: "success",
            });
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
        // API call to update the database
        try {
          const res = await axiosSecure.put(
            `/deliveryMan/update/parcel/${id}`,
            updatedStatus
          );
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Delivered!",
              text: "Your parcel has been delivered.",
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire("Error", `Failed to deliver parcel ${error}`, "error");
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
              <th className="border border-gray-300 p-2">
                Requested Delivery Date
              </th>
              <th className="border border-gray-300 p-2">
                Approximate Delivery Date
              </th>
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
                  <td className="border border-gray-300 p-2">
                    {request.receiverName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {request.phone}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {request.requestedDeliveryDate}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {request.approximateDate}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {request.receiverPhone}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {request.deliveryAddress}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded m-2 hover:bg-blue-600">
                      View Location
                    </button>
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded m-2 hover:bg-red-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeliver(request._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Deliver
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border border-gray-300 p-2 text-center"
                >
                  No delivery requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveryList;
