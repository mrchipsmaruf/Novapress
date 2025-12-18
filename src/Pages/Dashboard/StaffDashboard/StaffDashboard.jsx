import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Components/Loading/Loading";

const StaffDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["staffStats", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/staff/stats/${user.email}`);
            return res.data || {};
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="">
            <h1 className="inline-block px-4 py-1.5 mb-6 border border-black/20 rounded-full text-sm uppercase tracking-[0.25em] font-semibold">Staff Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-blue-100 p-5 rounded-lg shadow">
                    <h3 className="font-bold text-lg">Assigned Issues</h3>
                    <p className="text-3xl font-bold">{stats.assigned || 0}</p>
                </div>

                <div className="bg-yellow-100 p-5 rounded-lg shadow">
                    <h3 className="font-bold text-lg">In Progress</h3>
                    <p className="text-3xl font-bold">{stats.inProgress || 0}</p>
                </div>

                <div className="bg-green-100 p-5 rounded-lg shadow">
                    <h3 className="font-bold text-lg">Resolved</h3>
                    <p className="text-3xl font-bold">{stats.resolved || 0}</p>
                </div>

            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Recent Issues</h2>

                {(!stats.recent || stats.recent.length === 0) && (
                    <p>No recent assigned issues.</p>
                )}

                <div className="space-y-3">
                    {stats.recent?.map((issue) => (
                        <div key={issue._id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-bold">{issue.title}</h3>
                            <p className="text-gray-600 text-sm">Status: {issue.status}</p>
                            <p className="text-gray-800">{issue.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
