import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaUserDoctor,
  FaMoneyCheckDollar,
  FaTruckMedical,
} from "react-icons/fa6";
import Slide from "../../../components/SocialLogin/BannerSlide/Slide";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const img1 = "https://i.ibb.co.com/4ZDSpT5/banner-Img.jpg";
const img2 = "https://i.ibb.co.com/fdTXj4C7/doctors-office-flatlay.jpg";

const slides = [
  {
    img: img1,
    badge: "Trusted Diagnostic Center",
    title: "Precise Reports,",
    highlight: "Confident Diagnosis",
    description:
      "Advanced pathology, radiology and imaging services with quick, reliable results that you and your doctor can truly trust.",
    stats: [
      { value: "25+", label: "Years Experience" },
      { value: "150k+", label: "Tests Done" },
      { value: "24/7", label: "Emergency" },
    ],
  },
  {
    img: img2,
    badge: "Modern Laboratory",
    title: "Advanced Technology,",
    highlight: "Compassionate Care",
    description:
      "From routine blood tests to specialized imaging, our certified experts deliver accurate reports with fast turnaround.",
    stats: [
      { value: "50+", label: "Test Panels" },
      { value: "40+", label: "Specialists" },
      { value: "99.9%", label: "Accuracy" },
    ],
  },
];

const actions = [
  {
    to: "/contactUs",
    icon: <FaPhone />,
    title: "Call For Appointment",
    subtitle: "Hotline 10101",
    accent: "from-green-500 to-emerald-500",
  },
  {
    to: "/ourServices",
    icon: <FaUserDoctor />,
    title: "Find a Doctor",
    subtitle: "Expert specialists",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    to: "/allTests",
    icon: <FaMoneyCheckDollar />,
    title: "Service Charges",
    subtitle: "Transparent pricing",
    accent: "from-amber-500 to-orange-500",
  },
  {
    to: "/allTests",
    icon: <FaTruckMedical />,
    title: "Report Delivery",
    subtitle: "Online & doorstep",
    accent: "from-cyan-500 to-sky-500",
  },
];

const Banner = () => {
  return (
    <div className="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl shadow-xl shadow-slate-300/40 dark:shadow-black/40">
        <Swiper
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.img}>
              <Slide {...slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative z-20 mx-auto -mt-8 grid max-w-6xl grid-cols-2 gap-3 px-2 sm:-mt-12 sm:gap-4 lg:-mt-14 lg:grid-cols-4 lg:px-6">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-4 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${action.accent}`}
            >
              {action.icon}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold text-slate-800 sm:text-sm dark:text-white">
                {action.title}
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-slate-500 sm:text-xs dark:text-slate-400">
                {action.subtitle}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Banner;
