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

  //   Step 1: Create a payment intent
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
    <form
      onSubmit={handleSubmit}
      className="p-6 border border-gray-200 rounded-lg shadow-lg bg-gradient-to-tr from-blue-50 to-white"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Complete Your Payment
      </h2>

      <div className="mb-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#1a202c",
                "::placeholder": {
                  color: "#cbd5e1",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
            },
          }}
          className="p-3 border border-gray-300 rounded-lg shadow-inner"
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-300 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
              ></path>
            </svg>
            Processing...
          </div>
        ) : (
          "Pay Now"
        )}
      </button>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Payments are secure and encrypted.
      </p>
    </form>
  );
};

export default CheckoutForm;
