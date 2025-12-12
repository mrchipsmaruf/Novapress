import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const StaffAssignedIssues = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const { data: items = [], isLoading, refetch } = useQuery({
        queryKey: ["staffIssues", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/staff/${user.email}`);
            return res.data?.items || [];
        },
    });

    const updateStatus = async (id, status) => {
        try {
            const res = await axiosSecure.patch(`/issues/status/${id}`, { status, note: `Staff updated status to ${status}` });
            if (res.data?.modifiedCount > 0 || res.data?.acknowledged) {
                Swal.fire("Updated", "Status updated", "success");
                refetch();
            }
        } catch (err) {
            Swal.fire("Error", err?.response?.data?.message || "Update failed", "error");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Staff — Assigned Issues</h1>

            {items.length === 0 && <p>No issues currently assigned to you.</p>}

            <div className="space-y-4">
                {items.map((issue) => (
                    <div key={issue._id} className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold">{issue.title}</h3>
                        <p className="text-sm text-gray-600">Reporter: {issue.reporterEmail}</p>
                        <p>{issue.description}</p>
                        <div className="mt-3 flex gap-2">
                            <button onClick={() => updateStatus(issue._id, "in-progress")} className="btn btn-sm btn-primary">Mark In Progress</button>
                            <button onClick={() => updateStatus(issue._id, "resolved")} className="btn btn-sm btn-success">Mark Resolved</button>
                            <button onClick={() => updateStatus(issue._id, "closed")} className="btn btn-sm btn-ghost">Close</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffAssignedIssues;
