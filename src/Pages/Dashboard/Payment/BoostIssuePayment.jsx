import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const BOOST_AMOUNT = 100; // 100 tk (REQUIREMENT)

export default function BoostIssuePayment() {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        try {
            setLoading(true);

            // 1️⃣ Create PaymentIntent
            const { data } = await axiosSecure.post("/create-payment-intent", {
                email: user.email,
                amount: BOOST_AMOUNT,
                purpose: "boost",
                issueId: id
            });

            const card = elements.getElement(CardElement);
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card,
                    billing_details: { email: user.email }
                }
            });

            if (result.error) {
                Swal.fire("Payment Failed", result.error.message, "error");
                return;
            }

            // 2️⃣ Save boost + timeline
            await axiosSecure.post(`/issues/${id}/boost`, {
                paymentId: result.paymentIntent.id,
                amount: BOOST_AMOUNT
            });

            Swal.fire("Success", "Issue boosted successfully!", "success");
            navigate(`/issues/${id}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Boost Issue Priority</h1>

            <form onSubmit={handlePayment} className="bg-white p-4 rounded shadow">
                <p className="font-semibold mb-3">Boost Cost: 100 tk</p>

                <CardElement className="p-2 border rounded" />

                <button
                    disabled={!stripe || loading}
                    className="btn btn-warning w-full mt-4"
                >
                    {loading ? "Processing..." : "Pay & Boost"}
                </button>
            </form>
        </div>
    );
}
