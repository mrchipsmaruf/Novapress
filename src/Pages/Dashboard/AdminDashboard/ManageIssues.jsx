// ManageIssues.jsx
import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const PER_PAGE = 12;

export default function ManageIssues() {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // filters / pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(PER_PAGE);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    // Fetch issues (server-side)
    const {
        data: issuesData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["admin:issues", page, limit, search, statusFilter, priorityFilter],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (page) params.set("page", page);
            if (limit) params.set("limit", limit);
            if (search) params.set("search", search);
            if (statusFilter && statusFilter !== "All") params.set("status", statusFilter);
            if (priorityFilter && priorityFilter !== "All") params.set("priority", priorityFilter);

            const res = await axiosSecure.get(`/issues?${params.toString()}`);
            // backend returns either { total, items } (when paginated) or array
            if (res.data && res.data.items) return res.data;
            // convert array to paginated shape for consistency
            return { total: (res.data || []).length, items: res.data || [] };
        },
        keepPreviousData: true,
        staleTime: 1000 * 30,
    });

    // Fetch staff list (for assignment)
    const { data: staffList = [] } = useQuery({
        queryKey: ["admin:staffList"],
        queryFn: async () => {
            const r = await axiosSecure.get("/staff");
            return r.data || [];
        }
    });

    // Mutations
    const changeStatus = useMutation({
        mutationFn: async ({ id, newStatus }) =>
            axiosSecure.patch(`/issues/${id}/status`, { status: newStatus }),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["admin:issues"]);
            Swal.fire("Updated", "Status updated successfully", "success");
        },
        onError: (err) => {
            Swal.fire("Error", err?.response?.data?.message || err.message, "error");
        }
    });

    const assignStaff = useMutation({
        mutationFn: async ({ id, staffEmail }) =>
            axiosSecure.patch(`/issues/${id}/assign`, { staffEmail }),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["admin:issues"]);
            Swal.fire("Assigned", "Staff assigned successfully", "success");
        },
        onError: (err) => Swal.fire("Error", err?.response?.data?.message || err.message, "error")
    });

    const setPriority = useMutation({
        mutationFn: async ({ id, priority }) =>
            axiosSecure.patch(`/issues/edit/${id}`, { priority }),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["admin:issues"]);
            Swal.fire("Updated", "Priority updated", "success");
        },
        onError: (err) => Swal.fire("Error", err?.response?.data?.message || err.message, "error")
    });

    const deleteIssue = useMutation({
        mutationFn: async (id) => axiosSecure.delete(`/issues/${id}`),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["admin:issues"]);
            Swal.fire("Deleted", "Issue deleted", "success");
        },
        onError: (err) => Swal.fire("Error", err?.response?.data?.message || err.message, "error")
    });

    // helpers
    const items = useMemo(() => issuesData?.items || [], [issuesData]);
    const total = useMemo(() => issuesData?.total || 0, [issuesData]);
    const pages = Math.max(1, Math.ceil(total / limit));

    // handlers
    const onStatusChange = async (id, status) => {
        const { value: note } = await Swal.fire({
            title: `Set status to "${status}"`,
            input: "text",
            inputLabel: "Optional note (will appear in timeline)",
            inputPlaceholder: "Add a note (optional)",
            showCancelButton: true,
        });

        if (note === undefined && !Swal.isConfirmed) return; // cancelled
        changeStatus.mutate({ id, newStatus: status, note });
    };

    const onAssign = async (id) => {
        if (!staffList.length) {
            return Swal.fire("No staff", "No staff available to assign", "info");
        }

        const inputOptions = staffList.reduce((acc, s) => {
            acc[s.email] = s.name || s.email;
            return acc;
        }, {});

        const { value: staffEmail } = await Swal.fire({
            title: "Assign staff",
            input: "select",
            inputOptions,
            inputPlaceholder: "Select staff",
            showCancelButton: true,
        });

        if (!staffEmail) return;
        assignStaff.mutate({ id, staffEmail });
    };

    const onSetPriority = async (id, current) => {
        const { value: priority } = await Swal.fire({
            title: "Set Priority",
            input: "select",
            inputOptions: { normal: "Normal", high: "High" },
            inputValue: current || "normal",
            showCancelButton: true,
        });

        if (!priority) return;
        setPriority.mutate({ id, priority });
    };

    const onDelete = async (id) => {
        const res = await Swal.fire({
            title: "Delete issue?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
        });

        if (!res.isConfirmed) return;
        deleteIssue.mutate(id);
    };

    if (isLoading) return <Loading />;
    if (isError) return <div className="p-6 text-red-600">Error: {String(error?.message || error)}</div>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Manage Issues</h1>

                <div className="flex gap-2">
                    <input
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        placeholder="Search title/description/location..."
                        className="input input-sm input-bordered"
                    />

                    <select className="select select-sm" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
                        <option>All</option>
                        <option>pending</option>
                        <option>assigned</option>
                        <option>in-progress</option>
                        <option>resolved</option>
                        <option>closed</option>
                        <option>rejected</option>
                    </select>

                    <select className="select select-sm" value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}>
                        <option>All</option>
                        <option>high</option>
                        <option>normal</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded shadow p-3">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Reporter</th>
                            <th>Reported</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Assigned To</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((issue) => (
                            <tr key={issue._id}>
                                <td className="font-semibold">{issue.title}</td>
                                <td>{issue.reporterEmail}</td>
                                <td>{issue.reportedAt ? new Date(issue.reportedAt).toLocaleString() : "-"}</td>
                                <td>
                                    <select
                                        className="select select-sm"
                                        value={issue.status || "pending"}
                                        onChange={(e) => onStatusChange(issue._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="assigned">Assigned</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>

                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-1 rounded text-white ${issue.priority === "high" ? "bg-red-600" : "bg-gray-600"}`}>
                                            {issue.priority || "normal"}
                                        </span>
                                        <button onClick={() => onSetPriority(issue._id, issue.priority)} className="btn btn-xs btn-ghost">Change</button>
                                    </div>
                                </td>

                                <td>{issue.assignedStaff || "Unassigned"}</td>

                                <td className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/dashboard/admin/issue/${issue._id}`} className="btn btn-sm btn-primary">View</Link>
                                        <button className="btn btn-sm btn-warning" onClick={() => onAssign(issue._id)}>Assign</button>
                                        <button className="btn btn-sm btn-error" onClick={() => onDelete(issue._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {items.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">No issues found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">Showing {Math.min((page - 1) * limit + 1, total)} - {Math.min(page * limit, total)} of {total}</div>

                <div className="btn-group">
                    <button className="btn btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                    <button className="btn btn-sm">Page {page}/{pages}</button>
                    <button className="btn btn-sm" onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}>Next</button>
                </div>
            </div>
        </div>
    );
}
