import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import { FaQuoteRight, FaComments, FaUserLarge, FaCheck } from "react-icons/fa6";

import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/pagination";
import useAxiosSecure from "../hooks/useAxiosSecure";

const accents = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
];

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
              {reviews.map((item, index) => {
                const accent =
                  accents[index % accents.length];
                return (
                  <SwiperSlide key={item._id}>
                    <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl hover:shadow-blue-200/50 dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-blue-900/30">
                      <span
                        className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent}`}
                      />
                      <FaQuoteRight className="pointer-events-none absolute -right-2 -top-1 rotate-12 text-7xl text-slate-100 transition-colors duration-300 group-hover:text-blue-100 dark:text-slate-700/40 dark:group-hover:text-slate-700" />

                      <Rating
                        className="relative"
                        style={{ maxWidth: 110 }}
                        value={item.rating || 5}
                        readOnly
                      />

                      <blockquote className="relative mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        &ldquo;
                        {item.aboutService ||
                          "Excellent service and very supportive staff."}
                        &rdquo;
                      </blockquote>

                      <figcaption className="relative mt-6 flex items-center gap-4 border-t border-dashed border-slate-200 pt-5 dark:border-slate-700">
                        <div className="relative shrink-0">
                          <div
                            className={`rounded-full bg-gradient-to-br p-[3px] ${accent}`}
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name || "Patient"}
                                className="h-14 w-14 rounded-full border-2 border-white object-cover dark:border-slate-800"
                              />
                            ) : (
                              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-blue-600 dark:border-slate-800 dark:bg-slate-700 dark:text-blue-400">
                                <FaUserLarge className="text-xl" />
                              </span>
                            )}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white ring-2 ring-white dark:ring-slate-800">
                            <FaCheck />
                          </span>
                        </div>
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
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
