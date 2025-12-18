import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../../Services/axiosSecure";
import Loading from "../../../Components/Loading/Loading";

export default function SubmitIssue() {
    const { user } = UseAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const [checkingUser, setCheckingUser] = useState(true);

    const categories = [
        "Road",
        "Electricity",
        "Water",
        "Garbage",
        "Footpath",
        "Drainage",
        "Other"
    ];

    /* ------------------ QUERIES (TOP LEVEL) ------------------ */

    const { data: profile = {} } = useQuery({
        queryKey: ["profile"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/users/profile");
            return res.data;
        }
    });

    const { data: myIssues = [] } = useQuery({
        queryKey: ["my-issues"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?email=${user.email}`);
            return res.data;
        }
    });

    /* ------------------ BLOCKED USER CHECK ------------------ */

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                if (!user?.email) return;

                const res = await axiosSecure.get(`/users/${user.email}`);

                if (res.data?.isBlocked) {
                    Swal.fire("Blocked", "Your account is blocked.", "error");
                    navigate("/");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setCheckingUser(false);
            }
        };

        checkUserStatus();
    }, [user, navigate]);

    /* ------------------ IMAGE UPLOAD ------------------ */

    const uploadImageToImgBB = async (file) => {
        const key = import.meta.env.VITE_Image_Host_Key;
        const form = new FormData();
        form.append("image", file);

        const url = `https://api.imgbb.com/1/upload?key=${key}`;
        const res = await fetch(url, { method: "POST", body: form });
        const data = await res.json();

        if (!data?.data?.url) throw new Error("Image upload failed");
        return data.data.url;
    };

    /* ------------------ SUBMIT HANDLER ------------------ */

    const onSubmit = async (data) => {

        //FRONTEND LIMIT CHECK
        if (
            profile.role === "citizen" &&
            !profile.isPremium &&
            myIssues.length >= 3
        ) {
            Swal.fire({
                icon: "warning",
                title: "Limit Reached",
                text: "Free users can submit only 3 issues. Upgrade to premium.",
                confirmButtonText: "Upgrade Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/dashboard/premium-payment");
                }
            });
            return;
        }

        try {
            Swal.fire({
                title: "Submitting...",
                didOpen: () => Swal.showLoading(),
                allowOutsideClick: false
            });

            let imageUrl = "";
            if (data.image?.[0]) {
                imageUrl = await uploadImageToImgBB(data.image[0]);
            }

            const payload = {
                title: data.title,
                description: data.description,
                category: data.category,
                location: data.location,
                image: imageUrl
            };

            await axiosSecure.post("/issues", payload);

            Swal.fire("Success", "Issue submitted successfully!", "success");
            navigate("/dashboard/my-issues");

        } catch (err) {
            if (err.response?.status === 403) {
                Swal.fire(
                    "Limit Reached",
                    "Free users can submit only 3 issues. Upgrade to premium.",
                    "info"
                );
                navigate("/dashboard/premium-payment");
                return;
            }

            Swal.fire("Error", "Submission failed", "error");
        }
    };

    /* ------------------ LOADING ------------------ */

    if (checkingUser) return <p><Loading></Loading></p>;

    /* ------------------ UI ------------------ */

    return (
        <div className="max-w-full mx-auto bg-white rounded-lg">
            <h2 className="inline-block px-4 py-1.5 mb-6 border border-black/20 dark:border-white/20 rounded-full text-sm uppercase tracking-[0.25em] font-semibold text-black dark:text-gray-300 items-center">Report an Issue</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label>Title</label>
                    <input
                        className="input input-bordered w-full"
                        {...register("title", { required: true })}
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        rows={4}
                        {...register("description", { required: true })}
                    />
                </div>

                <div>
                    <label>Category</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("category", { required: true })}
                    >
                        {categories.map(c => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Location</label>
                    <input
                        className="input input-bordered w-full"
                        {...register("location", { required: true })}
                    />
                </div>

                <div>
                    <label>Image</label>
                    <input
                        type="file"
                        {...register("image")}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="btn bg-black text-white hover:text-black hover:bg-white btn-sm py-5"
                    disabled={
                        isSubmitting ||
                        (profile.role === "citizen" &&
                            !profile.isPremium &&
                            myIssues.length >= 3)
                    }
                >
                    {profile.role === "citizen" &&
                        !profile.isPremium &&
                        myIssues.length >= 3
                        ? "Upgrade to Premium"
                        : isSubmitting
                            ? "Submitting..."
                            : "Submit Issue"}
                </button>

            </form>
        </div>
    );
}
