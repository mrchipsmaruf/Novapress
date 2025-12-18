import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Components/Loading/Loading";

const StaffAssignedIssues = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const {
        data: items = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["staffIssues", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/issues/staff/${user.email}`
            );
            return res.data?.items || [];
        },
    });

    const updateStatus = async (issue, newStatus) => {
        const result = await Swal.fire({
            title: `Mark issue as ${newStatus}`,
            input: "textarea",
            inputLabel: "Comment (optional)",
            inputPlaceholder: "Explain what you did...",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.patch(
                `/issues/${issue._id}/status`,
                {
                    status: newStatus,
                    note: result.value || "",
                }
            );

            Swal.fire(
                "Success",
                `Issue marked as ${newStatus}`,
                "success"
            );

            refetch();
        } catch (err) {
            Swal.fire(
                "Error",
                err.response?.data?.message || err.message,
                "error"
            );
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="mx-auto space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="inline-block px-5 py-2 border border-black/20 rounded-full text-sm uppercase tracking-[0.25em] font-semibold">
                    Assigned Issues
                </h1>

                <span className="text-sm text-gray-500">
                    Total: {items.length}
                </span>
            </div>

            {items.length === 0 && (
                <div className="bg-white rounded-2xl shadow p-6 text-center">
                    <p className="text-gray-600">
                        No active issues assigned to you.
                    </p>
                </div>
            )}

            {/* Issue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((issue) => (
                    <div
                        key={issue._id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
                    >
                        {/* Title + Status */}
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-lg font-bold text-gray-900 leading-snug">
                                {issue.title}
                            </h3>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                                    ${issue.status === "in-progress" && "bg-blue-100 text-blue-700"}
                                    ${issue.status === "resolved" && "bg-yellow-100 text-yellow-700"}
                                    ${issue.status === "closed" && "bg-red-100 text-red-700"}
                                `}
                            >
                                {issue.status}
                            </span>
                        </div>

                        {/* Meta */}
                        <div className="mt-3 text-sm text-gray-600 space-y-1">
                            <p>
                                <span className="font-medium">Reporter:</span>{" "}
                                {issue.reporterEmail}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-gray-800 text-sm leading-relaxed line-clamp-3">
                            {issue.description}
                        </p>

                        {/* Actions */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            <Link
                                to={`/dashboard/issue/${issue._id}`}
                                className="btn bg-black text-white hover:text-black hover:bg-white btn-sm py-4"
                            >
                                View Details
                            </Link>

                            {/* Only allow resolve if in-progress */}
                            {issue.status === "in-progress" && (
                                <button
                                    onClick={() =>
                                        updateStatus(issue, "resolved")
                                    }
                                    className="btn btn-sm bg-yellow-300 hover:bg-yellow-400"
                                >
                                    Mark Resolved
                                </button>
                            )}

                            {/* Only allow close if resolved */}
                            {issue.status === "resolved" && (
                                <button
                                    onClick={() =>
                                        updateStatus(issue, "closed")
                                    }
                                    className="btn btn-sm btn-error text-white"
                                >
                                    Close Issue
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffAssignedIssues;
