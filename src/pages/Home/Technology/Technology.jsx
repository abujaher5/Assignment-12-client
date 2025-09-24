import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Technology = () => {
  const axiosSecure = useAxiosSecure();

  const { data: technologies = [] } = useQuery({
    queryKey: ["technologies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/technologies");
      return res.data;
    },
  });

  return (
    <div className="mt-10 p-4 ">
      <h2 className="text-5xl text-center  font-semibold">
        Technology We Have
      </h2>
      <div className=" mt-10 ">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          // centeredSlides={true}
          spaceBetween={10}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {technologies.map((technology) => (
            <SwiperSlide key={technology._id}>
              <div className="card p-2  bg-gray-200 shadow-lg">
                <figure className="px-10 pt-10">
                  <img
                    src={technology.image}
                    alt="Technology Image"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Our CT Machine</h2>
                  <p>
                    A card component has a figure, a body part, and inside body
                    there are title and actions parts
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Technology;
