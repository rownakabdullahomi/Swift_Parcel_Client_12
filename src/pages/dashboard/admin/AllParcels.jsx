import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import moment from "moment";

const AllParcels = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState(null);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [parcels, setParcels] = useState([]); // State to manage local parcel data
  const [searchDateRange, setSearchDateRange] = useState({ from: "", to: "" });

  // Get today's date using moment.js
  const today = moment();

  // Format date for the 'min' attribute in YYYY-MM-DD
  const minDate = today.format("YYYY-MM-DD");

  const axiosSecure = useAxiosSecure();
  const {
    data: fetchedParcels = [],
    isLoading: parcelsLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all/parcels");
      return data;
    },
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all/users");
      return data;
    },
  });

  useEffect(() => {
    if (users && users.length > 0) {
      // Filter users where userType is "DeliveryMan"
      const filteredDeliveryMen = users.filter(
        (user) => user.userType === "DeliveryMan"
      );
      setDeliveryMen(filteredDeliveryMen);
    }
  }, [users]);

  // Set parcels with the fetched data on component mount
  useEffect(() => {
    if (fetchedParcels.length > 0) {
      setParcels(fetchedParcels); // Initialize parcels with fetched data
    }
  }, [fetchedParcels]);

  const handleManageClick = (parcelId) => {
    setSelectedParcelId(parcelId);
    setShowModal(true);
  };

  const handleAssign = async (event) => {
    event.preventDefault();
    const form = event.target;
    const selectedDeliveryManId = form.selectedDeliveryMan.value;
    const rawApproximateDate = form.approximateDate.value;

    if (!selectedDeliveryManId || !rawApproximateDate) {
      Swal.fire("Error", "Please select a delivery man and a date.", "error");
      return;
    }

    // Format the date using moment.js
    const approximateDate = moment(rawApproximateDate, "YYYY-MM-DD").format(
      "DD/MM/YYYY"
    );

    const assignedData = {
      selectedDeliveryManId,
      approximateDate,
    };

    // API call to update the database
    try {
      const res = await axiosSecure.put(
        `/admin/update/parcel/${selectedParcelId}`,
        assignedData
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success", "Parcel assigned successfully!", "success");
        setShowModal(false);
        form.reset();
      }
    } catch (error) {
      Swal.fire("Error", `Failed to assign parcel ${error}`, "error");
      setShowModal(false);
    }
  };

  const handleSearch = async () => {
    let { from, to } = searchDateRange;
    if (!from || !to) {
      Swal.fire("Error", "Please select both date range fields.", "error");
      return;
    }

    // Format the date using moment.js
    from = moment(from, "YYYY-MM-DD").format("DD/MM/YYYY");
    to = moment(to, "YYYY-MM-DD").format("DD/MM/YYYY");
    // console.log(from, to);
    try {
      const { data } = await axiosSecure(
        `/parcels/search?from=${from}&to=${to}`
      );
      setParcels(data); // Update state with search results
    } catch (error) {
      Swal.fire("Error", "Failed to fetch parcels.", error);
    }
  };

  if (parcelsLoading || usersLoading) return <LoadingSpinner />;

  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-6">All Parcels</h2>

      {/* Search System */}
      <div className="flex items-center mb-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From:
          </label>
          <input
            type="date"
            className="p-2 border rounded"
            value={searchDateRange.from}
            onChange={(e) =>
              setSearchDateRange({ ...searchDateRange, from: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To:</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={searchDateRange.to}
            onChange={(e) =>
              setSearchDateRange({ ...searchDateRange, to: e.target.value })
            }
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">User&apos;s Name</th>
              <th className="border border-gray-300 p-2">User&apos;s Phone</th>
              <th className="border border-gray-300 p-2">Booking Date</th>
              <th className="border border-gray-300 p-2">
                Requested Delivery Date
              </th>
              <th className="border border-gray-300 p-2">Cost</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="border border-gray-300 p-2">{parcel?.name}</td>
                <td className="border border-gray-300 p-2">{parcel?.phone}</td>
                <td className="border border-gray-300 p-2">
                  {moment(parcel?.bookingDate).format("DD/MM/YYYY")}
                </td>
                <td className="border border-gray-300 p-2">
                  {parcel?.requestedDeliveryDate}
                </td>
                <td className="border border-gray-300 p-2">${parcel?.price}</td>
                <td className="border border-gray-300 p-2 text-yellow-500 font-semibold capitalize">
                  {parcel?.status}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleManageClick(parcel?._id)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <form
          onSubmit={handleAssign}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Manage Parcel</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Delivery Man:
              </label>
              <select
                id="deliveryManSelect"
                name="selectedDeliveryMan"
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select Delivery Man --</option>
                {deliveryMen.map((man) => (
                  <option key={man._id} value={man._id}>
                    {man.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Approximate Delivery Date:
              </label>
              <input
                id="approximateDate"
                name="approximateDate"
                type="date"
                className="w-full p-2 border rounded"
                min={minDate}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <input
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                type="submit"
                value="Assign"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AllParcels;
