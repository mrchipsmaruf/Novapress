import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    // GET ADMIN STATS
    const { data: stats, isLoading } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/admin/stats");
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center text-xl">Loading statistics...</p>;
    }

    const { users, issues, payments, staffPerformance, activeCitizens, latestResolved } = stats;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-5">Admin Dashboard</h1>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-blue-100 rounded-lg shadow">
                    <h2 className="text-xl font-bold">Total Users</h2>
                    <p className="text-2xl">{users.totalUsers}</p>
                </div>

                <div className="p-4 bg-green-100 rounded-lg shadow">
                    <h2 className="text-xl font-bold">Total Issues</h2>
                    <p className="text-2xl">{issues.totalIssues}</p>
                </div>

                <div className="p-4 bg-yellow-100 rounded-lg shadow">
                    <h2 className="text-xl font-bold">Premium Users</h2>
                    <p className="text-2xl">{users.totalPremium}</p>
                </div>

                <div className="p-4 bg-purple-100 rounded-lg shadow">
                    <h2 className="text-xl font-bold">Revenue</h2>
                    <p className="text-2xl">${payments.totalRevenue}</p>
                </div>
            </div>

            {/* STAFF PERFORMANCE */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">Top Staff (Resolved Issues)</h2>
                <ul className="space-y-2">
                    {staffPerformance.map((s) => (
                        <li key={s._id} className="p-3 bg-white rounded shadow flex justify-between">
                            <span>{s._id}</span>
                            <span className="font-bold">{s.resolvedCount} resolved</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ACTIVE CITIZENS */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">Most Active Citizens</h2>
                <ul className="space-y-2">
                    {activeCitizens.map((c) => (
                        <li key={c._id} className="p-3 bg-white rounded shadow flex justify-between">
                            <span>{c._id}</span>
                            <span className="font-bold">{c.count} issues</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* LATEST RESOLVED ISSUES */}
            <div>
                <h2 className="text-2xl font-semibold mb-3">Recently Resolved Issues</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {latestResolved.map((issue) => (
                        <div key={issue._id} className="p-4 bg-white rounded shadow">
                            <h3 className="font-bold text-lg">{issue.title}</h3>
                            <p>Status: {issue.status}</p>
                            <p>Priority: {issue.priority}</p>
                            <p className="text-sm text-gray-600">
                                Reported: {new Date(issue.reportedAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
