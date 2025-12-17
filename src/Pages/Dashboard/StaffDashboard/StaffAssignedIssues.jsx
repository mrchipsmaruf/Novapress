// StaffAssignedIssues.jsx
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

    // 🔁 UPDATE ISSUE STATUS (resolved / closed)
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

            refetch(); // 🔥 refresh list → closed issues disappear
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
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">
                Assigned Issues
            </h1>

            {items.length === 0 && (
                <p className="text-gray-600">
                    No active issues assigned to you.
                </p>
            )}

            <div className="space-y-4">
                {items.map((issue) => (
                    <div
                        key={issue._id}
                        className="bg-white border rounded p-4 shadow"
                    >
                        <h3 className="text-lg font-bold">
                            {issue.title}
                        </h3>

                        <p className="text-sm text-gray-600">
                            Reporter: {issue.reporterEmail}
                        </p>

                        <p className="text-sm mt-1">
                            Status:{" "}
                            <span className="font-semibold capitalize text-blue-600">
                                {issue.status}
                            </span>
                        </p>

                        <p className="mt-2 text-gray-800">
                            {issue.description}
                        </p>

                        <div className="mt-4 flex gap-2 flex-wrap">
                            <Link
                                to={`/dashboard/issue/${issue._id}`}
                                className="btn btn-sm btn-outline"
                            >
                                View Details
                            </Link>

                            {/* Only allow resolve if in-progress */}
                            {issue.status === "in-progress" && (
                                <button
                                    onClick={() =>
                                        updateStatus(issue, "resolved")
                                    }
                                    className="btn btn-sm btn-success"
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
                                    className="btn btn-sm btn-error"
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
