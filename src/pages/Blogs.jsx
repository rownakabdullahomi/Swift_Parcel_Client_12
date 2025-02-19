
import { FaTruck, FaBox, FaCheckCircle, FaShippingFast } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ParcelDeliveryImage from "../assets/Parcel Delivery Image.jpg";
import TrackYourParcel from "../assets/Track Your Parcel in Real-Time.avif";
import SpeedAndEfficiency from "../assets/Speed and Efficiency.webp";
import SwiftAndSecureDelivery from "../assets/Swift and Secure Delivery.jpg";
import { Helmet } from "react-helmet-async";
// import NoData from "../components/shared/NoData";

// const Blogs = () => {
//   return (
//     <div className="pt-20">
//      
//       <NoData></NoData>
//     </div>
//   );
// };

// export default Blogs;





const blogsData = [
  {
    title: 'SwiftParcel: Revolutionizing Parcel Delivery',
    date: 'February 19, 2025',
    content: 'SwiftParcel is a groundbreaking solution for streamlining the parcel delivery process, making it faster, more reliable, and easier to manage. Our system ensures that parcels are tracked in real time, delivered on time, and handled securely.',
    icon: <FaTruck />,
    img: ParcelDeliveryImage, 
  },
  {
    title: 'Track Your Parcel in Real-Time with SwiftParcel',
    date: 'February 18, 2025',
    content: 'Our tracking feature allows you to keep tabs on your parcel from dispatch to delivery, ensuring peace of mind every step of the way. With real-time updates, you will always know where your parcel is.',
    icon: <FaBox />,
    img: TrackYourParcel,
  },
  {
    title: 'Speed and Efficiency in Every Delivery',
    date: 'February 17, 2025',
    content: 'SwiftParcel ensures that your parcels are delivered on time with the highest level of efficiency, allowing your business to grow without delivery worries. We partner with the fastest logistics providers to meet your needs.',
    icon: <FaShippingFast />,
    img: SpeedAndEfficiency,
  },
  {
    title: 'Swift and Secure Delivery with SwiftParcel',
    date: 'February 16, 2025',
    content: 'Security is a top priority at SwiftParcel. We offer secure packaging and reliable delivery, ensuring your parcels arrive safely at their destination. Our tracking system ensures transparency throughout the delivery process.',
    icon: <FaCheckCircle />,
    img: SwiftAndSecureDelivery,
  },
];

const Blogs = () => {
  return (
    <div className="px-4 lg:px-6 mt-32">
       <Helmet>
         <title>Blogs | SwiftParcel</title>
       </Helmet>
      {blogsData.map((blog, index) => (
        <motion.div
          className="rounded-lg shadow-lg p-6 mb-8 w-full flex flex-col gap-6 lg:flex-row"
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/3">
            <img className="w-full h-64 lg:h-full object-cover rounded-lg" src={blog.img} alt={blog.title} />
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-2/3 lg:pl-6 flex flex-col justify-start lg:my-0 my-5">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">{blog.icon}</div>
              <div>
                <h2 className="text-2xl font-semibold">{blog.title}</h2>
                <p className="text-sm">{blog.date}</p>
              </div>
            </div>
            <p className="text-lg">{blog.content}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Blogs;



