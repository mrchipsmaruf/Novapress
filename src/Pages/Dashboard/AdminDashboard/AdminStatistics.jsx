import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Users,
    UserCheck,
    UserCog,
    Star,
    ClipboardList,
    Loader,
} from "lucide-react";

import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import axiosSecure from "../../../Services/axiosSecure";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function AdminStatistics() {

    const { data: stats, isLoading } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/admin/stats");
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <Loader className="animate-spin" size={40} />
            </div>
        );
    }

    const users = stats.users;
    const issues = stats.issues;
    const payments = stats.payments;

    return (
        <div className="p-6 space-y-8">

            {/* TITLE */}
            <h2 className="text-3xl font-bold">Admin Statistics</h2>

            {/* USERS SUMMARY */}
            <div className="grid md:grid-cols-4 gap-4">
                <StatCard title="Total Users" value={users.totalUsers} icon={<Users />} color="bg-blue-100" />
                <StatCard title="Total Citizens" value={users.totalCitizens} icon={<UserCheck />} color="bg-green-100" />
                <StatCard title="Total Staff" value={users.totalStaff} icon={<UserCog />} color="bg-yellow-100" />
                <StatCard title="Premium Users" value={users.totalPremium} icon={<Star />} color="bg-purple-100" />
            </div>

            {/* ISSUES SUMMARY */}
            <div className="grid md:grid-cols-5 gap-4">
                <StatCard title="Total Issues" value={issues.totalIssues} color="bg-blue-100" />
                <StatCard title="Pending" value={issues.pending} color="bg-yellow-100" />
                <StatCard title="In Progress" value={issues.inProgress} color="bg-orange-100" />
                <StatCard title="Resolved" value={issues.resolved} color="bg-green-100" />
                <StatCard title="Closed" value={issues.closed} color="bg-gray-200" />
            </div>

            {/* PRIORITY SUMMARY */}
            <div className="grid md:grid-cols-2 gap-4">
                <StatCard
                    title="Normal Priority"
                    value={issues.priority.normalPriority}
                    color="bg-gray-100"
                />
                <StatCard
                    title="High Priority (Boosted)"
                    value={issues.priority.highPriority}
                    color="bg-red-100"
                />
            </div>

            {/* PAYMENTS SUMMARY */}
            <div className="grid md:grid-cols-2 gap-4">
                <StatCard
                    title="Total Boost Payments"
                    value={payments.totalBoostPayments}
                    color="bg-indigo-100"
                    icon={<ClipboardList />}
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${payments.totalRevenue}`}
                    color="bg-green-100"
                />
            </div>

            {/* CHARTS */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* ISSUES BAR CHART */}
                <div className="bg-white shadow p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Issues by Status</h3>

                    <Bar
                        data={{
                            labels: ["Pending", "In Progress", "Resolved", "Closed"],
                            datasets: [
                                {
                                    label: "Issues",
                                    data: [
                                        issues.pending,
                                        issues.inProgress,
                                        issues.resolved,
                                        issues.closed
                                    ],
                                    backgroundColor: ["#facc15", "#fb923c", "#4ade80", "#94a3b8"]
                                }
                            ]
                        }}
                    />
                </div>

                {/* PRIORITY PIE CHART */}
                <div className="bg-white shadow p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Issues by Priority</h3>

                    <Pie
                        data={{
                            labels: ["Normal", "High"],
                            datasets: [
                                {
                                    data: [
                                        issues.priority.normalPriority,
                                        issues.priority.highPriority
                                    ],
                                    backgroundColor: ["#d1d5db", "#ef4444"]
                                }
                            ]
                        }}
                    />
                </div>
            </div>

            {/* STAFF PERFORMANCE */}
            <div className="bg-white shadow p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Staff Performance</h3>
                <ul className="space-y-3">
                    {stats.staffPerformance.map((s, i) => (
                        <li key={i} className="flex justify-between border p-3 rounded">
                            <span className="font-semibold">{s._id}</span>
                            <span>{s.resolvedCount} issues resolved</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ACTIVE CITIZENS */}
            <div className="bg-white shadow p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Top Active Citizens</h3>
                <ul className="space-y-3">
                    {stats.activeCitizens.map((c, i) => (
                        <li key={i} className="flex justify-between border p-3 rounded">
                            <span>{c._id}</span>
                            <span>{c.count} issues submitted</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* LATEST RESOLVED */}
            <div className="bg-white shadow p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Latest Resolved Issues</h3>

                <div className="grid md:grid-cols-3 gap-4">
                    {stats.latestResolved.map((issue, i) => (
                        <div key={i} className="border p-3 rounded shadow-sm">
                            <h4 className="font-bold">{issue.title}</h4>
                            <p className="text-sm text-gray-600">{issue.category}</p>
                            <p className="text-xs mt-2">Reported: {new Date(issue.reportedAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


// REUSABLE STAT CARD
const StatCard = ({ title, value, icon, color }) => (
    <div className={`p-4 rounded-lg shadow border ${color}`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            {icon && <div className="text-gray-700">{icon}</div>}
        </div>
    </div>
);
