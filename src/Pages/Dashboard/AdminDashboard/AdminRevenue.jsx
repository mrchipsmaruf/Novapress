import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const AdminRevenue = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["adminRevenue"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payment/admin/revenue");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const { totalRevenue, totalPremiumUsers, monthlyIncome, transactions } = data;

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-semibold">Payments & Revenue</h1>

            {/* TOP CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-green-100 rounded-lg shadow">
                    <p className="text-xl font-bold">Total Revenue</p>
                    <p className="text-3xl font-bold">${totalRevenue}</p>
                </div>

                <div className="p-5 bg-blue-100 rounded-lg shadow">
                    <p className="text-xl font-bold">Premium Users</p>
                    <p className="text-3xl font-bold">{totalPremiumUsers}</p>
                </div>

                <div className="p-5 bg-purple-100 rounded-lg shadow">
                    <p className="text-xl font-bold">Total Transactions</p>
                    <p className="text-3xl font-bold">{transactions.length}</p>
                </div>
            </div>

            {/* MONTHLY REVENUE CHART */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Monthly Revenue</h2>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyIncome}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* TRANSACTION HISTORY */}
            <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
                <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>

                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Payment ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No payments found.
                                </td>
                            </tr>
                        )}

                        {transactions.map((t) => (
                            <tr key={t.paymentId}>
                                <td>{t.name || "N/A"}</td>
                                <td>{t.email}</td>
                                <td className="font-semibold">${t.amount}</td>
                                <td>{t.paymentId}</td>
                                <td>{new Date(t.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AdminRevenue;
