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
        <div className="space-y-12">
            {/* HEADER */}
            <div>
                <h1 className="inline-block px-6 py-2 border border-black/10 rounded-full text-xs uppercase tracking-[0.3em] font-semibold text-gray-700 mb-6">
                    Admin Statistics
                </h1>
            </div>

            {/* USERS */}
            <Section title="Users Overview">
                <Grid cols="md:grid-cols-4">
                    <StatCard title="Total Users" value={users.totalUsers} />
                    <StatCard title="Citizens" value={users.totalCitizens} />
                    <StatCard title="Staff" value={users.totalStaff} />
                    <StatCard title="Premium Users" value={users.totalPremium} />
                </Grid>
            </Section>

            {/* ISSUES */}
            <Section title="Issues Overview">
                <Grid cols="md:grid-cols-5">
                    <StatCard title="Total Issues" value={issues.totalIssues} />
                    <StatCard title="Pending" value={issues.pending} />
                    <StatCard title="In Progress" value={issues.inProgress} />
                    <StatCard title="Resolved" value={issues.resolved} />
                    <StatCard title="Closed" value={issues.closed} />
                </Grid>
            </Section>

            {/* PRIORITY */}
            <Section title="Issue Priority">
                <Grid cols="md:grid-cols-2">
                    <StatCard title="High Priority" value={issues.priority.highPriority} />
                    <StatCard title="Normal Priority" value={issues.priority.normalPriority} />
                </Grid>
            </Section>

            {/* PAYMENTS */}
            <Section title="Revenue">
                <Grid cols="md:grid-cols-2">
                    <StatCard title="Boost Payments" value={payments.totalBoostPayments} />
                    <StatCard title="Total Revenue ($)" value={payments.totalRevenue} />
                </Grid>
            </Section>

            {/* STAFF PERFORMANCE */}
            <Section title="Top Staff Performance">
                {staffPerformance.length === 0 ? (
                    <EmptyText text="No data available." />
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {staffPerformance.map((staff) => (
                            <ListCard
                                key={staff._id}
                                title={staff._id}
                                value={`Resolved Issues: ${staff.resolvedCount}`}
                            />
                        ))}
                    </div>
                )}
            </Section>

            {/* ACTIVE CITIZENS */}
            <Section title="Most Active Citizens">
                {activeCitizens.length === 0 ? (
                    <EmptyText text="No data available." />
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {activeCitizens.map((user) => (
                            <ListCard
                                key={user._id}
                                title={user._id}
                                value={`Issues Reported: ${user.count}`}
                            />
                        ))}
                    </div>
                )}
            </Section>

            {/* LATEST RESOLVED */}
            <Section title="Latest Resolved Issues">
                {latestResolved.length === 0 ? (
                    <EmptyText text="No resolved issues yet." />
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {latestResolved.map(issue => (
                            <div
                                key={issue._id}
                                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                            >
                                <h3 className="font-semibold text-lg mb-2">
                                    {issue.title}
                                </h3>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>Status: <span className="font-medium">{issue.status}</span></p>
                                    <p>Priority: <span className="font-medium">{issue.priority}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Section>
        </div>
    );
};

/* ---------- UI HELPERS (DESIGN ONLY) ---------- */

const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-5">{title}</h2>
        {children}
    </div>
);

const Grid = ({ cols, children }) => (
    <div className={`grid grid-cols-1 ${cols} gap-4`}>
        {children}
    </div>
);

const StatCard = ({ title, value }) => (
    <div className="rounded-xl bg-linear-to-br from-blue-50 to-white p-5 border border-blue-100 shadow-sm text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
            {title}
        </h3>
        <p className="text-3xl font-bold text-black/50">
            {value ?? 0}
        </p>
    </div>
);

const ListCard = ({ title, value }) => (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{value}</p>
    </div>
);

const EmptyText = ({ text }) => (
    <p className="text-gray-500 text-sm">{text}</p>
);

export default AdminDashboard;
