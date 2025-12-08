import React from "react";

const HowItWorks = () => {
    return (
        <section className="pt-15 pb-6 px-4 sm:px-6 lg:px-8 bg-[#EBEBEB] dark:bg-[#0D0D0D] relative overflow-hidden">
            <div className="border-b pb-25 max-w-[1400px] mx-auto">
                <div className="relative">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <h2 className="inline-block py-1 px-4 rounded-full border border-gray-300 dark:border-gray-600 text-xs font-semibold uppercase bg-white dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark">
                            Process
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                            How It Works
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                            From reporting a pothole to fixing a streetlight, our transparent process keeps you informed every step of the way.
                        </p>
                    </div>

                    {/* Middle vertical line */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-65 bottom-35 w-0.5 bg-gray-300 dark:bg-white/10" />

                    {/* STEP 1 */}
                    <StepBlock
                        title="1. Spot & Snap"
                        icon="add_a_photo"
                        text="Notice a public infrastructure issue? Take a quick photo using our mobile-friendly interface. Whether it's a damaged sidewalk or a broken signal, your input matters."
                        reverse={false}
                        children={
                            <div className="bg-white dark:bg-[#171717] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                        <span className="material-icons-outlined text-red-500 text-sm">priority_high</span>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">New Report Draft</span>
                                </div>

                                <div className="h-24 bg-gray-200 dark:bg-black/40 rounded-lg mb-3 overflow-hidden">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNx-wBuxxtwLfX1KDgPJrZ1xynw3ffPDuIDiEh7HaEHCrIaP6hcHTfozeZNuWk1KmOak63ZZaqAE2W0idy1Mmf_hXbVqZd_x6tOv2C35UOun6uKGBg5YmMtaSaMyeeheYo3H5iT3QmGO0pV8YOgyg-xYtNtSnS_rJbhCdZDCT051yxAnOHdXPCj89aRQbfeSv9TPKFHHOvjzkXJWWV5RXbW-Wh4LwfFNqRVII7kOYT8fGvCMf5yXZHYYiykExJ5yPc--LcMV5ecoiO"
                                        className="w-full h-full object-cover opacity-80" />
                                </div>

                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Location: 5th Ave & Main</span>
                                    <span className="text-yellow-500">Uploading...</span>
                                </div>
                            </div>
                        } />

                    {/* STEP 2 */}
                    <StepBlock
                        title="2. Staff Verification"
                        icon="fact_check"
                        text="Our municipal team reviews your submission. We categorize the issue, assess the severity, and assign it to the correct department."
                        reverse={true}
                        children={
                            <div className="bg-white dark:bg-[#171717] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/5">
                                <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-white/10 pb-3">
                                    <span className="text-sm font-semibold">Ticket #8291</span>
                                    <span className="px-2 py-1 text-xs rounded bg-yellow-500/20 text-yellow-500">
                                        Under Review
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                                        <div className="h-2 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                                    </div>
                                    <div className="h-2 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-2 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
                                </div>
                            </div>
                        } />

                    {/* STEP 3 */}
                    <StepBlock
                        title="3. Scheduled Repair"
                        icon="engineering"
                        text="Maintenance crews are dispatched to the location. You can track the status on your dashboard."
                        reverse={false}
                        children={
                            <div className="bg-white dark:bg-[#171717] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/5 relative">
                                <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10" />

                                <div className="relative flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <span className="material-icons-outlined text-white">calendar_month</span>
                                    </div>

                                    <div>
                                        <h5 className="font-medium text-gray-900 dark:text-white">Repair Scheduled</h5>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Oct 24, 2023 • 09:00 AM</p>
                                    </div>
                                </div>
                            </div>
                        } />

                    {/* STEP 4 */}
                    <StepBlock
                        title="4. Issue Closed"
                        icon="check_circle"
                        text="Once the repair is verified, the ticket is closed. You receive a final notification."
                        reverse={true}
                        children={
                            <div className="bg-white dark:bg-[#171717] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/5 text-center">
                                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                                    <span className="material-icons-outlined text-green-500 text-3xl">done_all</span>
                                </div>

                                <h5 className="text-lg font-bold">Case Resolved!</h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Thank you for helping improve our city.
                                </p>

                                <button className="mt-4 text-yellow-500 hover:underline text-sm">
                                    View Final Report
                                </button>
                            </div>
                        } />

                    {/* Bottom button */}
                    <div className="text-center mt-20">
                        <button className="px-8 py-4 rounded-full bg-yellow-300 font-bold shadow-[0_0_20px_rgba(232,216,128,0.3)] flex hover:text-white items-center mx-auto gap-2 hover:bg-black/90">
                            Report an Issue Now
                            <span className="material-icons-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;




/* ---------------- CHILD COMPONENT ---------------- */

const StepBlock = ({ title, text, icon, reverse, children }) => {
    return (
        <div className="relative z-10 mb-20 group">
            <div className={`flex flex-col md:flex-row items-center justify-between w-full ${reverse ? "md:flex-row-reverse" : ""}`}>

                {/* Text */}
                <div className={`w-full md:w-5/12 mb-8 ${reverse ? "md:pl-12 text-left" : "md:pr-12 md:text-right"}`}>
                    <h4 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                        {title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{text}</p>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-[#171717] border-4 border-gray-200 dark:border-white/10 flex items-center justify-center shadow-xl z-20 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all">
                    <span className="material-icons-outlined text-yellow-400 text-3xl">{icon}</span>
                </div>

                {/* Card */}
                <div className={`w-full md:w-5/12 mt-8 ${reverse ? "md:mt-0 md:pr-12" : "md:mt-0 md:pl-12"}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
