import Confetti from "react-confetti";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const { parcel, paymentInfo } = state;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Confetti />
      <h2 className="text-3xl font-bold text-green-500 mb-4">
        Payment Successful!
      </h2>
      <p className="text-lg text-red-500 font-semibold my-2">Transaction ID: {paymentInfo.paymentId}</p>
      <p className="text-lg">Parcel Type: {parcel.parcelType}</p>
      <p className="text-lg">Delivery Address: {parcel.deliveryAddress}</p>
      <p className="text-lg">Price Paid: ${parcel.price}</p>
    </div>
  );
};

export default PaymentSuccess;
