import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto my-10 ">
      <>
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
              className="hero h-[500px] "
              style={{
                backgroundImage:
                  "url(https://i.ibb.co.com/4ZDSpT5/banner-Img.jpg)",
              }}
            >
              <div className="hero-overlay bg-opacity-20"></div>
              <div className="hero-content text-center text-black">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">
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
      </>
    </div>
  );
};

export default Banner;
