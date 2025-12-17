import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosSecure from "../../../Services/axiosSecure";

const ResolvedIssues = () => {
    const { data: issues = [], isLoading } = useQuery({
        queryKey: ["resolvedIssuesHome"],
        queryFn: async () => {
            const res = await axiosSecure.get("https://novapress-server.vercel.app/issues");
            return res.data || [];
        },
        staleTime: 1000 * 60,      // cache 1 minute
        refetchOnWindowFocus: false, // prevent re-render on scroll/tab focus
    });

    // ✅ Memoized resolved issues (performance)
    const resolvedIssues = useMemo(() => {
        return issues
            .filter(issue => issue.status === "resolved")
            .slice(0, 6);
    }, [issues]);

    // ✅ Skeleton loader (smooth UX)
    if (isLoading) {
        return (
            <section className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-72 bg-white rounded-xl shadow-md animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white py-16 relative">
            <div className="max-w-7xl mx-auto px-4">

                {/* 🔹 Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Recently Resolved Issues
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Problems successfully solved for a better community
                    </p>
                </div>

                {/* 🔹 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {resolvedIssues.map(issue => (
                        <div
                            key={issue._id}
                            className="
                bg-white rounded-xl shadow-md
                transform transition-transform duration-300
                hover:-translate-y-1
                flex flex-col overflow-hidden
                will-change-transform
              "
                        >
                            {issue.image && (
                                <img
                                    loading="lazy"
                                    decoding="async"
                                    src={issue.image}
                                    alt={issue.title}
                                    className="h-44 w-full object-cover"
                                />
                            )}

                            <div className="p-5 flex flex-col flex-1">
                                <span className="text-xs text-green-600 font-semibold mb-1">
                                    ✔ Resolved
                                </span>

                                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                                    {issue.title}
                                </h3>

                                <p className="text-sm text-gray-500 mb-2">
                                    {issue.location}
                                </p>

                                <p className="text-sm text-gray-600 flex-1">
                                    {issue.description?.slice(0, 100)}...
                                </p>

                                <Link
                                    to={`/dashboard/issue/${issue._id}`}
                                    className="btn btn-sm btn-primary mt-4 w-full"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🔹 Empty State */}
                {resolvedIssues.length === 0 && (
                    <div className="text-center text-gray-500 mt-12">
                        No resolved issues yet.
                    </div>
                )}
            </div>
        </section>
    );
};

export default ResolvedIssues;
