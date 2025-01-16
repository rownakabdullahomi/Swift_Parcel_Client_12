import React from 'react';
import Swal from 'sweetalert2';

const MyDeliveryList = () => {
  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will mark the parcel as Cancelled.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });
  };

  const handleDeliver = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will mark the parcel as Delivered.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, deliver it!'
    });
  };

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
            {/* Example Row (Replace with dynamic rows later) */}
            <tr>
              <td className="border border-gray-300 p-2">John Doe</td>
              <td className="border border-gray-300 p-2">Jane Smith</td>
              <td className="border border-gray-300 p-2">123-456-7890</td>
              <td className="border border-gray-300 p-2">2025-01-20</td>
              <td className="border border-gray-300 p-2">2025-01-25</td>
              <td className="border border-gray-300 p-2">987-654-3210</td>
              <td className="border border-gray-300 p-2">123 Elm Street</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  View Location
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeliver}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Deliver
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveryList;
