import React, { memo, useCallback } from "react";
import contactVideo from "../../assets/NotFountVideo.mp4";
import contactImage from "../../assets/contact.jpg";

const Contact = () => {
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
    }, []);

    return (
        <div className="-mt-25 overflow-x-hidden">

            {/* Sticky Video Section */}
            <div className="sticky top-0 left-0 w-full h-[70vh] md:h-[80vh] overflow-hidden z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="w-full h-full object-cover opacity-90 transition-opacity duration-700">
                    <source src={contactVideo} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Hero Text */}
            <div className="relative z-10 md:px-0 px-4 sm:px-6 text-center pb-30 my-10">
                <div className="max-w-[1400px] -mt-120 md:-mt-130 mx-auto transition-all duration-700">
                    <div className="inline-block px-3 py-1 mb-6 border border-white/50 dark:border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
                        <span className="text-xs text-white md:text-sm font-medium uppercase tracking-wide">
                            Contact
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mt-5 mb-15 transition-all duration-700 ease-out">
                        Need Help? <br /> We’re Ready to Assist
                    </h1>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-black relative z-20">
                <div className="pointer-events-none absolute -top-32 left-0 w-full h-64 bg-linear-to-t from-black via-black/95 to-transparent"></div>

                <div className="flex max-w-[1400px] mx-auto justify-between flex-col lg:flex-row overflow-hidden font-sans py-20 md:py-25 dark:bg-background-dark relative z-20 md:px-0 px-4 sm:px-6">

                    {/* Left Content */}
                    <div className="w-full lg:w-2/3 xl:w-7/12 flex flex-col justify-center overflow-y-auto">
                        <div className="max-w-[2xl] mx-auto w-full">

                            {/* Header */}
                            <div className="mb-12">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight transition-all duration-700">
                                    <span className="inline-block px-3 py-1 mb-6 border border-white/50 dark:border-white/20 rounded-full text-sm uppercase tracking-[0.2em] font-bold">
                                        Get in touch
                                    </span>
                                    <br /> with our support
                                </h1>

                                <p className="text-lg text-white leading-relaxed transition-opacity duration-500">
                                    Contact our support team with any questions or queries you may have.
                                </p>
                            </div>

                            {/* Address + Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                <div className="flex flex-col border-l-2 border-white pl-6 transition-all duration-500">
                                    <h3 className="text-base font-semibold text-white mb-2">
                                        Address
                                    </h3>
                                    <p className="text-white text-sm leading-relaxed">
                                        123 Infrastructure Road<br />
                                        Dhaka, Bangladesh
                                    </p>
                                </div>

                                <div className="flex flex-col border-l-2 border-white pl-6 transition-all duration-500">
                                    <h3 className="text-base font-semibold text-white mb-5">
                                        Email
                                    </h3>
                                    <a
                                        href="mailto:info@novapress.com"
                                        className="text-white hover:text-gray-400 text-sm transition-colors duration-300">
                                        info@novapress.com
                                    </a>
                                </div>
                            </div>

                            {/* Form */}
                            <form
                                className="space-y-8"
                                onSubmit={handleSubmit}
                                aria-label="Contact form"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative">
                                        <label
                                            htmlFor="name"
                                            className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                            className="block w-full border-0 border-b border-white bg-transparent py-3 px-0 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm transition-all duration-300"
                                        />
                                    </div>

                                    <div className="relative">
                                        <label
                                            htmlFor="email"
                                            className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            className="block w-full border-0 border-b border-white bg-transparent py-3 px-0 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label
                                        htmlFor="message"
                                        className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        placeholder="Message"
                                        className="block w-full border-0 border-b border-white bg-transparent pt-3 px-0 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm transition-all duration-300">
                                    </textarea>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-offset-2 transition-all duration-300 transform hover:scale-[1.03] active:scale-95">
                                        Send message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Side Image */}
                    <div className="hidden lg:block w-2/5 relative">
                        <img
                            className="absolute inset-0 w-full h-full rounded-4xl object-cover transition-transform duration-700 hover:scale-[1.02]"
                            alt="Modern white architectural building"
                            src={contactImage}
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-black/0 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Contact);
