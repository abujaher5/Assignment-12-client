import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaPhone } from "react-icons/fa";
import { FaMoneyCheckDollar, FaUserDoctor } from "react-icons/fa6";
import { TbReportMedical } from "react-icons/tb";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto my-10 lg:relative  ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="hero w-full  h-[600px]  flex flex-col bg-cover bg-center bg-no-repeat  "
            style={{
              backgroundImage:
                "url(https://i.ibb.co.com/4ZDSpT5/banner-Img.jpg)",
            }}
          >
            <div className="hero-content text-center text-black ">
              <div className="lg:max-w-md max-w-sm mt-10 lg:mt-32">
                <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
                  Welcome To Our Diagnostic Center
                </h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="flex flex-col lg:flex-row lg:gap-20 justify-center items-center gap-6 mt-4 lg:ml-[155px]  lg:absolute   lg:-bottom-10 ">
        <div className="lg:w-[170px] w-3/4  h-[75px] bg-blue-500 hover:border-white border-2 border-transparent  flex items-center justify-center text-center text-xl font-semibold rounded-md text-white">
          <FaPhone color="green" size={25} /> Call For <br /> Appointment
        </div>
        <div className="lg:w-[170px] w-3/4  h-[75px] bg-blue-500 hover:border-white border-2 border-transparent flex items-center justify-center text-center text-xl font-semibold rounded-md text-white  gap-2">
          <FaUserDoctor size={25} /> Find <br /> Doctor
        </div>
        <div className="lg:w-[170px] w-3/4  h-[75px] bg-blue-500 hover:border-white border-2 border-transparent flex items-center justify-center text-center text-xl font-semibold rounded-md text-white gap-2">
          <FaMoneyCheckDollar size={25} /> Service <br /> Charges
        </div>
        <div className="lg:w-[170px] w-3/4  h-[75px] bg-blue-500 hover:border-white border-2 border-transparent flex items-center justify-center text-center text-xl font-semibold rounded-md text-white gap-2">
          <TbReportMedical size={25} /> Report
          <br /> Delivery
        </div>
      </div>
    </div>
  );
};

export default Banner;
