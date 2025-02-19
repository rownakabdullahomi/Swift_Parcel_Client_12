// import { Helmet } from "react-helmet-async";
// import NoData from "../components/shared/NoData";

// const Blogs = () => {
//   return (
//     <div className="pt-20">
//       <Helmet>
//         <title>Blogs | SwiftParcel</title>
//       </Helmet>
//       <NoData></NoData>
//     </div>
//   );
// };

// export default Blogs;




import { FaTruck, FaBox, FaCheckCircle, FaShippingFast } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ParcelDeliveryImage from "../assets/Parcel Delivery Image.jpg"

const blogsData = [
  {
    title: 'SwiftParcel: Revolutionizing Parcel Delivery',
    date: 'February 19, 2025',
    content: 'SwiftParcel is a groundbreaking solution for streamlining the parcel delivery process, making it faster, more reliable, and easier to manage. Our system ensures that parcels are tracked in real time, delivered on time, and handled securely.',
    icon: <FaTruck />,
    img: ParcelDeliveryImage, // Parcel Delivery Image
  },
  {
    title: 'Track Your Parcel in Real-Time with SwiftParcel',
    date: 'February 18, 2025',
    content: 'Our tracking feature allows you to keep tabs on your parcel from dispatch to delivery, ensuring peace of mind every step of the way. With real-time updates, you will always know where your parcel is.',
    icon: <FaBox />,
    img: 'https://images.unsplash.com/photo-1599653051153-47438c000f98?crop=entropy&cs=tinysrgb&fit=max&ixid=M3wzNjYyOXwwfDF8c2VhY2h8MXx8Y2hhbGxlbmdlJTIwdHJhY2tpbmclMjBvbiUyMHBhcmNlbHxlbnwwfHx8fDE2ODA3OTE4NzY&ixlib=rb-1.2.1&q=80&w=1080', // Tracking Image
  },
  {
    title: 'Speed and Efficiency in Every Delivery',
    date: 'February 17, 2025',
    content: 'SwiftParcel ensures that your parcels are delivered on time with the highest level of efficiency, allowing your business to grow without delivery worries. We partner with the fastest logistics providers to meet your needs.',
    icon: <FaShippingFast />,
    img: 'https://images.unsplash.com/photo-1554924021-8322d3dbd44e?crop=entropy&cs=tinysrgb&fit=max&ixid=M3wzNjYyOXwwfDF8c2VhY2h8MXx8cGFyY2VsJTIwZGVsaXZlcnl8ZW58MHx8fHwxNjgwNzkxNjY2&ixlib=rb-1.2.1&q=80&w=1080', // Fast Delivery Image
  },
  {
    title: 'Swift and Secure Delivery with SwiftParcel',
    date: 'February 16, 2025',
    content: 'Security is a top priority at SwiftParcel. We offer secure packaging and reliable delivery, ensuring your parcels arrive safely at their destination. Our tracking system ensures transparency throughout the delivery process.',
    icon: <FaCheckCircle />,
    img: 'https://images.unsplash.com/photo-1532387729910-50f0d263fd5c?crop=entropy&cs=tinysrgb&fit=max&ixid=M3wzNjYyOXwwfDF8c2VhY2h8MXx8Y2hhbGxlbmdlJTIwZGVsaXZlcnl8ZW58MHx8fHwxNjgwNzkxODQ0&ixlib=rb-1.2.1&q=80&w=1080', // Secure Delivery Image
  },
];

const Blogs = () => {
  return (
    <div className="px-4 lg:px-6 mt-32">
      {blogsData.map((blog, index) => (
        <motion.div
          className="rounded-lg shadow-lg p-6 mb-8 w-full"
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center mb-4">
            <div className="text-4xl text-gray-600 mr-4">{blog.icon}</div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{blog.title}</h2>
              <p className="text-sm text-gray-500">{blog.date}</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 mb-4">{blog.content}</p>
          <img className="w-full h-96 object-cover rounded-lg" src={blog.img} alt={blog.title} />
        </motion.div>
      ))}
    </div>
  );
};

export default Blogs;


