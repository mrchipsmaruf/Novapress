import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Components/Loading/Loading";
import { FileText, Clock, Loader, CheckCircle, Archive } from "lucide-react";

const CitizenDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["citizenStats", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/issues/citizen/stats/${user.email}`
            );
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const {
        total = 0,
        pending = 0,
        inProgress = 0,
        resolved = 0,
        closed = 0,
        recent = []
    } = stats;

    return (
        <div className="p-6 space-y-6">

            {/* 🔹 PAGE TITLE */}
            <h1 className="text-2xl font-semibold">
               Statistics
            </h1>

            {/* 🔹 STATISTICS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                <StatCard
                    title="Total Issues"
                    value={total}
                    icon={<FileText size={28} />}
                    color="bg-blue-100"
                />

                <StatCard
                    title="Pending"
                    value={pending}
                    icon={<Clock size={28} />}
                    color="bg-yellow-100"
                />

                <StatCard
                    title="In Progress"
                    value={inProgress}
                    icon={<Loader size={28} />}
                    color="bg-orange-100"
                />

                <StatCard
                    title="Resolved"
                    value={resolved}
                    icon={<CheckCircle size={28} />}
                    color="bg-green-100"
                />

                <StatCard
                    title="Closed"
                    value={closed}
                    icon={<Archive size={28} />}
                    color="bg-gray-200"
                />
            </div>

            {/* 🔹 RECENT ISSUES */}
            <div className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-4">
                    Recent Reported Issues
                </h2>

                {recent.length === 0 ? (
                    <p className="text-gray-500">
                        You have not reported any issues yet.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {recent.map(issue => (
                            <div
                                key={issue._id}
                                className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {issue.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Status:{" "}
                                        <span className="capitalize font-medium">
                                            {issue.status}
                                        </span>
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500">
                                    {new Date(issue.reportedAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

/* =========================
   STAT CARD COMPONENT
========================= */
const StatCard = ({ title, value, icon, color }) => (
    <div className={`rounded shadow p-4 flex items-center gap-4 ${color}`}>
        <div className="text-gray-700">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-600">
                {title}
            </p>
            <h2 className="text-2xl font-bold">
                {value}
            </h2>
        </div>
    </div>
);

export default CitizenDashboard;
