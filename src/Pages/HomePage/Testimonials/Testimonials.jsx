import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
    {
        icon: "recycling",
        title: "Missed pickup resolved",
        text: "My recycling wasn’t collected. I submitted a report, and a truck arrived the next morning. Super responsive!",
    },
    {
        icon: "water_drop",
        title: "Flood drain cleared",
        text: "I reported a clogged drain before a storm. It was cleared the same day and helped prevent flooding.",
    },
    {
        icon: "construction",
        title: "Pothole fixed in record time!",
        text: "I reported a massive pothole on 4th Avenue that was causing traffic backups. Within 48 hours, the crew patched it up. The status updates were incredibly helpful.",
    },
    {
        icon: "park",
        title: "Our park is clean again",
        text: "The playground equipment at Liberty Park had been damaged for months. I submitted a photo, and it was replaced with new safe equipment last week.",
    },
    {
        icon: "lightbulb",
        title: "Streetlights repaired fast",
        text: "Walking home felt unsafe with the streetlights out. The reporting tool was easy to use, and two days later, the lights were back on. Great service!",
    },
];

export default function Testimonials() {
    return (
        <section className="pb-24 relative z-10 bg-[#EBEBEB] w-full">
            <div className="max-w-[1400px] pt-5 border-t mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14">
                    <div className="max-w-3xl space-y-7">
                        <span className="px-4 py-1 text-xs font-semibold tracking-wide border border-gray-300 rounded-full bg-white">
                            VOICES OF THE COMMUNITY
                        </span>

                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
                            Making our city better.
                        </h2>

                        <p className="text-gray-600 text-lg max-w-xl">
                            See how citizens are using our platform to report issues, track
                            progress, and improve their neighborhoods.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-8 md:mt-0">
                        <button
                            className="swiper-button-prev-custom w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-200 transition"
                            aria-label="previous">
                            <span className="material-icons-outlined text-lg">chevron_left</span>
                        </button>

                        <button
                            className="swiper-button-next-custom w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-200 transition"
                            aria-label="next">
                            <span className="material-icons-outlined text-lg">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        prevEl: ".swiper-button-prev-custom",
                        nextEl: ".swiper-button-next-custom",
                    }}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={28}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 28 },
                        1400: { slidesPerView: 3, spaceBetween: 28 },
                    }}
                    className="overflow-visible">
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i} className="!h-auto">
                            <div
                                className="h-full flex">
                                <article className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col w-full">
                                    <div className="flex-none mb-4">
                                        <span className="material-icons-outlined text-4xl text-yellow-400">
                                            {t.icon}
                                        </span>
                                    </div>

                                    {/* title */}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        "{t.title}"
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed grow">
                                        {t.text}
                                    </p>
                                    <div className="mt-6 flex-none" />
                                </article>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
