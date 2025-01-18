

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CheckoutPage = () => {
const location = useLocation();
    
  const { parcel } = location.state || {}; // Access `parcel` from state
//   console.log(parcel);
  return (
    <div className="checkout-container">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm parcel={parcel} />
      </Elements>
    </div>

  );
};

export default CheckoutPage;
