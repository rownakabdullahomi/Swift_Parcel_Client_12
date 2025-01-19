import Lottie from "lottie-react";
import noData from "../../lottie/no-data-found.json";
const NoData = () => {
  return (
    <div className="h-[300px] flex flex-col justify-center items-center bg-base-200 rounded-lg shadow-md py-6 my-10 mx-4 lg:mx-6">
  {/* Animated Icon */}
  <div className="w-44 h-44 mb-6">
    <Lottie
      className="w-full h-full"
      animationData={noData}
      loop={true}
    />
  </div>
  
  <p className="text-2xl font-semibold text-red-600 mb-2 animate-bounce">
    No Data Found
  </p>
  
  <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-6 px-6">
    It looks like there&apos;s nothing here right now. Please check back later or try refreshing.
  </p>
  
 
</div>

  );
};

export default NoData;
