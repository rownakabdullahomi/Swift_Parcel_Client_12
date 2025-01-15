import { Typewriter } from "react-simple-typewriter";
import BannerImg from "../assets/banner.jpg";

const Banner = () => {
  return (
    <div
      className="w-full h-[90vh] bg-center bg-cover bg-no-repeat relative"
      style={{ backgroundImage: `url(${BannerImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-yellow-500">
            <Typewriter
              words={[
                "Swift Parcel Delivery Services",
                "Fast, Reliable, and Secure",
                "Delivering Happiness",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Fast, reliable, and secure parcel delivery at your fingertips.
        </p>
        <div className="w-full max-w-md flex">
          <input
            type="text"
            placeholder="Search here ..."
            className="w-full p-3 rounded-l-md border-none focus:outline-none text-gray-800"
          />
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-r-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
