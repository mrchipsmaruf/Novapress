import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Components/Loading/Loading";

const CitizenDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const { data: stats, isLoading } = useQuery({
        queryKey: ["citizenStats", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/citizen/stats/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const { total, pending, inProgress, resolved, recent } = stats;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Citizen Dashboard</h1>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                <div className="p-4 bg-blue-100 rounded shadow">
                    <h2 className="font-bold text-xl">My Issues</h2>
                    <p className="text-3xl">{total}</p>
                </div>

                <div className="p-4 bg-yellow-100 rounded shadow">
                    <h2 className="font-bold text-xl">Pending</h2>
                    <p className="text-3xl">{pending}</p>
                </div>

                <div className="p-4 bg-purple-100 rounded shadow">
                    <h2 className="font-bold text-xl">In Progress</h2>
                    <p className="text-3xl">{inProgress}</p>
                </div>

                <div className="p-4 bg-green-100 rounded shadow">
                    <h2 className="font-bold text-xl">Resolved</h2>
                    <p className="text-3xl">{resolved}</p>
                </div>
            </div>

            {/* RECENT ISSUES */}
            <h2 className="text-2xl font-semibold mb-3">Recent Issues</h2>

            {recent.length === 0 && (
                <p>You have not submitted any issues yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recent.map((issue) => (
                    <div key={issue._id} className="p-4 bg-white rounded shadow">
                        <h3 className="font-bold text-lg">{issue.title}</h3>
                        <p>Status: <span className="font-semibold">{issue.status}</span></p>
                        <p className="text-sm text-gray-600">
                            Submitted: {new Date(issue.reportedAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CitizenDashboard;
