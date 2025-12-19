import React from "react";

import missionSlide1 from "../../assets/missionSlide1.jpg";
import missionSlide2 from "../../assets/missionSlide2.jpg";
import missionSlide3 from "../../assets/missionSlide3.jpg";
import missionSlide4 from "../../assets/missionSlide4.jpg";
import missionSlide5 from "../../assets/missionSlide5.jpg";
import missionSlide6 from "../../assets/missionSlide6.jpg";
import civicImage from "../../assets/civic.jpg";
import platformImage from "../../assets/platform.jpg";

const About = () => {
  const slides = [
    missionSlide1,
    missionSlide2,
    missionSlide3,
    missionSlide4,
    missionSlide5,
    missionSlide6,
  ];

  return (
    <div className="bg-[#EBEBEB] dark:text-[#EFECE6] -mt-25 font-display transition-colors duration-300">

      {/* Header */}
      <header className="pt-10 pb-12 md:pt-35 md:pb-20 text-center md:px-0 px-4 sm:px-6">
        <div className="inline-block px-3 py-1 mb-6 border border-black/20 dark:border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300">
          Our Mission
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-5xl font-semibold mb-4 transition-all duration-500 ease-out">
          Building safer <br className="hidden md:block" />
          cities together
        </h1>
      </header>

      {/* ================= Gallery Section – SMOOTH SLIDER ================= */}
      <section className="pb-10 w-full overflow-hidden">
        <div className="flex gap-5 w-max animate-marquee will-change-transform">
          {[...slides, ...slides].map((src, index) => (
            <div
              key={index}
              className="w-[260px] sm:w-[280px] md:w-[450px] shrink-0 transition-transform duration-500 ease-out hover:scale-[1.02]"
            >
              <img
                src={src}
                className="h-72 sm:h-80 w-full object-cover rounded-xl transition-all duration-500 ease-out"
                alt="Gallery"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Platform description */}
      <section className="max-w-[1400px] mx-auto text-center mt-10 mb-20 md:px-0 px-4 sm:px-6">
        <div className="inline-block px-3 py-1 mb-5 border border-black/20 dark:border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
          The Platform
        </div>
        <p className="text-xl md:px-0 md:text-3xl md:w-[1000px] mx-auto leading-relaxed font-medium text-black/80 dark:text-white/80 transition-opacity duration-500">
          Crafted for engaged citizens and responsive municipalities, our platform bridges the gap between public needs and infrastructure maintenance. Every report is a step towards a cleaner, safer, and more connected community.
        </p>
      </section>

      {/* Real-time Tracking */}
      <section className="max-w-[1400px] mx-auto mb-32 md:px-0 px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1 relative rounded-2xl overflow-hidden shadow-2xl shadow-black/5 dark:shadow-none transition-all duration-500 hover:scale-[1.01]">
            <img
              src={platformImage}
              alt="Engineer inspecting site"
              className="w-full h-auto object-cover transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-2 right-6 dark:bg-black/80 p-4 rounded-lg dark:border-white/10">
              <div className="flex items-start flex-col text-xs font-mono">
                <span className="text-white flex items-center gap-2">
                  <span className="text-yellow-300 text-xl">+ </span>
                  Status: Resolved
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-block px-3 py-1 mb-6 border border-black/20 dark:border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
              Real-time Tracking
            </div>

            <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight transition-all duration-500">
              Innovate with <br /> purpose
            </h2>

            <p className="text-lg text-black/60 dark:text-white/60 mb-8 leading-relaxed transition-opacity duration-500">
              With intuitive layouts, responsive features, and in-depth customization, CivicReport empowers you to share your infrastructure concerns authentically and connect with the departments who care just as deeply as you do.
            </p>
          </div>
        </div>
      </section>

      {/* Civic Impact */}
      <section className="max-w-[1400px] mx-auto mb-32 md:px-0 px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <div className="inline-block px-3 py-1 mb-6 border border-black/20 dark:border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
              Civic Impact
            </div>

            <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight transition-all duration-500">
              A lasting first <br /> impression
            </h2>

            <p className="text-lg text-black/60 dark:text-white/60 mb-8 leading-relaxed transition-opacity duration-500">
              Crafted by acclaimed urban planners known for their exceptional record, this product showcases a refined aesthetic and meticulous attention to detail that elevates overall appeal.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/5 dark:shadow-none transition-all duration-500 hover:scale-[1.01]">
            <img
              src={civicImage}
              alt="Road through forest"
              className="transition-transform duration-700"
            />

            <div className="absolute bottom-0 left-2 right-6 dark:bg-black/80 p-4 rounded-lg dark:border-white/10">
              <div className="flex items-start flex-col text-xs font-mono">
                <span className="text-white flex items-center gap-2">
                  <span className="text-yellow-300 text-xl">+ </span>
                  Status: Resolved
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="max-w-[1400px] mx-auto py-24 md:py-32 md:px-0 px-4 sm:px-6">
        <div className="mb-12">
          <div className="inline-block px-3 py-1 mb-6 border border-black/20 dark:border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
            About Us
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl transition-all duration-500">
            The ultimate platform for cities driven by sustainability
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-8 rounded-2xl overflow-hidden h-[360px] md:h-[500px]">
            <img
              alt="Modern sustainable city architecture"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdzpo2WANipjxETIZtPm5hbyNi279R14S3_Bb-kAaKxgw9L-hZomgT2eiu_RVQy-qhyuYcK0yh33MF8CbZAGNmG8fsXxnlOP5yJkgtFOuRPhzyjrWFl5M8tgfUbgZ-UlgUXQdDm4KqIjyI9XejHkAFD5UE6vbJK7HkwANrNxljI3boRPurnYUWb48upUNcT7xRbGlmUvbj5_yfq9k8PC5tmVLkAc0tavHUItXIWqIVMsZF013xrbqeM9yr5YDDhhY11a3hFkkhDGSL"
            />
          </div>

          <div className="md:col-span-4 flex flex-col justify-between py-4">
            <p className="text-lg font-medium text-black/80 dark:text-white/80 text-justify transition-opacity duration-500">
              Emphasizing low-impact design principles, this platform seamlessly integrates style and sustainability.
            </p>

            <div className="mt-8">
              <h4 className="text-lg font-bold mb-2">Our Metrics</h4>
              <div className="flex gap-8">
                <div>
                  <span className="block text-3xl font-bold">12k+</span>
                  <span className="text-xs text-black/50 dark:text-white/50 uppercase tracking-wider">
                    Issues Fixed
                  </span>
                </div>
                <div>
                  <span className="block text-3xl font-bold">98%</span>
                  <span className="text-xs text-black/50 dark:text-white/50 uppercase tracking-wider">
                    Resolution Rate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
