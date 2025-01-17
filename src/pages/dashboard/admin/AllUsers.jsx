import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const AllUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch users with parcel details
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users-with-parcels", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/all/users-with-parcels/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // Handle user role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axiosSecure.patch(`/user/update/role/${userId}`, {
        userType: newRole,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `User role updated to ${newRole}`, "success");
        refetch(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire(
        "Error",
        "Failed to update user role. Try again later.",
        "error"
      );
    }
  };

  // Pagination logic
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        All Registered Users
      </h2>

      <div>
        {/* Responsive Users Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-xs md:text-sm">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs md:text-sm">
                  Phone
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs md:text-sm">
                  Parcels Booked
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs md:text-sm">
                  Total Spent
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs md:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-xs md:text-sm">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-xs md:text-sm">
                    {user.phone || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-xs md:text-sm">
                    {user.parcelsBooked || 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-xs md:text-sm">
                    $ {user.totalSpent || 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-y-2 md:space-y-0 md:py-4 md:space-x-2 flex flex-col md:items-center md:justify-center md:flex-row">
                    <button
                      onClick={() => handleRoleChange(user._id, "DeliveryMan")}
                      className="px-3 py-1 text-xs md:text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Make Delivery Man
                    </button>
                    <button
                      onClick={() => handleRoleChange(user._id, "Admin")}
                      className="px-3 py-1 text-xs md:text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`mx-1 px-3 py-1 text-xs md:text-sm rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
