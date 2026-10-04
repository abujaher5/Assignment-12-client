import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import { FaQuoteLeft, FaComments, FaUserLarge } from "react-icons/fa6";

import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/pagination";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Testimonial = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  return (
    <section className="bg-white py-16 dark:bg-[#1c2229] lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <FaComments className="text-base" /> Patient Feedback
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-800 dark:text-white lg:text-4xl">
            What Our Patients Say
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            Real experiences from the people we care for. Your trust inspires us
            to keep delivering accurate and compassionate diagnostic services.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl border border-slate-100 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-700 dark:bg-slate-800/40">
            <FaComments className="text-5xl text-slate-300 dark:text-slate-600" />
            <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
              No reviews yet
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Be the first to share your experience with us.
            </p>
          </div>
        ) : (
          <div className="mt-12">
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              spaceBetween={24}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="testimonial-swiper"
            >
              {reviews.map((item) => (
                <SwiperSlide key={item._id}>
                  <figure className="flex h-full flex-col rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
                    <FaQuoteLeft className="text-2xl text-blue-200 dark:text-blue-500/40" />
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.aboutService ||
                        "Excellent service and very supportive staff."}
                    </blockquote>

                    <Rating
                      className="mt-4"
                      style={{ maxWidth: 110 }}
                      value={item.rating || 5}
                      readOnly
                    />

                    <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name || "Patient"}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-500/30"
                        />
                      ) : (
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          <FaUserLarge />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                          {item.name || "Anonymous"}
                        </p>
                        <p className="truncate text-xs uppercase tracking-wide text-slate-400">
                          {item.location || "Patient"}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
