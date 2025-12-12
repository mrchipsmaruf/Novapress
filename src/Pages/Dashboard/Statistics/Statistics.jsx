import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../../Services/axiosSecure";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import UseAuth from "../../../Hooks/UseAuth";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistics() {
    let { user } = UseAuth();

    const { data: stats, isLoading } = useQuery({
        queryKey: ["citizenStats", user?.email],
        queryFn: async () => {
            const res = await API.get(`/dashboard/citizen/${user.email}/stats`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <div className="p-5">Loading statistics...</div>;
    if (!stats) return <div className="p-5">No statistics available.</div>;

    const total = stats?.totalIssues ?? 0;
    const pending = stats?.pending ?? 0;
    const inProgress = stats?.inProgress ?? 0;
    const resolved = stats?.resolved ?? 0;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Statistics</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-blue-100 border rounded-lg">
                    <h3 className="text-lg font-semibold">Total Issues</h3>
                    <p className="text-2xl font-bold">{total}</p>
                </div>

                <div className="p-4 bg-yellow-100 border rounded-lg">
                    <h3 className="text-lg font-semibold">Pending</h3>
                    <p className="text-2xl font-bold">{pending}</p>
                </div>

                <div className="p-4 bg-orange-100 border rounded-lg">
                    <h3 className="text-lg font-semibold">In Progress</h3>
                    <p className="text-2xl font-bold">{inProgress}</p>
                </div>

                <div className="p-4 bg-green-100 border rounded-lg">
                    <h3 className="text-lg font-semibold">Resolved</h3>
                    <p className="text-2xl font-bold">{resolved}</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 shadow rounded-lg">
                <Bar
                    data={{
                        labels: ["Pending", "In Progress", "Resolved"],
                        datasets: [
                            {
                                label: "Issues by Status",
                                data: [pending, inProgress, resolved],
                                backgroundColor: ["#facc15", "#fb923c", "#4ade80"],
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
}
