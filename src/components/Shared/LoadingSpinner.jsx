import { FidgetSpinner } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen justify-center items-center space-x-6 bg-gray-900 text-white">
      <FidgetSpinner
        visible={true}
        height="120"
        width="120"
        ariaLabel="loading"
        ballColors={["#197fda", "#FF6F61", "#FFD700"]} // Custom colors for the spinner balls
        backgroundColor="green" // Spinner background color
      />
      <span className="text-5xl font-bold tracking-wider text-yellow-500 animate-pulse">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
