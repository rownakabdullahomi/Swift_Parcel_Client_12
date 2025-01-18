import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import Modal from "react-modal";
import toast from "react-hot-toast";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // State to manage the selected status filter
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const filteredParcels =
    statusFilter === "all"
      ? parcels
      : parcels.filter((parcel) => parcel.status === statusFilter);

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
          const res = await axiosSecure.patch(
            `/user/cancel/parcel/${parcelId}`,
            status
          ); // Await the promise
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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const feedback = form.feedback.value;

    const review = {
      rating,
      feedback,
    };

    try {
      const res = await axiosSecure.put(
        `/user/submitReview/${selectedParcel._id}`,
        review
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Review submitted successfully!",
          res.data.message,
          "success"
        );
        refetch();
        closeModal();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire(
        "Error!",
        "Failed to submit the review. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="on the way">On The Way</option>
          <option value="delivered">Delivered</option>
          <option value="cancel">Canceled</option>
        </select>
      </div>

      {/* Parcel Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Parcel Type</th>
            <th className="border border-gray-300 p-2">
              Requested Delivery Date
            </th>
            <th className="border border-gray-300 p-2">
              Approximate Delivery Date
            </th>
            <th className="border border-gray-300 p-2">Booking Date</th>
            <th className="border border-gray-300 p-2">Delivery Men ID</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.map((parcel) => (
            <tr className="text-center" key={parcel._id}>
              <td className="border border-gray-300 p-2">
                {parcel?.parcelType}
              </td>
              <td className="border border-gray-300 p-2">
                {/* {moment(parcel.requestedDeliveryDate, "YYYY-MM-DD").format("DD/MM/YYYY")} */}
                {parcel?.requestedDeliveryDate}
              </td>
              <td className="border border-gray-300 p-2">
                {parcel?.approximateDate || "Not Assigned Yet"}
              </td>
              <td className="border border-gray-300 p-2">
                {moment(parcel?.bookingDate).format("DD/MM/YYYY")}
              </td>
              <td className="border border-gray-300 p-2">
                {parcel?.deliveryManId || "Not Assigned Yet"}
              </td>
              <td className="border border-gray-300 p-2 capitalize">
                {parcel?.status}
              </td>
              <td className="border border-gray-300 p-2 space-x-2">
                <Link
                  to={`/dashboard/update/parcel/${parcel?._id}`}
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
                {/* {parcel.status === "delivered" && (
                  <button
                    onClick={() => openModal(parcel)}
                    className="m-1 px-2 py-1 rounded bg-green-500 text-white"
                  >
                    Review
                  </button>
                )} */}

                {parcel.status === "delivered" && (
                  <button
                    onClick={() => {
                      if (!parcel?.rating) {
                        // Open the modal only if no review exists
                        openModal(parcel);
                      } else {
                        toast.error("Review already submitted!");
                      }
                    }}
                    className="m-1 px-2 py-1 rounded bg-green-500 text-white"
                    // className={`m-1 px-2 py-1 rounded ${
                    //   parcel.rating
                    //     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    //     : "bg-green-500 text-white"
                    // }`}
                    // disabled={!!parcel.rating} // Disable the button if a review exists
                  >
                    Review
                  </button>
                )}
                {parcel.paymentStatus ? (
                  <button
                    onClick={() => toast.error("Payment already done!")}
                    className="px-2 py-1 rounded bg-yellow-500 text-white"
                  >
                    Pay
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate("/dashboard/checkout", { state: { parcel } })
                    }
                    className="px-2 py-1 rounded bg-yellow-500 text-white"
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg p-6 shadow-lg mx-auto lg:mt-8 mt-2 max-w-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">User's Image:</label>
            <img
              src={user?.photoURL}
              alt="User"
              className="w-16 h-16 rounded-full border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              User&apos;s Name:
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Delivery Man ID:</label>
            <input
              type="text"
              value={selectedParcel?.deliveryManId}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Rating (out of 5):
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Feedback:</label>
            <textarea
              name="feedback"
              required
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyParcels;
