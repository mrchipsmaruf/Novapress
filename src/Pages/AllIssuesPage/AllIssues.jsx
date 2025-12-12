import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import API from "../../Services/axiosSecure";
import UseAuth from "../../Hooks/UseAuth";

/**
 * All Issues page - shows cards with required details and functionality.
 * - Uses TanStack Query
 * - Optimistic upvote mutation
 * - Search, filters, pagination (client-side, can be switched to server-side)
 */

const defaultCategories = ["Category", "Road", "Electricity", "Water", "Garbage", "Footpath", "Drainage", "Other"];
const defaultPriorities = ["Priority", "high", "normal"];


export default function AllIssues() {
    const { user } = UseAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("category");
    const defaultStatuses = ["Status", "Pending", "In-Progress", "Working", "Resolved", "Closed"];
    const [status, setStatus] = useState("Status");
    const [priority, setPriority] = useState("priority");

    // pagination state (client-side)
    const [page, setPage] = useState(1);
    const perPage = 9;

    // fetch all issues (TanStack Query)
    const {
        data: issues = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["allIssues"],
        queryFn: async () => {
            const res = await API.get("/issues");
            return res.data || [];
        },
        staleTime: 1000 * 30, // 30s cache
    });

    // Upvote mutation with optimistic update
    const upvoteMutation = useMutation({
        mutationFn: async ({ id, email }) => API.patch(`/issues/upvote/${id}`, { email }),
        onMutate: async ({ id, email }) => {
            await queryClient.cancelQueries(["allIssues"]);
            const previous = queryClient.getQueryData(["allIssues"]);
            queryClient.setQueryData(["allIssues"], old => {
                if (!old) return old;
                return old.map(item => {
                    if (item._id === id) {
                        // if already upvoted client-side, don't change
                        const already = item.upvoters?.includes(email);
                        if (already) return item;
                        return {
                            ...item,
                            upvotes: (item.upvotes || 0) + 1,
                            upvoters: Array.from(new Set([...(item.upvoters || []), email])),
                        };
                    }
                    return item;
                });
            });
            return { previous };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(["allIssues"], context.previous);
            Swal.fire("Error", err?.response?.data?.message || err.message || "Upvote failed", "error");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["allIssues"]);
        }
    });

    const handleUpvote = (issue) => {
        // Not logged in
        if (!user?.email) {
            Swal.fire({
                icon: "info",
                title: "Login required",
                text: "You must login to upvote. Go to login?",
                showCancelButton: true,
            }).then(r => { if (r.isConfirmed) navigate("/login"); });
            return;
        }

        // Can't upvote own issue
        if (issue.reporterEmail === user.email) {
            Swal.fire("Not allowed", "You cannot upvote your own issue.", "warning");
            return;
        }

        // Prevent multiple upvotes client-side
        if (issue.upvoters && issue.upvoters.includes(user.email)) {
            Swal.fire("Already upvoted", "You already upvoted this issue.", "info");
            return;
        }

        // Mutate
        upvoteMutation.mutate({ id: issue._id, email: user.email });
    };

    // FILTER + SORT logic (priority high first, then newest)
    const filtered = useMemo(() => {
        let arr = (issues || []).slice();

        // priority sort: high first (keep relative reportedAt newest)
        arr.sort((a, b) => {
            const pa = a.priority === "high" ? 1 : 0;
            const pb = b.priority === "high" ? 1 : 0;
            if (pa !== pb) return pb - pa; // high -> top
            return new Date(b.reportedAt) - new Date(a.reportedAt);
        });

        if (category !== "Category") arr = arr.filter(i => i.category === category);
        // STATUS FILTER
        if (status !== "Status") {
            arr = arr.filter(i => i.status === status.toLowerCase());
        }
        if (priority !== "Priority") arr = arr.filter(i => i.priority === priority);

        if (search.trim()) {
            const q = search.toLowerCase();
            arr = arr.filter(i =>
                (i.title || "").toLowerCase().includes(q) ||
                (i.description || "").toLowerCase().includes(q) ||
                (i.location || "").toLowerCase().includes(q)
            );
        }

        return arr;
    }, [issues, category, status, priority, search]);

    // pagination slice
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / perPage));
    const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

    if (isLoading) return <div className="p-6 text-center">Loading issues...</div>;
    if (isError) return <div className="p-6 text-center text-red-600">Failed to load issues: {error?.message}</div>;

    return (
        <div className="relative bg-gray-400">
            <div className="max-w-[1400px] mx-auto py-10">
                <h2 className="text-2xl font-bold mb-4">All Issues</h2>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
                    <input
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1); }}
                        placeholder="Search by title, description or location..."
                        className="input input-bordered flex-1"
                    />

                    <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} className="select select-bordered">
                        {defaultCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="select select-bordered">
                        {defaultStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <select value={priority} onChange={e => { setPriority(e.target.value); setPage(1); }} className="select select-bordered">
                        {defaultPriorities.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pageItems.map(issue => (
                        <div key={issue._id} className="border rounded-lg p-4 shadow-sm bg-white flex flex-col">
                            {issue.image && <img src={issue.image} alt={issue.title} className="w-full h-40 object-cover rounded mb-3" />}

                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-lg">{issue.title}</h3>
                                        <p className="text-sm text-gray-500">{issue.location}</p>
                                    </div>

                                    <div className="text-right">
                                        <div className={`px-2 py-1 rounded text-white text-xs ${issue.priority === "high" ? "bg-red-600" : "bg-gray-600"}`}>
                                            {issue.priority}
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-2 text-sm text-gray-700">{issue.description?.slice(0, 120)}{(issue.description || "").length > 120 ? "..." : ""}</p>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => handleUpvote(issue)} className="btn btn-sm btn-ghost">
                                        👍 {issue.upvotes || 0}
                                    </button>

                                    <div className={`text-xs px-2 py-1 rounded text-white ${issue.status === "pending" ? "bg-yellow-500" : issue.status === "in-progress" ? "bg-blue-500" : issue.status === "resolved" ? "bg-green-600" : "bg-gray-500"}`}>
                                        {issue.status}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link to={`/dashboard/issue/${issue._id}`} className="btn btn-sm btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <div>
                        <p className="text-sm text-gray-600">Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, total)} of {total}</p>
                    </div>

                    <div className="btn-group">
                        <button className="btn btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                        <button className="btn btn-sm">Page {page}/{pages}</button>
                        <button className="btn btn-sm" onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
