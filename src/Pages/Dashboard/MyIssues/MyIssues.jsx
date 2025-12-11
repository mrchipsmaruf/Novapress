import React, { useEffect, useState } from "react";
import API from "../../../Services/api";
import UseAuth from "../../../Hooks/UseAuth";
import { Link } from "react-router-dom";

export default function MyIssues() {
    const { user } = UseAuth();

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchIssues = async () => {
            try {
                const res = await API.get(`/issues/user/${user.email}`);
                setIssues(res.data || []);
            } catch (err) {
                console.error("Failed to load issues:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, [user]);

    if (loading) return <div className="p-5 text-center">Loading your issues...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">My Reported Issues</h2>

            {issues.length === 0 ? (
                <p className="text-gray-600">You have not reported any issues yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {issues.map((issue) => (
                        <div key={issue._id} className="border rounded-lg p-4 shadow-sm">
                            {/* Image */}
                            {issue.image && (
                                <img
                                    src={issue.image}
                                    alt={issue.title}
                                    className="w-full h-40 object-cover rounded mb-3" />
                            )}

                            {/* Title */}
                            <h3 className="font-bold text-lg mb-1">{issue.title}</h3>

                            {/* Category */}
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Category:</strong> {issue.category}
                            </p>

                            {/* Status */}
                            <p className="text-sm mb-1">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`px-2 py-1 rounded text-white text-xs ${issue.status === "pending"
                                        ? "bg-yellow-500"
                                        : issue.status === "in-progress"
                                            ? "bg-blue-500"
                                            : "bg-green-600"
                                        }`}>
                                    {issue.status}
                                </span>
                            </p>

                            {/* Date */}
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Reported:</strong> {issue.reportedAt}
                            </p>

                            {/* Buttons */}
                            <div className="flex justify-between mt-3">
                                <Link
                                    to={`/dashboard/issue/${issue._id}`}
                                    className="btn btn-sm btn-primary">
                                    View Details
                                </Link>

                                <Link
                                    to={`/dashboard/edit-issue/${issue._id}`}
                                    className="btn btn-sm btn-outline">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
