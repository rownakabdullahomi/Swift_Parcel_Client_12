import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../shared/LoadingSpinner";
import { motion } from "framer-motion";


import Headings from "../shared/Headings";
import { FaStar } from "react-icons/fa";
// import { motion } from "framer-motion";
const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosPublic("/all/reviewed-parcels");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading reviews.</div>;

  return (
    <div className="px-4 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2.2, // Animation duration in seconds
          ease: "easeOut", // Smooth easing
          repeat: Infinity, // Repeat infinitely
          repeatType: "mirror", // Type of repeat (can also be 'loop' or 'mirror')
        }}
      >
        <Headings
          heading={"Customer Reviews"}
          subHeading={"Real Feedback from Our Happy Clients"}
        ></Headings>
      </motion.div>

      <div className="relative">
        {/* Swiper Component */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          //   navigation={{
          //     nextEl: ".swiper-button-next",
          //     prevEl: ".swiper-button-prev",
          //   }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          loop={true}
          className="rounded-xl"
        >
          {reviews.map((review) => (
            <SwiperSlide
              key={review._id}
              className="p-10 bg-base-200 shadow-lg rounded-lg text-center"
            >
              {/* Profile Image with Dashed Border */}
              <div className="w-24 h-24 mx-auto rounded-full border-4 border-dashed border-yellow-500 overflow-hidden">
                <img
                  src={review.userImageURL || "https://via.placeholder.com/80"}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Feedback */}
              <h3 className="text-xl font-semibold mt-4">{review.name}</h3>

              {/* ⭐ Star Rating */}
              <div className="flex justify-center gap-1 my-2">
                {[...Array(parseInt(review.rating))].map((_, i) => (
                  <FaStar
                    key={i}
                    size={20}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              <p className="text-gray-600 italic my-2 max-w-lg mx-auto">
                {review.feedback}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        {/* <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 p-3 rounded-full shadow-md cursor-pointer">
          <ChevronLeft size={24} />
        </div>
        <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 p-3 rounded-full shadow-md cursor-pointer">
          <ChevronRight size={24} />
        </div> */}
      </div>
    </div>
  );
};

export default Reviews;
