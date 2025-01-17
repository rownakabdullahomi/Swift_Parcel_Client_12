

const AllDeliveryMan = () => {
  const dummyData = [
    {
      name: "John Doe",
      phone: "123-456-7890",
      parcelsDelivered: 150,
      avgReview: 4.8,
    },
    {
      name: "Jane Smith",
      phone: "987-654-3210",
      parcelsDelivered: 200,
      avgReview: 4.5,
    },
    {
      name: "Robert Brown",
      phone: "456-123-7890",
      parcelsDelivered: 120,
      avgReview: 4.7,
    },
  ];

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
            {dummyData.map((deliveryMan, index) => (
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
                  {deliveryMan.avgReview.toFixed(1)} ⭐
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
