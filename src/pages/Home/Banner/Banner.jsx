import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaPhone } from "react-icons/fa";
import { FaMoneyCheckDollar, FaUserDoctor } from "react-icons/fa6";
import { TbReportMedical } from "react-icons/tb";
import Slide from "../../../components/SocialLogin/BannerSlide/Slide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const img1 = "https://i.ibb.co.com/4ZDSpT5/banner-Img.jpg";
const img2 = "https://i.ibb.co.com/fdTXj4C7/doctors-office-flatlay.jpg";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto my-10 lg:relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide img={img1} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide img={img2} />
        </SwiperSlide>
      </Swiper>
      <div className="flex z-10 flex-col lg:flex-row  justify-center  items-center lg:justify-center lg:items-center gap-6 mt-4 lg:gap-10 lg:mx-auto  lg:absolute   lg:-bottom-10 lg:left-1/2 lg:transform lg:-translate-x-1/2 ">
        <div
          className="lg:w-[170px] w-3/4  h-[75px] bg-blue-500 hover:border-white border-2 hover:text-black 
        border-transparent  flex items-center justify-center text-center text-xl font-semibold rounded-md text-white"
        >
          <FaPhone color="green" size={25} /> Call For <br /> Appointment
        </div>
        <div className="lg:w-[170px] w-3/4  h-[75px] bg-blue-500 hover:border-white border-2 hover:text-black border-transparent flex items-center justify-center text-center text-xl font-semibold rounded-md text-white  gap-2">
          <FaUserDoctor size={25} /> Find <br /> Doctor
        </div>
        <div className="lg:w-[170px] w-3/4  h-[75px] bg-blue-500 hover:border-white border-2 hover:text-black border-transparent flex items-center justify-center text-center text-xl font-semibold rounded-md text-white gap-2">
          <FaMoneyCheckDollar size={25} /> Service <br /> Charges
        </div>
        <div className="lg:w-[170px] w-3/4  h-[75px] bg-blue-500 hover:border-white border-2 hover:text-black border-transparent flex items-center justify-center text-center text-xl font-semibold rounded-md text-white gap-2">
          <TbReportMedical size={25} /> Report
          <br /> Delivery
        </div>
      </div>
    </div>
  );
};

export default Banner;
