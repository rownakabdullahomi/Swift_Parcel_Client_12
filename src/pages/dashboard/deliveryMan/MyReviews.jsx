

const MyReviews = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Review Card (Replace with dynamic cards later) */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Reviewer"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-gray-500">2025-01-15</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-yellow-500 text-lg font-bold">★★★★★</p>
          </div>
          <p className="text-gray-700">
            Excellent service! The delivery was on time, and the package was in perfect condition. Highly recommend!
          </p>
        </div>

        {/* Additional cards can be added similarly */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Reviewer"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">Jane Smith</h3>
              <p className="text-sm text-gray-500">2025-01-14</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-yellow-500 text-lg font-bold">★★★★☆</p>
          </div>
          <p className="text-gray-700">
            Great experience overall. There was a slight delay, but the delivery man was very polite and helpful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
