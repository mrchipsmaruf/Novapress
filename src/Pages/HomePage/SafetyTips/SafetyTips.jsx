import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import safetyTipsImage1 from "../../../assets/safetyTipsImage1.jpg";
import safetyTipsImage2 from "../../../assets/safetyTipsImage2.jpg";
import safetyTipsImage3 from "../../../assets/safetyTipsImage3.jpg";
import safetyTipsImage4 from "../../../assets/safetyTipsImage4.jpg";

import "swiper/css";

import {
  MdElectricalServices,
  MdOutlineSecurity,
  MdOutlineVisibility,
} from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

export default function SafetyTips() {
  const sliderImages = [
    {
      tag: "ELECTRICAL SAFETY",
      title: "Avoid Electrical Danger",
      text:
        "Stay at least 30 feet away from downed power lines or exposed wiring. Do not touch metal fences or wet surfaces near electrical hazards report the issue immediately.",
      src: safetyTipsImage1,
    },
    {
      tag: "PUBLIC AWARENESS",
      title: "Prioritize Emergency Safety.",
      text:
        "When documenting streetlights or potholes, remain on the sidewalk. Do not step into active traffic lanes to capture a better angle.",
      src: safetyTipsImage2,
    },
    {
      tag: "TRAFFIC SAFETY",
      title: "Stay Aware Near Traffic",
      text:
        "When documenting road or lighting issues, remain on the sidewalk and avoid stepping into traffic lanes. Always check for vehicles, especially at night or in low visibility.",
      src: safetyTipsImage3,
    },
    {
      tag: "CONSTRUCTION ZONES",
      title: "Respect Safety Zones",
      text:
        "Stay outside construction barriers and warning tape when taking photos. Loose debris, machinery, and uneven ground can cause serious injury always keep a safe distance.",
      src: safetyTipsImage4,
    },
  ];

  return (
    <section
      className="relative overflow-hidden pb-16 pt-16 px-4 sm:px-6 lg:px-8 text-white"
      style={{
        backgroundColor: "#0b0d10",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Soft vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.04), rgba(0,0,0,0.85))",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 mb-6 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold">
            Safety First
          </span>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            Staying safe while <br className="hidden md:block" />
            navigating the city
          </h2>
        </div>

        {/* Swiper */}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={12}
          loop={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mb-12"
        >
          {sliderImages.map((item, index) => (
            <SwiperSlide
              key={index}
              className="w-[90%]! md:w-[48%]! lg:w-[48%]!"
            >
              <div className="relative overflow-hidden rounded-xl h-[400px] shadow-lg group">
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8">
                  <div className="inline-block px-4 py-1.5 mb-4 border border-white/40 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold">
                    {item.tag}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-200 text-sm md:text-base">
                    {item.text}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: <MdOutlineVisibility />,
              title: "High Visibility",
              text:
                "Wear bright or reflective clothing if you are walking near roads at night or in low-light conditions.",
            },
            {
              icon: <IoIosWarning />,
              title: "Hazard Reporting",
              text:
                "If you see an immediate life-threatening hazard, call emergency services directly instead of using the app.",
            },
            {
              icon: <MdOutlineSecurity />,
              title: "Secure Data",
              text:
                "Your reports are anonymous by default. We prioritize protecting citizen identity while ensuring public safety.",
            },
            {
              icon: <MdElectricalServices />,
              title: "Avoid Debris",
              text:
                "Never touch downed power lines or exposed electrical wiring. Keep a distance of at least 30 feet.",
            },
          ].map((card, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="mb-4 p-3 rounded-2xl bg-white text-black shadow-sm">
                <span className="text-3xl">{card.icon}</span>
              </div>
              <h4 className="text-lg font-bold mb-1">{card.title}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
