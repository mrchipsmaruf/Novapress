import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosSecure from "../../../Services/axiosSecure";
import Loading from "../../../Components/Loading/Loading";
import UseAuth from "../../../Hooks/UseAuth";

const ResolvedIssues = () => {

    const { loading } = UseAuth();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ["resolvedIssuesHome"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/issues");
            return res.data || [];
        },
        staleTime: 1000 * 60 * 5,
    });

    const resolvedIssues = useMemo(() => {
        return issues
            .filter(issue => issue.status === "resolved")
            .slice(0, 6);
    }, [issues]);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className="bg-[#E3D2CD] py-16 relative">
            <div className="max-w-[1400px] mx-auto">

                {/* Heading */}
                <div className="text-center mb-12">

                    <span className="inline-block px-3 py-1 mb-6 border border-black/20 dark:border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
                        Recently Resolved Issues
                    </span>

                    <p className="mt-2 text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                        Problems successfully solved for a better community
                    </p>
                </div>

                {/* Cards */}
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
                                <span className="text-xs text-black/50 font-semibold mb-1">
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
                                    className="btn bg-black text-white hover:text-black hover:bg-white btn-sm mt-4 w-full"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
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
