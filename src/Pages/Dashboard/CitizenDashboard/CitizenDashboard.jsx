import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Components/Loading/Loading";
import { FileText, Clock, Loader, CheckCircle, Archive } from "lucide-react";

const CitizenDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const {
        data: stats = {},
        isLoading,
        isError
    } = useQuery({
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

    if (isError) {
        return (
            <div className="p-6 text-red-600 font-medium">
                Failed to load your dashboard data. Please try again.
            </div>
        );
    }

    const {
        total = 0,
        pending = 0,
        inProgress = 0,
        resolved = 0,
        closed = 0,
        recent = []
    } = stats;

    return (
        <div className="p-6 space-y-8">

            {/* PAGE TITLE */}
            <div>
                <h1 className="inline-block px-4 py-1.5 mb-6 border border-black/20 dark:border-white/20 rounded-full text-sm uppercase tracking-[0.25em] font-semibold text-black dark:text-gray-300 items-center">
                    Citizen Statistics
                </h1>
                <p className="text-sm text-gray-500">
                    Overview of the issues you have reported
                </p>
            </div>

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

            {/* RECENT ISSUES */}
            <div className="bg-white rounded shadow p-5">
                <h2 className="text-lg font-semibold mb-4">
                    Recent Reported Issues
                </h2>

                {recent.length === 0 ? (
                    <p className="text-gray-500">
                        You have not reported any issues yet.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {recent.map(issue => (
                            <div
                                key={issue._id}
                                className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {issue.title}
                                    </h3>

                                    <p className="text-sm mt-1">
                                        Status:{" "}
                                        <span
                                            className={`capitalize font-medium ${getStatusColor(issue.status)}`}
                                        >
                                            {issue.status}
                                        </span>
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500 mt-2 md:mt-0">
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

const getStatusColor = (status) => {
    switch (status) {
        case "pending":
            return "text-yellow-600";
        case "in progress":
            return "text-orange-600";
        case "resolved":
            return "text-green-600";
        case "closed":
            return "text-gray-600";
        default:
            return "text-gray-500";
    }
};

export default CitizenDashboard;
