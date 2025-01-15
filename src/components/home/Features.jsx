import { FaShieldAlt, FaShippingFast, FaMapMarkedAlt } from "react-icons/fa";
import { Bounce, Slide, Fade } from "react-awesome-reveal";
import Headings from "../shared/Headings";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Parcel Safety",
      description:
        "Your parcels are handled with the utmost care and security.",
      icon: <FaShieldAlt className="text-5xl text-blue-600" />,
      animation: Bounce,
    },
    {
      id: 2,
      title: "Super Fast Delivery",
      description:
        "Experience lightning-fast deliveries, ensuring your parcel arrives on time.",
      icon: <FaShippingFast className="text-5xl text-green-600" />,
      animation: Slide,
    },
    {
      id: 3,
      title: "Reliable Tracking",
      description:
        "Track your parcels in real-time with our advanced tracking system.",
      icon: <FaMapMarkedAlt className="text-5xl text-orange-600" />,
      animation: Fade,
    },
  ];

  return (
    <section className="bg-base-100 px-4 lg:px-6" >
      <div className="">
        {/* Heading */}
        {/* <div className="text-center mb-12 py-16">
          <h2 className="text-4xl font-bold  mb-4">
            Why Choose Swift Parcel?
          </h2>
          <p className="text-xl text-gray-500">
            Delivering excellence with safety, speed, and reliability.
          </p>
        </div> */}
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
            heading={"Why Choose Swift Parcel?"}
            subHeading={
              "Delivering excellence with safety, speed, and reliability."
            }
          ></Headings>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(
            ({ id, title, description, icon, animation: Animation }) => (
              <Animation key={id} duration={2000}>
                <div className="bg-base-300 rounded-lg shadow-lg p-8 text-center">
                  {/* Icon */}
                  <div className="mb-4">{icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-2">{title}</h3>

                  {/* Description */}
                  <p className="text-gray-600">{description}</p>
                </div>
              </Animation>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
