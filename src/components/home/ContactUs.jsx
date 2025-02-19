import { useState } from "react";
import Swal from "sweetalert2";
import Headings from "../shared/Headings";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all required fields!",
      });
      return;
    }

    // Show success modal
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for reaching out. We will get back to you soon.",
    });

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-base-200 mt-10 pb-10  px-4 lg:px-6">
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
          heading={"We’d Love to Hear from You!"}
          subHeading={"Connect with our team for quick support and inquiries."}
        ></Headings>
      </motion.div>
      <div className="lg:max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            rows="5"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full btn btn-outline btn-warning hover:!text-white py-3 rounded-lg font-semibold transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
