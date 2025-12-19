import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import API from "../../Services/axiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import Loading from "../../Components/Loading/Loading";
import { BiSolidUpvote } from "react-icons/bi";

const categories = ["Category", "Road", "Electricity", "Water", "Garbage", "Footpath", "Drainage", "Other"];
const statuses = ["Status", "Pending", "In-Progress", "Resolved", "Closed"];
const priorities = ["Priority", "high", "normal"];

export default function AllIssues() {
    const { user } = UseAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Category");
    const [status, setStatus] = useState("Status");
    const [priority, setPriority] = useState("Priority");

    const [page, setPage] = useState(1);
    const perPage = 9;

    const { data: issues = [], isLoading, isError, error } = useQuery({
        queryKey: ["allIssues"],
        queryFn: async () => {
            const res = await API.get("/issues");
            return res.data || [];
        },
        staleTime: 1000 * 30,
    });

    const upvoteMutation = useMutation({
        mutationFn: ({ id, email }) =>
            API.patch(`/issues/upvote/${id}`, { email }),

        onMutate: async ({ id, email }) => {
            await queryClient.cancelQueries(["allIssues"]);
            const previous = queryClient.getQueryData(["allIssues"]);

            queryClient.setQueryData(["allIssues"], old =>
                old?.map(issue => {
                    if (issue._id === id && !issue.upvoters?.includes(email)) {
                        return {
                            ...issue,
                            upvotes: (issue.upvotes || 0) + 1,
                            upvoters: [...(issue.upvoters || []), email],
                        };
                    }
                    return issue;
                })
            );

            return { previous };
        },

        onError: (err, _, context) => {
            queryClient.setQueryData(["allIssues"], context.previous);
            Swal.fire("Error", err.message || "Upvote failed", "error");
        },

        onSettled: () => {
            queryClient.invalidateQueries(["allIssues"]);
        }
    });

    const handleUpvote = (issue) => {
        if (!user?.email) {
            Swal.fire({
                icon: "info",
                title: "Login required",
                text: "Please login to upvote this issue.",
                showCancelButton: true,
            }).then(res => {
                if (res.isConfirmed) navigate("/login");
            });
            return;
        }

        if (issue.reporterEmail === user.email) {
            Swal.fire("Not allowed", "You cannot upvote your own issue.", "warning");
            return;
        }

        if (issue.upvoters?.includes(user.email)) {
            Swal.fire("Already voted", "You already upvoted this issue.", "info");
            return;
        }

        upvoteMutation.mutate({ id: issue._id, email: user.email });
    };

    const filteredIssues = useMemo(() => {
        let list = [...issues];

        list.sort((a, b) => {
            const pa = a.priority === "high" || a.isBoosted ? 1 : 0;
            const pb = b.priority === "high" || b.isBoosted ? 1 : 0;
            if (pa !== pb) return pb - pa;
            return new Date(b.reportedAt) - new Date(a.reportedAt);
        });

        if (category !== "Category") list = list.filter(i => i.category === category);
        if (status !== "Status") list = list.filter(i => i.status === status.toLowerCase());
        if (priority !== "Priority") list = list.filter(i => i.priority === priority);

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(i =>
                i.title?.toLowerCase().includes(q) ||
                i.description?.toLowerCase().includes(q) ||
                i.location?.toLowerCase().includes(q)
            );
        }

        return list;
    }, [issues, category, status, priority, search]);

    const total = filteredIssues.length;
    const pages = Math.ceil(total / perPage);
    const pageItems = filteredIssues.slice((page - 1) * perPage, page * perPage);

    if (isLoading) return <div className="p-6 text-center"><Loading /></div>;
    if (isError) return <div className="p-6 text-center text-red-600">{error.message}</div>;

    return (
        <div className="bg-gray-100 -mt-10">
            <div className="max-w-[1400px] mx-auto py-10 md:px-0 px-4 sm:px-6">
                <header className="pb-12 md:pt-5 md:pb-20 text-center">
                    <div className="inline-block px-3 py-1 mb-6 border border-black/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
                        All Issues
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-5xl font-semibold mb-4">
                        Track, explore, and stay informed about <br /> reported public infrastructure issues.
                    </h1>
                </header>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <input
                        className="input input-bordered flex-1 transition-all duration-300"
                        placeholder="Search issues..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1); }}
                    />

                    <select className="select select-bordered" value={category}
                        onChange={e => { setCategory(e.target.value); setPage(1); }}>
                        {categories.map(c => <option key={c}>{c}</option>)}
                    </select>

                    <select className="select select-bordered" value={status}
                        onChange={e => { setStatus(e.target.value); setPage(1); }}>
                        {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>

                    <select className="select select-bordered" value={priority}
                        onChange={e => { setPriority(e.target.value); setPage(1); }}>
                        {priorities.map(p => <option key={p}>{p}</option>)}
                    </select>
                </div>

                {/* Issues Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pageItems.map(issue => (
                        <div
                            key={issue._id}
                            className="bg-white p-4 rounded shadow flex flex-col transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.01]"
                        >
                            {issue.image && (
                                <img
                                    src={issue.image}
                                    alt={issue.title}
                                    className="h-40 w-full object-cover rounded mb-3 transition-opacity duration-300"
                                />
                            )}

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg">{issue.title}</h3>
                                    <div className="flex gap-1">
                                        {issue.isBoosted && (
                                            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                                                BOOSTED
                                            </span>
                                        )}
                                        <span className={`text-xs px-2 py-1 rounded text-white
                                            ${issue.priority === "high" ? "bg-red-600" : "bg-gray-600"}`}>
                                            {issue.priority}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500">{issue.location}</p>
                                <p className="text-sm mt-2">
                                    {issue.description?.slice(0, 120)}...
                                </p>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    onClick={() => handleUpvote(issue)}
                                    className="btn bg-black/70 text-white hover:text-black hover:bg-white btn-sm py-4 transition-all duration-300 active:scale-95"
                                >
                                    <BiSolidUpvote /> {issue.upvotes || 0}
                                </button>

                                <Link
                                    to={`/dashboard/issue/${issue._id}`}
                                    className="btn bg-black text-white hover:text-black hover:bg-white btn-sm py-4 transition-all duration-300 active:scale-95"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-8">
                    <p className="text-sm text-gray-600">
                        Showing {(page - 1) * perPage + 1} – {Math.min(page * perPage, total)} of {total}
                    </p>

                    <div className="btn-group">
                        <button className="btn btn-sm" disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}>Prev</button>
                        <button className="btn btn-sm">Page {page}/{pages}</button>
                        <button className="btn btn-sm" disabled={page === pages}
                            onClick={() => setPage(p => p + 1)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
