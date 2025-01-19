import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const AllDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();
  const [parcelsDeliveredCount, setParcelsDeliveredCount] = useState([]);

  // Fetch all users data (delivery men)
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all/users");
      return data;
    },
  });

  // Fetch all parcels data
  const { data: parcels = [], isLoading: parcelsLoading } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all/parcels");
      return data;
    },
  });

  useEffect(() => {
    // Filter out the delivery men
    const filteredDeliveryMen = users.filter(
      (user) => user.userType === "DeliveryMan"
    );

    // Count parcels delivered for each delivery man and calculate avg. rating
    const deliveredCount = filteredDeliveryMen.map((deliveryMan) => {
      const deliveredParcels = parcels.filter(
        (parcel) =>
          parcel.deliveryManId === deliveryMan._id && parcel.status === "delivered"
      );

      const parcelsDelivered = deliveredParcels.length;

      // Calculate average rating from delivered parcels
      const totalRating = deliveredParcels.reduce(
        (sum, parcel) => sum + parseFloat(parcel.rating),
        0
      );
      const avgReview = parcelsDelivered > 0 ? (totalRating / parcelsDelivered).toFixed(1) : 0;

      return {
        deliveryManId: deliveryMan._id,
        name: deliveryMan.name,
        phone: deliveryMan.phone,
        parcelsDelivered,
        avgReview: avgReview,
      };
    });

    setParcelsDeliveredCount(deliveredCount);
  }, [users, parcels]);

  if (usersLoading || parcelsLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Delivery Men</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Parcels Delivered</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Average Review</th>
            </tr>
          </thead>
          <tbody>
            {parcelsDeliveredCount.map((deliveryMan, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-300 px-4 py-2">{deliveryMan.name}</td>
                <td className="border border-gray-300 px-4 py-2">{deliveryMan.phone}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {deliveryMan.parcelsDelivered}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {deliveryMan.avgReview} ⭐
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeliveryMan;
