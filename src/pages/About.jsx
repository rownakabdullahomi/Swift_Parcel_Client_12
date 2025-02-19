import { Helmet } from "react-helmet-async";
import AboutUsGif from "../assets/About us page.gif";
// import NoData from "../components/shared/NoData";

// const About = () => {
//   return (
//     <div className="pt-20">
//       <Helmet>
//         <title>About | SwiftParcel</title>
//       </Helmet>
//       <NoData></NoData>
//     </div>
//   );
// };

// export default About;



const AboutUs = () => {
  return (
    <div className="px-4 lg:px-6 flex items-center justify-center mb-10 mt-32">
      <Helmet>
        <title>About | SwiftParcel</title>
      </Helmet>
      <div className="w-full flex flex-col md:flex-row items-center gap-10 overflow-hidden">
        {/* Left Side - GIF */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img
            src={AboutUsGif}
            alt="About Us"
            className="max-h-[400px] w-auto object-contain"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center md:text-left">
            About <span className="text-yellow-600">S</span>wift
            <span className="text-red-600">P</span>arcel
          </h2>
          <p className="mt-4 text-justify">
            Welcome to SwiftParcel, your reliable and efficient parcel delivery
            management system. We simplify logistics by providing a seamless
            platform for tracking, managing, and delivering parcels with speed
            and accuracy.
          </p>
          <p className="mt-4 text-justify">
            Whether you’re a business handling bulk shipments or an individual
            sending a package, SwiftParcel ensures timely deliveries, real-time
            tracking, and hassle-free parcel management. Join us and experience
            a smarter way to send and receive parcels!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
