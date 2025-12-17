import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosSecure from "../../../Services/axiosSecure";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";

export default function PremiumPayment() {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: 1000,
        purpose: "premium",
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.email,
          },
        },
      });

      if (result.error) {
        Swal.fire("Payment Failed", result.error.message, "error");
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await axiosSecure.post("/payment/premium/verify", {
          transactionId: result.paymentIntent.id,
          amount: result.paymentIntent.amount,
        });

        Swal.fire("Success", "You are now Premium!", "success");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 border rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upgrade to Premium
        </h2>

        <CardElement
          className="p-3 border rounded mb-4"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
        />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Processing..." : "Subscribe Premium"}
        </button>
      </form>
    </div>
  );
}
