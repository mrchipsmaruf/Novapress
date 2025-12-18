import React from "react";
import { Link } from "react-router";

const HowItWorks = () => {
    return (
        <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-[#EBEBEB] dark:bg-[#0D0D0D] relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="relative">

                    {/* Header */}
                    <div className="text-center mb-24">
                        <h2 className="inline-block px-4 py-1.5 mb-6 border border-black/20 dark:border-white/20 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold text-gray-700 dark:text-gray-300">
                            Process
                        </h2>

                        <h3 className="mt-2 text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                            How It Works
                        </h3>

                        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            From reporting a pothole to fixing a streetlight, our transparent process keeps you informed every step of the way.
                        </p>
                    </div>

                    {/* Middle vertical line */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-72 bottom-32 w-px bg-linear-to-b from-transparent via-gray-300 dark:via-white/10 to-transparent" />

                    {/* STEP 1 */}
                    <StepBlock
                        title="1. Spot & Snap"
                        icon="add_a_photo"
                        text="Notice a public infrastructure issue? Take a quick photo using our mobile-friendly interface. Whether it's a damaged sidewalk or a broken signal, your input matters."
                        reverse={false}>
                        <div className="bg-white dark:bg-[#171717] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/5 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <span className="material-icons-outlined text-red-500 text-sm">
                                        priority_high
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    New Report Draft
                                </span>
                            </div>

                            <div className="h-24 bg-gray-200 dark:bg-black/40 rounded-lg mb-3 overflow-hidden">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNx-wBuxxtwLfX1KDgPJrZ1xynw3ffPDuIDiEh7HaEHCrIaP6hcHTfozeZNuWk1KmOak63ZZaqAE2W0idy1Mmf_hXbVqZd_x6tOv2C35UOun6uKGBg5YmMtaSaMyeeheYo3H5iT3QmGO0pV8YOgyg-xYtNtSnS_rJbhCdZDCT051yxAnOHdXPCj89aRQbfeSv9TPKFHHOvjzkXJWWV5RXbW-Wh4LwfFNqRVII7kOYT8fGvCMf5yXZHYYiykExJ5yPc--LcMV5ecoiO"
                                    className="w-full h-full object-cover opacity-80"
                                    alt="Issue preview"/>
                            </div>

                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Location: 5th Ave & Main</span>
                                <span className="text-black/50">Uploading…</span>
                            </div>
                        </div>
                    </StepBlock>

                    {/* STEP 2 */}
                    <StepBlock
                        title="2. Staff Verification"
                        icon="fact_check"
                        text="Our municipal team reviews your submission. We categorize the issue, assess the severity, and assign it to the correct department."
                        reverse={true}>
                        <div className="bg-white dark:bg-[#171717] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/5 hover:shadow-xl transition-shadow">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-white/10 pb-3">
                                <span className="text-sm font-semibold">Ticket #8291</span>
                                <span className="px-2 py-1 text-xs rounded bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                                    Under Review
                                </span>
                            </div>

                            <div className="space-y-3 animate-pulse">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                                    <div className="h-2 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                                </div>
                                <div className="h-2 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                                <div className="h-2 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
                            </div>
                        </div>
                    </StepBlock>

                    {/* STEP 3 */}
                    <StepBlock
                        title="3. Scheduled Repair"
                        icon="engineering"
                        text="Maintenance crews are dispatched to the location. You can track the status on your dashboard."
                        reverse={false}>
                        <div className="bg-white dark:bg-[#171717] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/5 relative overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10" />

                            <div className="relative flex items-center gap-4">
                                <div className="w-12 h-12 bg-black/70 rounded-lg flex items-center justify-center">
                                    <span className="material-icons-outlined text-white">
                                        calendar_month
                                    </span>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-gray-900 dark:text-white">
                                        Repair Scheduled
                                    </h5>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Oct 24, 2023 • 09:00 AM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </StepBlock>

                    {/* STEP 4 */}
                    <StepBlock
                        title="4. Issue Closed"
                        icon="check_circle"
                        text="Once the repair is verified, the ticket is closed. You receive a final notification."
                        reverse={true}>
                        <div className="bg-white dark:bg-[#171717] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/5 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                                <span className="material-icons-outlined text-green-600 text-3xl">
                                    done_all
                                </span>
                            </div>

                            <h5 className="text-lg font-bold">
                                Case Resolved!
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Thank you for helping improve our city.
                            </p>
                        </div>
                    </StepBlock>

                    {/* CTA */}
                    <div className="text-center mt-24">
                        <Link
                            to="/dashboard/add-issue"
                            className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-medium text-white bg-black hover:bg-white hover:text-black transition-colors">
                            Report an Issue Now
                            <span className="material-icons-outlined text-base">
                                arrow_forward
                            </span>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;


/*CHILD COMPONENT*/

const StepBlock = ({ title, text, icon, reverse, children }) => {
    return (
        <div className="relative z-10 mb-24 group">
            <div
                className={`flex flex-col md:flex-row items-center justify-between w-full ${
                    reverse ? "md:flex-row-reverse" : ""
                }`}>

                {/* Text */}
                <div
                    className={`w-full md:w-5/12 mb-10 ${
                        reverse
                            ? "md:pl-12 text-left"
                            : "md:pr-12 md:text-right"
                    }`}>
                    <h4 className="text-2xl font-bold mb-4 transition-colors group-hover:text-black dark:group-hover:text-white">
                        {title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {text}
                    </p>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-[#171717] border-4 border-gray-200 dark:border-white/10 flex items-center justify-center shadow-xl z-20 transition-transform duration-300 group-hover:scale-110 group-hover:border-black/60">
                    <span className="material-icons-outlined text-black/60 dark:text-white/70 text-3xl">
                        {icon}
                    </span>
                </div>

                {/* Card */}
                <div
                    className={`w-full md:w-5/12 mt-10 ${
                        reverse ? "md:mt-0 md:pr-12" : "md:mt-0 md:pl-12"
                    }`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
