import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Headings from "../shared/Headings";
import { motion } from "framer-motion";

const TopDeliveryMan = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: deliveryMen,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topDeliveryMen"],
    queryFn: async () => {
      const { data } = await axiosPublic("/top-delivery-men");
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading top delivery men.</div>;

  return (
    <div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 2, // Animation duration in seconds
          ease: "easeInOut", // Smooth in and out easing
          repeat: Infinity, // Repeat infinitely
          repeatType: "reverse", // Reverses the animation on each repeat
          bounce: 0.25, // Adds bounce effect to the movement
        }}
      >
        <Headings
          heading={"Our Delivery Stars"}
          subHeading={
            "Highlighting the delivery experts who consistently deliver smiles."
          }
        ></Headings>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 px-4 gap-6 lg:px-6">
        {deliveryMen.map((man, index) => (
          <div
            key={index}
            className="bg-base-200 shadow-lg rounded-lg p-6 text-center"
          >
            <img
              src={man.photoURL}
              alt={man.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h3 className="text-xl font-bold mt-4">{man.name}</h3>
            <p className="mt-2 text-gray-600">
              Parcels Delivered:{" "}
              <span className="font-semibold">{man.parcelCount}</span>
            </p>
            <p className="mt-2 text-yellow-500">
              Average Rating:{" "}
              <span className="font-semibold">
                {man.averageRating.toFixed(1)} ★
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeliveryMan;
