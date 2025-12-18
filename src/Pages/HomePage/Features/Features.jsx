import React, { useState } from "react";

const Feature = () => {
  const features = [
    {
      key: "transparency",
      label: "Real-Time Transparency",
      image: "https://i.ibb.co.com/XfLLHVvs/pexels-daniel-clark-346904598-14134524.jpg",
    },
    {
      key: "routing",
      label: "Smart Issue Routing",
      image: "https://i.ibb.co.com/JFrczgRB/pexels-jeshoots-com-147458-442584.jpg",
    },
    {
      key: "community",
      label: "Community Reporting",
      image: "https://i.ibb.co.com/BH8tNfCR/pexels-olly-3791664.jpg",
    },
    {
      key: "verification",
      label: "Verified Resolutions",
      image: "https://i.ibb.co.com/C3kxKCxj/pexels-alex-albert-361284794-15437562.jpg",
    },
    {
      key: "insights",
      label: "Data-Driven Insights",
      image: "https://i.ibb.co.com/DP18Yfpm/pexels-goumbik-590022.jpg",
    },
    {
      key: "service",
      label: "Faster Public Service",
      image: "https://i.ibb.co.com/Mk0nnJKK/pexels-edmond-dantes-7103122.jpg",
    },
  ];

  const [active, setActive] = useState(null);

  return (
    <section className="-mt-10 bg-[#EBEBEB] py-24 rounded-t-4xl relative">
      <div className="max-w-[1400px] mx-auto">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 mb-6 border border-black/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
            Why Choose Novapress
          </span>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Empowering Citizens, <br className="hidden md:block" />
            Streamlining Service.
          </h2>

          <p className="mt-4 max-w-3xl text-xl mx-auto text-gray-600">
            We bridge the gap between public needs and government action through transparent, data-driven technology.
          </p>
        </div>

        {/* ================= MAIN WRAPPER ================= */}
        <div className="hidden lg:flex gap-20 items-center h-[520px]">

          {/* ================= LEFT : IMAGES ================= */}
          <div className="flex-1 h-full relative rounded-2xl overflow-hidden shadow-2xl">

            {/* Default image */}
            <img
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                active === null ? "opacity-100" : "opacity-0"
              }`}
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="City Infrastructure"
            />

            {/* Hover image */}
            {active !== null && (
              <img
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100"
                src={features[active].image}
                alt="Feature"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
          </div>

          {/* ================= RIGHT : TEXT ================= */}
          <div className="flex-1 flex flex-col justify-center gap-3">

            <div className="mb-6">
              <span className="inline-block px-3 py-1 border border-black/20 rounded-full text-xs font-semibold uppercase tracking-widest">
                Features
              </span>
            </div>

            {features.map((item, index) => (
              <div
                key={item.key}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer transition-all duration-300">
                <h3
                  className={`text-4xl md:text-5xl font-bold transition-colors duration-300 ${
                    active === index
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-900"
                  }`}>
                  {item.label}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Feature;
