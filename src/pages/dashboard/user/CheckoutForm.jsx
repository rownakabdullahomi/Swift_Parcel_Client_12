/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ parcel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (parcel.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: parcel.price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, parcel.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded.");
      setIsLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    } else {
      console.log("payment method", paymentMethod);

    }

    try {
    //   Step 1: Create a payment intent
        // const { data: clientSecret } = await axiosSecure.post(
        //   "/create-payment-intent",
        //   { price: parcel.price}
        // );

      // Step 2: Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        console.log("confirm error");
      } else {
        console.log("payment intent", paymentIntent);
        if (paymentIntent.status === "succeeded") {
          // Step 3: Update the backend with the payment details
          const paymentInfo = {
            paymentId: paymentIntent.id,
            paidAmount: parcel.price,
            paymentStatus: "paid",
          };

          const res = await axiosSecure.put(
            `/user/updateParcelPayment/${parcel._id}`,
            paymentInfo
          );

          if (res.data.modifiedCount > 0) {
            toast.success("Payment successful!");
            navigate("/dashboard/payment-success", { state: { parcel } });
          } else {
            toast.error(
              "Failed to update payment details. Please contact support."
            );
          }
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg">
       <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`px-4 py-2 text-white rounded ${
          isLoading ? "bg-gray-500" : "bg-blue-500"
        }`}
      >
        {isLoading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
