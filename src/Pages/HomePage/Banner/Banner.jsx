import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.jpg";
import banner3 from "../../../assets/banner3.jpg";
import banner4 from "../../../assets/banner4.jpg";
import banner5 from "../../../assets/banner5.jpg";

export default function Banner() {
    const slides = [
        {
            id: 1,
            title: "Your Safety Starts With a Single Report",
            subtitle: "Alert local authorities about fire hazards before they become emergencies.",
            image: `${banner2}`,
        },
        {
            id: 2,
            title: "Together for a Cleaner Community",
            subtitle: "Report waste problems and help us keep every neighborhood clean and healthy.",
            image: `${banner1}`,
        },
        {
            id: 3,
            title: "Lost the Way? We Help You Find It.",
            subtitle: "Locate issues, discover routes, and stay on track with our smart mapping tools.",
            image: `${banner3}`,
        },
        {
            id: 4,
            title: "Your Voice Matters",
            subtitle: "Share feedback, raise concerns, and make your community stronger.",
            image: `${banner4}`,
        },
        {
            id: 5,
            title: "Help Desk",
            subtitle: "A Better City Through Better Reporting",
            image: `${banner5}`,
        },
    ];

    return (
        <div className="sticky top-0 left-0 w-full h-[83.5vh] -mt-25 overflow-hidden z-0">
            <Swiper
                modules={[ Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="h-full overflow-hidden">
                {slides.map((item) => (
                    <SwiperSlide key={item.id}>

                        <div className="w-full h-full bg-cover bg-center flex flex-col justify-center px-10 md:px-20 absolute inset-0"
                            style={{ backgroundImage: `url(${item.image})` }}>
                                <div className="absolute inset-0 bg-black/40"></div>
                            <div className="w-[1400px] mx-auto">
                                <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg">
                                    {item.title}
                                </h1>
                                <p className="text-lg text-white md:text-2xl mt-4 drop-shadow">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
