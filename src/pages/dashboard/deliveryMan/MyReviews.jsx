import { useQuery } from "@tanstack/react-query";
import useUserId from "../../../hooks/useUserId";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [userId] = useUserId();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", userId],
    queryFn: async () => {
      const { data } = await axiosSecure(`/reviews/${userId}`);
      return data;
    },
  });

  console.log(reviews);
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews found for you.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.userImageURL}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-500">
                    {review.reviewDate}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-yellow-500 text-lg font-bold">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
              </div>
              <p className="text-gray-700">{review.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
