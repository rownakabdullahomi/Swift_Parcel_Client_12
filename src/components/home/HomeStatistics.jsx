import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Headings from "../shared/Headings";

const HomeStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure("/home/statistics");
      return data;
    },
  });

  const [ref1, inView1] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5 });
  const [ref3, inView3] = useInView({ threshold: 0.5 });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading statistics.</div>;

  return (
    <div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.8, // Animation duration in seconds
          ease: "easeInOut", // Smooth in and out easing
          repeat: Infinity, // Repeat infinitely
          repeatType: "reverse", // Reverses the animation on each repeat
        }}
      >
        <Headings
          heading={"Impact in Numbers"}
          subHeading={
            "Here’s a quick look at the numbers that define our success."
          }
        ></Headings>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 lg:px-6">
        {/* Total Parcels Booked */}
        <div
          ref={ref1}
          className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center"
        >
          <h3 className="text-2xl font-bold">Total Parcels Booked</h3>
          {stats?.totalParcelsBooked ? (
            <CountUp
              start={0}
              end={inView1 ? stats.totalParcelsBooked - 1 : 0}
              duration={2.5}
              suffix="+"
              className="text-4xl font-bold mt-2"
            />
          ) : (
            "0"
          )}
        </div>

        {/* Total Parcels Delivered */}
        <div
          ref={ref2}
          className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center"
        >
          <h3 className="text-2xl font-bold">Total Parcels Delivered</h3>
          {stats?.totalParcelsDelivered ? (
            <CountUp
              start={0}
              end={inView2 ? stats.totalParcelsDelivered - 1 : 0}
              duration={2.5}
              suffix="+"
              className="text-4xl font-bold mt-2"
            />
          ) : (
            "0"
          )}
        </div>

        {/* Total App Users */}
        <div
          ref={ref3}
          className="bg-purple-500 text-white p-6 rounded-lg shadow-md text-center"
        >
          <h3 className="text-2xl font-bold">Total App Users</h3>
          {stats?.totalUsers ? (
            <CountUp
              start={0}
              end={inView3 ? stats.totalUsers - 1 : 0}
              duration={2.5}
              suffix="+"
              className="text-4xl font-bold mt-2"
            />
          ) : (
            "0"
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeStatistics;
