import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../../Services/api";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddIssue() {
    const { user } = UseAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const [userIssueCount, setUserIssueCount] = useState(0);
    const [isPremium, setIsPremium] = useState(false);
    const [checkingLimit, setCheckingLimit] = useState(true);

    // Category options
    const categories = [
        "Road",
        "Electricity",
        "Water",
        "Garbage",
        "Footpath",
        "Drainage",
        "Other"
    ];

    useEffect(() => {
        //fetch user info and user's issues count
        const fetchInfo = async () => {
            try {
                if (!user?.email) {
                    setCheckingLimit(false);
                    return;
                }

                //get user from backend to check premium flag
                const userRes = await API.get(`/users/${user.email}`);
                setIsPremium(Boolean(userRes.data?.premium || userRes.data?.isPremium));

                //get user's issues
                const issuesRes = await API.get(`/issues/user/${user.email}`);
                const issues = issuesRes.data || [];
                setUserIssueCount(issues.length);
            } catch (err) {
                console.error("Failed to fetch user/issue count:", err);
            } finally {
                setCheckingLimit(false);
            }
        };

        fetchInfo();
    }, [user]);

    //Check if user is allowed to submit
    const canSubmit = () => {
        if (isPremium) return true;
        return userIssueCount < 3;
    };

    //Image upload helper — uploads file to ImgBB and returns URL string
    const uploadImageToImgBB = async (file) => {
        if (!file) return null;
        const key = import.meta.env.VITE_Image_Host_Key;
        if (!key) throw new Error("Image host key missing (VITE_Image_Host_Key)");

        const form = new FormData();
        form.append("image", file);

        //ImgBB requires full URL with key
        const url = `https://api.imgbb.com/1/upload?key=${key}`;
        const res = await fetch(url, { method: "POST", body: form });
        const json = await res.json();
        if (!json || !json.data || !json.data.url) {
            throw new Error("Image upload failed");
        }
        return json.data.url;
    };

    const onSubmit = async (formData) => {
        if (!user?.email) {
            Swal.fire("Not logged in", "Please login and try again.", "warning");
            return;
        }

        //limit check (double-check on submit)
        if (!isPremium && userIssueCount >= 3) {
            Swal.fire({
                icon: "info",
                title: "Limit reached",
                html: `You have submitted ${userIssueCount} issues. Free users can only submit up to 3 issues. <br/><br/>
               Please subscribe to post more issues.`,
                showCancelButton: true,
                confirmButtonText: "Go to Profile",
                cancelButtonText: "Cancel"
            }).then((res) => {
                if (res.isConfirmed) navigate("/dashboard/profile");
            });
            return;
        }

        try {
            Swal.fire({ title: "Submitting...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

            //upload image if a file was provided
            let imageUrl = "";
            if (formData.image && formData.image[0]) {
                imageUrl = await uploadImageToImgBB(formData.image[0]);
            } else if (formData.imageURL) {
                imageUrl = formData.imageURL;
            }

            //create timeline with initial entry
            const initialTimeline = [
                {
                    status: "pending",
                    message: "Issue reported by citizen",
                    updatedBy: user.email,
                    date: new Date().toISOString()
                }
            ];

            //build payload matching your backend
            const payload = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                location: formData.location,
                image: imageUrl,
                reporterEmail: user.email,
                status: "pending",
                priority: "normal",
                upvotes: 0,
                upvoters: [],
                timeline: initialTimeline,
                reportedAt: new Date().toLocaleString()
            };

            //save to DB
            const res = await API.post("/issues", payload);

            if (res.data?.insertedId || res.data?.acknowledged) {
                Swal.fire({ icon: "success", title: "Submitted!", text: "Issue submitted successfully." });
                navigate("/dashboard/my-issues");
            } else {
                Swal.fire({ icon: "success", title: "Submitted!", text: "Issue submitted (response not standard)." });
                navigate("/dashboard/my-issues");
            }
        } catch (err) {
            console.error(err);
            Swal.fire({ icon: "error", title: "Submission failed", text: err.message || "Try again." });
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>

            {checkingLimit ? (
                <div>Checking your account...</div>
            ) : (
                <>
                    {!canSubmit() && (
                        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                            <p className="font-semibold">Free user limit reached</p>
                            <p className="text-sm">Free users can submit up to 3 issues. To submit more, please subscribe.</p>
                            <div className="mt-2">
                                <button onClick={() => navigate("/dashboard/profile")} className="btn btn-sm btn-primary mr-2">Subscribe Now</button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block font-medium">Title</label>
                            <input className="input input-bordered w-full" {...register("title", { required: true })} />
                            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-medium">Description</label>
                            <textarea className="textarea textarea-bordered w-full" rows={5} {...register("description", { required: true })} />
                            {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                        </div>

                        {/* Category dropdown */}
                        <div>
                            <label className="block font-medium">Category</label>
                            <select className="select select-bordered w-full" {...register("category", { required: true })} defaultValue={categories[0]}>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block font-medium">Location</label>
                            <input className="input input-bordered w-full" {...register("location", { required: true })} />
                            {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
                        </div>

                        {/* Image upload */}
                        <div>
                            <label className="block font-medium">Image</label>
                            <input type="file" accept="image/*" {...register("image")} className="file-input file-input-bordered w-full" />
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary" disabled={!canSubmit() || isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Issue"}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
