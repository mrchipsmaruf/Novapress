import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import safetyTipsImage1 from "../../../assets/safetyTipsImage1.jpg"
import safetyTipsImage2 from "../../../assets/safetyTipsImage2.jpg";
import safetyTipsImage3 from "../../../assets/safetyTipsImage3.jpg";
import safetyTipsImage4 from "../../../assets/safetyTipsImage4.jpg";


import "swiper/css";
import "swiper/css/pagination";
import { MdElectricalServices, MdOutlineSecurity, MdOutlineVisibility } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

export default function SafetyTips() {
    const sliderImages = [
        {
            tag: "ELECTRICAL SAFETY",
            title: "Avoid Electrical Danger",
            text: "Stay at least 30 feet away from downed power lines or exposed wiring. Do not touch metal fences or wet surfaces near electrical hazards report the issue immediately.",
            src: safetyTipsImage1,
        },
        {
            tag: "PUBLIC AWARENESS",
            text: "When documenting streetlights or potholes, remain on the sidewalk. Do not step into active traffic lanes to capture a better angle.",
            title: "Prioritize Emergency Safety.",
            src: safetyTipsImage2,
        },
        {
            tag: "TRAFFIC SAFETY",
            title: "Stay Aware Near Traffic",
            text: "When documenting road or lighting issues, remain on the sidewalk and avoid stepping into traffic lanes. Always check for vehicles, especially at night or in low visibility.",
            src: safetyTipsImage3,
        },
        {
            tag: "CONSTRUCTION ZONES",
            title: "Respect Safety Zones",
            text: "Stay outside construction barriers and warning tape when taking photos. Loose debris, machinery, and uneven ground can cause serious injury always keep a safe distance.",
            src: safetyTipsImage4,
        },
    ];

    return (
        <section className="pb-15 px-4 pt-5 sm:px-6 lg:px-8 relative overflow-hidden bg-[#EBEBEB] dark:bg-background-dark text-text-light dark:text-text-dark">
            <div className="max-w-[1400px] mx-auto">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96  rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="inline-block py-1 px-4 rounded-full border border-gray-300 dark:border-gray-600 text-xs font-semibold uppercase bg-white dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark">
                            Safety First
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Staying safe while <br className="hidden md:block" /> navigating the city
                        </h2>
                    </div>

                    {/* Swiper Slider */}
                    <Swiper
                        slidesPerView={"auto"}
                        centeredSlides={true}
                        spaceBetween={5}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]}
                        autoplay={{ delay: 3000 }}
                        className="mySwiper mb-8"
                    >
                        {sliderImages.map((item, index) => (
                            <SwiperSlide key={index} className="w-[90%]! md:w-[48%]! lg:w-[48%]!">
                                <div className="relative overflow-hidden rounded-xl h-[400px] shadow-lg group">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 p-8">
                                        <div className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                                            {item.tag}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-200 text-sm md:text-base">{item.text}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* 4 Small Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 dark:border-gray-700">
                        {[
                            {
                                icon: <MdOutlineVisibility />,
                                title: "High Visibility",
                                text: "Wear bright or reflective clothing if you are walking near roads at night or in low-light conditions.",
                            },
                            {
                                icon: <IoIosWarning />,
                                title: "Hazard Reporting",
                                text: "If you see an immediate life-threatening hazard, call emergency services directly instead of using the app.",
                            },
                            {
                                icon: <MdOutlineSecurity />,
                                title: "Secure Data",
                                text: "Your reports are anonymous by default. We prioritize protecting citizen identity while ensuring public safety.",
                            },
                            {
                                icon: <MdElectricalServices />,
                                title: "Avoid Debris",
                                text: "Never touch downed power lines or exposed electrical wiring. Keep a distance of at least 30 feet.",
                            },
                        ].map((card, index) => (
                            <div key={index} className="flex flex-col items-start group">
                                <div className="mb-4 p-3 rounded-2xl bg-white dark:bg-card-dark shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-primary transition-all duration-300">
                                    <span className="material-icons text-3xl text-yellow-500">{card.icon}</span>
                                </div>
                                <h4 className="text-lg font-bold">{card.title}</h4>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                    {card.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}
