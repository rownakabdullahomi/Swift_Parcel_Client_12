import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Headings from "../shared/Headings";
import { motion, AnimatePresence } from "framer-motion";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I schedule a parcel pickup?",
      answer:
        "You can schedule a pickup by logging into your account, selecting 'Schedule Pickup,' and choosing a convenient time and location.",
    },
    {
      question: "What types of parcels can I send?",
      answer:
        "We accept a wide range of parcel types, including documents, small packages, and bulk shipments. Check our guidelines for size and weight restrictions.",
    },
    {
      question: "How can I track my parcel?",
      answer:
        "Simply enter your tracking number on our 'Track Parcel' page or check your dashboard for real-time updates on your shipment.",
    },
    {
      question: "What should I do if my parcel is delayed?",
      answer:
        "Delays can occur due to unforeseen circumstances. Please check your tracking status first, and if you need further assistance, contact our support team.",
    },
    {
      question: "Are my shipments insured?",
      answer:
        "Yes, all shipments are insured up to a certain value. You can also opt for additional coverage for high-value parcels during booking.",
    },
    {
      question: "Can I change the delivery address after dispatch?",
      answer:
        "Yes, address modifications can be requested within a limited timeframe. Additional charges may apply depending on the new location.",
    },
    {
      question: "What happens if the recipient is unavailable?",
      answer:
        "If the recipient is unavailable, we will attempt delivery again or hold the parcel at a nearby facility for pickup. The recipient will be notified accordingly.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="">
      <div className="max-w-5xl mx-auto px-4">
        <Headings
          heading={
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.8, // Animation duration in seconds
                ease: "easeInOut", // Smooth in and out easing
                repeat: Infinity, // Repeat infinitely
                repeatType: "reverse", // Reverses the animation on each repeat
              }}
              className="text-3xl font-bold"
            >
              FAQs – Because We Read Minds!
            </motion.h2>
          }
          subHeading={
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-gray-500"
            >
              The Answers You Need, Before You Even Ask
            </motion.p>
          }
        />

        {/* FAQ Section */}
        <div className="divide-y divide-gray-300">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                className="w-full flex justify-between items-center text-left text-lg font-medium focus:outline-none transition-all duration-300"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <span className="ml-4 text-yellow-600 font-thin">
                  {index === activeIndex ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              <AnimatePresence>
                {index === activeIndex && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-gray-500 overflow-hidden"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
