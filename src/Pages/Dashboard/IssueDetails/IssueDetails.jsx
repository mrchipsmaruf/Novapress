import React, { useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosSecure from "../../../Services/axiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

// IssueDetails component used both in public and dashboard routes.
// Features:
// - Fetch issue details (private route in dashboard) via GET /issues/:id
// - Show issue info, image, status, priority, timeline
// - Comments: fetch GET /comments/:issueId, add POST /comments, delete DELETE /comments/:id
// - Edit (reporter only when status=pending) - opens modal and PATCH /issues/edit/:id
// - Delete (reporter when pending OR admin) - DELETE /issues/:id
// - Up-to-date UI via react-query invalidation

export default function IssueDetails({ mode = "public" }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = UseAuth();
    const queryClient = useQueryClient();

    const isDashboard = mode === "dashboard" || location.pathname.includes("/dashboard");

    // local state for edit modal
    const [editOpen, setEditOpen] = useState(false);
    const [editPayload, setEditPayload] = useState({});

    // comment form
    const [commentText, setCommentText] = useState("");

    // Fetch issue details (private endpoint under /issues/:id)
    const { data: issue, isLoading: issueLoading, isError: issueError } = useQuery({
        queryKey: ["issueDetails", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        },
        enabled: !!id
    });

    // Fetch comments
    const { data: comments = [], isLoading: commentsLoading } = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${id}`);
            return res.data || [];
        }
    });

    // Mutations
    const addCommentMutation = useMutation({
        mutationFn: async (payload) => axiosSecure.post(`/comments`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", id]);
            queryClient.invalidateQueries(["issueDetails", id]);
        },
        onError: (err) => Swal.fire("Error", err?.response?.data?.message || err.message, "error")
    });

    const deleteCommentMutation = useMutation({
        mutationFn: async (commentId) => axiosSecure.delete(`/comments/${commentId}`),
        onSuccess: () => queryClient.invalidateQueries(["comments", id]),
        onError: (err) => Swal.fire("Error", err?.response?.data?.message || err.message, "error")
    });

    const editIssueMutation = useMutation({
        mutationFn: async (payload) => axiosSecure.patch(`/issues/edit/${id}`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries(["issueDetails", id]);
            queryClient.invalidateQueries(["myIssues"]);
            Swal.fire("Updated", "Issue updated successfully", "success");
            setEditOpen(false);
        },
        onError: (err) => Swal.fire("Error", err?.response?.data?.message || err.message, "error")
    });

    const deleteIssueMutation = useMutation({
        mutationFn: async () => axiosSecure.delete(`/issues/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["myIssues"]);
            Swal.fire("Deleted", "Issue deleted", "success");
            navigate("/dashboard/my-issues");
        },
        onError: (err) => Swal.fire("Error", err?.response?.data?.message || err.message, "error")
    });

    // helper role checks
    const isReporter = useMemo(() => issue && user?.email && issue.reporterEmail === user.email, [issue, user]);
    const isAdmin = useMemo(() => user?.role === "admin", [user]);

    // comment submit handler
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!user?.email) {
            Swal.fire({ title: "Login required", text: "Please login to comment.", icon: "info" }).then(() => navigate("/login"));
            return;
        }

        if (!commentText.trim()) return Swal.fire("Info", "Please write a comment", "info");

        addCommentMutation.mutate({ issueId: id, text: commentText });
        setCommentText("");
    };

    const handleDeleteComment = (commentId) => {
        Swal.fire({ title: "Delete comment?", icon: "warning", showCancelButton: true }).then((r) => {
            if (r.isConfirmed) deleteCommentMutation.mutate(commentId);
        });
    };

    const openEdit = () => {
        setEditPayload({ title: issue.title || "", description: issue.description || "", location: issue.location || "" });
        setEditOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const payload = { ...editPayload };
        editIssueMutation.mutate(payload);
    };

    const handleDeleteIssue = () => {
        // reporter can delete only when pending; admin can delete any
        if (!user) return Swal.fire("Error", "Login required", "error");

        if (isReporter && issue.status !== "pending") {
            return Swal.fire("Not allowed", "You can only delete pending issues.", "warning");
        }

        Swal.fire({ title: "Delete issue?", text: "This cannot be undone", icon: "warning", showCancelButton: true }).then((r) => {
            if (r.isConfirmed) deleteIssueMutation.mutate();
        });
    };

    // simple loader / error states
    if (issueLoading) return <div className="p-6 text-center">Loading issue...</div>;
    if (issueError) return <div className="p-6 text-center text-red-600">Failed to load issue</div>;
    if (!issue) return <div className="p-6 text-center">Issue not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    {issue.image ? (
                        <img src={issue.image} alt={issue.title} className="w-full h-64 object-cover rounded mb-4" />
                    ) : (
                        <div className="w-full h-64 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400">No image</div>
                    )}

                    <h2 className="text-2xl font-bold">{issue.title}</h2>
                    <p className="text-sm text-gray-500">Reported by: {issue.reporterEmail}</p>

                    <div className="mt-4 space-y-2 text-gray-700">
                        <p><strong>Category:</strong> {issue.category || "-"}</p>
                        <p><strong>Location:</strong> {issue.location || "-"}</p>
                        <p><strong>Priority:</strong> <span className={`px-2 py-1 rounded text-white text-xs ${issue.priority === 'high' ? 'bg-red-600' : 'bg-gray-600'}`}>{issue.priority}</span></p>
                        <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-white text-xs ${issue.status === 'pending' ? 'bg-yellow-500' : issue.status === 'in-progress' ? 'bg-blue-500' : issue.status === 'resolved' ? 'bg-green-600' : 'bg-gray-500'}`}>{issue.status}</span></p>
                        <p><strong>Reported At:</strong> {new Date(issue.reportedAt).toLocaleString()}</p>

                        <div className="mt-3">
                            <h3 className="font-semibold">Description</h3>
                            <p className="text-gray-700">{issue.description}</p>
                        </div>
                    </div>

                    {/* Action buttons - Dashboard only */}
                    {isDashboard && (
                        <div className="mt-6 flex gap-2">
                            {isReporter && issue.status === 'pending' && (
                                <button onClick={openEdit} className="btn btn-warning btn-sm">Edit Issue</button>
                            )}

                            {(isReporter && issue.status === 'pending') || isAdmin ? (
                                <button onClick={handleDeleteIssue} className="btn btn-error btn-sm">Delete Issue</button>
                            ) : null}

                            {isAdmin && (
                                <button className="btn btn-info btn-sm" onClick={() => navigate(`/dashboard/admin/issue/${id}/audit`)}>Audit</button>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-full md:w-96">
                    <div className="border rounded p-4 mb-4 bg-gray-50">
                        <h4 className="font-semibold mb-2">Timeline</h4>
                        {issue.timeline && issue.timeline.length ? (
                            issue.timeline.slice().reverse().map((t, i) => (
                                <div key={i} className="mb-2">
                                    <div className="text-sm"><strong>{t.status}</strong> — {t.message}</div>
                                    <div className="text-xs text-gray-500">{new Date(t.time || t.date || t.timestamp).toLocaleString()}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500">No timeline entries</div>
                        )}
                    </div>

                    <div className="border rounded p-4 bg-gray-50">
                        <h4 className="font-semibold mb-2">Comments</h4>

                        {commentsLoading ? (
                            <div className="text-sm text-gray-500">Loading comments...</div>
                        ) : (
                            <div className="space-y-3">
                                {comments.length === 0 && <div className="text-sm text-gray-500">No comments yet</div>}

                                {comments.map(c => (
                                    <div key={c._id} className="bg-white p-3 rounded shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-sm font-medium">{c.userEmail}</div>
                                                <div className="text-xs text-gray-500">{new Date(c.time).toLocaleString()}</div>
                                            </div>

                                            <div className="flex gap-2">
                                                {(user?.email === c.userEmail || isAdmin) && (
                                                    <button onClick={() => handleDeleteComment(c._id)} className="btn btn-ghost btn-xs text-red-500">Delete</button>
                                                )}
                                            </div>
                                        </div>

                                        <p className="mt-2 text-gray-700">{c.text}</p>
                                    </div>
                                ))}

                                {/* add comment form */}
                                <form onSubmit={handleAddComment} className="mt-2">
                                    <textarea
                                        value={commentText}
                                        onChange={e => setCommentText(e.target.value)}
                                        placeholder="Write a comment..."
                                        className="textarea textarea-bordered w-full"
                                        rows={3}
                                    />

                                    <div className="flex justify-end mt-2">
                                        <button type="submit" className="btn btn-sm btn-primary">Add Comment</button>
                                    </div>
                                </form>

                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded shadow w-full max-w-lg">
                        <h3 className="text-lg font-semibold mb-4">Edit Issue</h3>

                        <label className="block">Title</label>
                        <input className="input input-bordered w-full mb-3" value={editPayload.title} onChange={e => setEditPayload(p => ({ ...p, title: e.target.value }))} />

                        <label className="block">Description</label>
                        <textarea className="textarea textarea-bordered w-full mb-3" value={editPayload.description} onChange={e => setEditPayload(p => ({ ...p, description: e.target.value }))} rows={5} />

                        <label className="block">Location</label>
                        <input className="input input-bordered w-full mb-3" value={editPayload.location} onChange={e => setEditPayload(p => ({ ...p, location: e.target.value }))} />

                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setEditOpen(false)} className="btn btn-ghost">Cancel</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
