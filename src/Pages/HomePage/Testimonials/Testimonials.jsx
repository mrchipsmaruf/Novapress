import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";
import { MdArrowOutward } from "react-icons/md";

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
        <section className="pb-24 pt-10 relative z-10 bg-[#EBEBEB] w-full">
            <div className="max-w-[1400px] pt-5 mx-auto px-4 sm:px-6 md:px-0">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 gap-8 md:gap-0">
                    <div className="max-w-3xl space-y-7">
                        <span className="inline-block px-3 py-1 mb-6 border border-black/20 dark:border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
                            VOICES OF THE COMMUNITY
                        </span>

                        <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                            Making our city better.
                        </h2>

                        <p className="mt-4 max-w-3xl text-xl md:text-2xl mx-auto text-gray-600 dark:text-gray-400">
                            See how citizens are using our platform to report issues, track
                            progress, and improve their neighborhoods.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
                        <Link
                            to="/contact"
                            className="btn bg-black text-white hover:text-black hover:bg-white btn-sm py-4 w-full md:w-auto"
                        >
                            Give Your Feedback <MdArrowOutward />
                        </Link>
                    </div>
                </div>

                {/* Slider */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        prevEl: ".swiper-button-prev-custom",
                        nextEl: ".swiper-button-next-custom",
                    }}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    loop={true}
                    speed={7000}
                    spaceBetween={5}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 28 },
                        1400: { slidesPerView: 3, spaceBetween: 28 },
                    }}
                    className="overflow-visible"
                >
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i} className="h-auto!">
                            <div className="h-full flex">
                                <article className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col w-full relative">

                                    {/* Quote Icon */}
                                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                                        <span className="material-icons-outlined text-gray-500 text-xl">
                                            format_quote
                                        </span>
                                    </div>

                                    <div className="flex-none mb-4">
                                        <span className="material-icons-outlined text-4xl text-black/50">
                                            {t.icon}
                                        </span>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
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
