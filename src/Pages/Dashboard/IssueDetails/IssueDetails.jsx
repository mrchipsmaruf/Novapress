import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import useRole from "../../../Hooks/useRole";
import { BiSolidUpvote } from "react-icons/bi";

const IssueDetails = () => {
    const { id } = useParams();
    const { user } = UseAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [commentText, setCommentText] = useState("");
    const [hasUpvoted, setHasUpvoted] = useState(false); // ✅ NEW

    // =============================
    // Fetch Issue
    // =============================
    const { data: issue, isLoading } = useQuery({
        queryKey: ["issue", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        }
    });

    // =============================
    // Fetch Timeline
    // =============================
    const { data: timeline = [] } = useQuery({
        queryKey: ["timeline", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/timeline/${id}`);
            return res.data;
        }
    });

    // =============================
    // Fetch Comments
    // =============================
    const { data: comments = [] } = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${id}`);
            return res.data;
        }
    });

    // =============================
    // Upvote
    // =============================
    const upvoteMutation = useMutation({
        mutationFn: async () => {
            return axiosSecure.patch(`/issues/upvote/${id}`);
        },
        onSuccess: () => {
            setHasUpvoted(true); // ✅ disable after success
            queryClient.invalidateQueries(["issue", id]);
        },
        onError: (err) => {
            Swal.fire("Error", err.response?.data?.message || "Failed", "error");
        }
    });

    // =============================
    // Add Comment
    // =============================
    const commentMutation = useMutation({
        mutationFn: async () => {
            return axiosSecure.post("/comments", {
                issueId: id,
                text: commentText
            });
        },
        onSuccess: () => {
            setCommentText("");
            queryClient.invalidateQueries(["comments", id]);
            queryClient.invalidateQueries(["timeline", id]);
        }
    });

    // =============================
    // Status Update (Staff/Admin)
    // =============================
    const statusMutation = useMutation({
        mutationFn: async (status) => {
            return axiosSecure.patch(`/issues/${id}/status`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["issue", id]);
            queryClient.invalidateQueries(["timeline", id]);
        }
    });

    if (isLoading) return <Loading />;

    const isReporter = issue?.reporterEmail === user?.email;
    const isAssignedStaff = issue?.assignedStaff === user?.email;

    return (
        <div className="max-w-full mx-auto space-y-6">

            {/* ================= Issue Header ================= */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h1 className="inline-block px-4 py-1.5 mb-6 border border-black/20 rounded-full text-sm uppercase tracking-[0.25em] font-semibold">
                    {issue.title}
                </h1>

                <p className="text-gray-600 mt-2">{issue.description}</p>

                <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div><strong>Status:</strong> {issue.status}</div>
                    <div><strong>Priority:</strong> {issue.priority}</div>
                    <div><strong>Category:</strong> {issue.category}</div>
                    <div><strong>Location:</strong> {issue.location}</div>
                    <div><strong>Upvotes:</strong> {issue.upvotes}</div>
                </div>

                {/* Upvote */}
                {user && !isReporter && (
                    <button
                        onClick={() => upvoteMutation.mutate()}
                        disabled={hasUpvoted}
                        className={`btn btn-sm py-4 mt-4 flex items-center gap-2
                            ${hasUpvoted
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-black/70 text-white hover:text-black hover:bg-white"
                            }`}
                    >
                        <BiSolidUpvote />
                        {hasUpvoted ? "Upvoted" : "Upvote"}
                    </button>
                )}

                {issue.isBoosted && (
                    <span className="badge badge-warning ml-2">Boosted</span>
                )}
            </div>

            {/* ================= Staff/Admin Actions ================= */}
            {((role === "admin") || (role === "staff" && isAssignedStaff)) && (
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="font-semibold mb-3">Update Status</h2>
                    <div className="flex gap-3">
                        <button onClick={() => statusMutation.mutate("in-progress")} className="btn bg-black text-white hover:text-black hover:bg-white btn-sm py-5">In Progress</button>
                        <button onClick={() => statusMutation.mutate("resolved")} className="btn bg-yellow-300 py-5">Resolved</button>
                        {role === "admin" && (
                            <button onClick={() => statusMutation.mutate("closed")} className="btn btn-error text-white">Close</button>
                        )}
                    </div>
                </div>
            )}

            {/* ================= Timeline ================= */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="font-semibold mb-4">Timeline</h2>
                <ul className="space-y-3">
                    {timeline.map((t) => (
                        <li key={t._id} className="border-l-4 pl-3">
                            <p className="text-sm"><strong>{t.status}</strong> — {t.message}</p>
                            <p className="text-xs text-gray-500">{new Date(t.time).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ================= Comments ================= */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="font-semibold mb-4">Comments</h2>

                <div className="space-y-3">
                    {comments.map((c) => (
                        <div key={c._id} className="border p-3 rounded">
                            <p className="text-sm">{c.text}</p>
                            <p className="text-xs text-gray-500">{c.userEmail}</p>
                        </div>
                    ))}
                </div>

                {user && (
                    <div className="mt-4">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            placeholder="Write a comment"
                        />
                        <button
                            onClick={() => commentMutation.mutate()}
                            className="btn bg-black text-white hover:text-black hover:bg-white btn-sm mt-5 py-5"
                        >
                            Add Comment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssueDetails;
