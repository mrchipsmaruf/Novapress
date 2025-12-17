import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/admin/stats");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const { users, issues, payments, staffPerformance, activeCitizens, latestResolved } = stats;

    return (
        <div className="p-6 space-y-10">
            <h1 className="text-2xl font-semibold">Admin Statistics</h1>

            {/* USERS */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Users Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard title="Total Users" value={users.totalUsers} />
                    <StatCard title="Citizens" value={users.totalCitizens} />
                    <StatCard title="Staff" value={users.totalStaff} />
                    <StatCard title="Premium Users" value={users.totalPremium} />
                </div>
            </div>

            {/* ISSUES */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Issues Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <StatCard title="Total Issues" value={issues.totalIssues} />
                    <StatCard title="Pending" value={issues.pending} />
                    <StatCard title="In Progress" value={issues.inProgress} />
                    <StatCard title="Resolved" value={issues.resolved} />
                    <StatCard title="Closed" value={issues.closed} />
                </div>
            </div>

            {/* PRIORITY */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Issue Priority</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StatCard title="High Priority" value={issues.priority.highPriority} />
                    <StatCard title="Normal Priority" value={issues.priority.normalPriority} />
                </div>
            </div>

            {/* PAYMENTS */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Revenue</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StatCard title="Boost Payments" value={payments.totalBoostPayments} />
                    <StatCard title="Total Revenue ($)" value={payments.totalRevenue} />
                </div>
            </div>

            {/* STAFF PERFORMANCE */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Top Staff Performance</h2>
                {staffPerformance.length === 0 ? (
                    <p>No data available.</p>
                ) : (
                    <ul className="space-y-2">
                        {staffPerformance.map((staff) => (
                            <li key={staff._id} className="bg-gray-100 p-3 rounded">
                                {staff._id} — Resolved: {staff.resolvedCount}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* ACTIVE CITIZENS */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Most Active Citizens</h2>
                {activeCitizens.length === 0 ? (
                    <p>No data available.</p>
                ) : (
                    <ul className="space-y-2">
                        {activeCitizens.map((user) => (
                            <li key={user._id} className="bg-gray-100 p-3 rounded">
                                {user._id} — Issues: {user.count}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* LATEST RESOLVED */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Latest Resolved Issues</h2>
                {latestResolved.length === 0 ? (
                    <p>No resolved issues yet.</p>
                ) : (
                    <div className="space-y-3">
                        {latestResolved.map(issue => (
                            <div key={issue._id} className="bg-white p-4 rounded shadow">
                                <h3 className="font-bold">{issue.title}</h3>
                                <p>Status: {issue.status}</p>
                                <p>Priority: {issue.priority}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div className="bg-blue-100 p-4 rounded shadow text-center">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value ?? 0}</p>
    </div>
);

export default AdminDashboard;
