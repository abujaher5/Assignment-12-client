import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const Testimonial = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  return (
    <div className="shadow-xl text-center max-w-7xl dark:text-white">
      <section className=" max-w-7xl  ">
        <div className=" flex flex-col items-center mx-auto  md:p-10 md:px-12 max-w-7xl">
          <h1 className="p-4 text-4xl font-semibold leading-none text-center">
            What Our Patients Says
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic
            nulla atque, inventore odit minus.fkjjkj fjslkfj .
          </p>
        </div>

        <div className="bg-slate-200 dark:bg-[#183659]">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            // centeredSlides={true}
            spaceBetween={10}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {reviews.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="flex flex-col max-w-sm mx-4 my-6 shadow-xl rounded-lg bg-white text md:text-">
                  <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-50 text-black dark:text-white">
                    <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        className="w-8 h-8 dark:text-violet-600"
                      >
                        <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                        <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                      </svg>
                      {item.aboutService}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        className="absolute right-0 w-8 h-8 
                         dark:text-violet-600"
                      >
                        <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                        <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                      </svg>
                    </p>
                  </div>
                  <div
                    className="flex flex-col items-center justify-center p-8 rounded-b-lg 
                  bg-amber-600
                  dark:bg-violet-600 dark:text-gray-50
                  text-white"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500 "
                    />
                    <p className="text-xl font-semibold leading-tight">
                      {item.name}
                    </p>
                    <p className="text-sm uppercase">{item.location}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
