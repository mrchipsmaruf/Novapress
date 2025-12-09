import React from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { MdBolt, MdInsights, MdOutlineVisibility } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router";

const Feature = () => {
  return (
    <section className="mt-[80vh] bg-[#F5F5F5] py-24 rounded-t-4xl bg-background-light dark:bg-background-dark relative">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full border border-gray-300 dark:border-gray-600 text-xs font-semibold uppercase bg-white dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark">
            Why Choose Novapress
          </span>

          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
            Empowering Citizens, <br className="hidden md:block" /> Streamlining Service.
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            We bridge the gap between public needs and government action through transparent, data-driven technology.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <MdOutlineVisibility />,
              title: "Total Transparency",
              desc: "Track the status of every reported issue in real-time. See who is assigned, expected resolution dates, and photo updates.",
            },
            {
              icon: <MdBolt />,
              title: "Rapid Response",
              desc: "Automated routing sends reports directly to the nearest available maintenance crew, cutting downtime by up to 40%.",
            },
            {
              icon: <MdInsights />,
              title: "Data Collection",
              desc: "Aggregated community data helps identify infrastructure hotspots, enabling proactive maintenance planning.",
            },
            {
              icon: <RiVerifiedBadgeFill />,
              title: "Efficient Delivery",
              desc: "Streamlined workflows ensure resources are used effectively, delivering better public services at lower costs.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-surface-dark p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 "></div>

              <div className="relative z-10 ">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl text-yellow-400 mb-6 transition-colors duration-300">
                  <span className="material-icons-outlined text-3xl">{item.icon}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-display">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Smart Mapping Section */}
        <div className="mt-24 bg-white dark:bg-surface-dark-lighter rounded-3xl overflow-hidden shadow-2xl dark:shadow-none border border-gray-200 dark:border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left content */}
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-6">
                <span className="font-medium tracking-wide text-yellow-400 text-sm uppercase">
                  Smart Mapping Technology
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Visualize Your City's Health in Real-Time
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                Our interactive map provides a bird's-eye view of all ongoing maintenance.
                Filter by district, issue type, or urgency to understand how your city is evolving every day.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Live GPS tracking of maintenance vehicles",
                  "Heatmaps for high-priority infrastructure issues",
                  "Historical data analysis for better future planning",
                ].map((text, i) => (
                  <li key={i} className="flex items-center">
                    <span className="material-icons-outlined text-yellow-400 mr-3 "><FaCheckCircle /></span>
                    <span className="text-gray-700 dark:text-gray-300">{text}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={"about"}
                className="inline-flex items-center text-yellow-400 font-semibold hover:text-gray-900 transition-colors group">
                Learn more about our technology
                <span className="material-icons-outlined ml-2 transform group-hover:translate-x-1 transition-transform">
                  <FaArrowRight />
                </span>
              </Link>
            </div>

            {/* Right image */}
            <div className="relative h-96 lg:h-auto">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTFWuydJxS7zPUf_8JrQslEbhIDm5d1gfLN1nHYFXvfYQPH1YXh84KgJRfppprHs81VRhA8mWsehzPrGJXDYYhxTY1zi7KrFmxoOicskVsg0qMT80OBkHJuKo2cItTC4SnWsJsQaPKSm-74g9LC2-DGJJVg6EGIzSVQLNdV_0QtBK-cM2_d0T5IiaTHcCVCsZtgvtcYZBWLNQUvzCpzrLLMYQXOJku19FqEe2_IgQM-C_Q7J5xzcAVDXqRzpef2JYrnKWtXB5fdPFH"
                alt="Digital map interface"/>
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-surface-dark-lighter to-transparent lg:w-32"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
