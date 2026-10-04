import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaMicroscope } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import "swiper/css";
import "swiper/css/pagination";

const Technology = () => {
  const axiosSecure = useAxiosSecure();

  const { data: technologies = [], isLoading } = useQuery({
    queryKey: ["technologies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/technologies");
      return res.data;
    },
  });

  return (
    <section className="bg-slate-50 py-16 dark:bg-[#1c2229] lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <FaMicroscope className="text-base" /> Advanced Equipment
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-800 dark:text-white lg:text-4xl">
            Technology We Have
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            We invest in modern, certified diagnostic equipment to deliver
            precise results quickly and safely for every patient.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-3xl border border-slate-100 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : technologies.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-800/40">
            <FaMicroscope className="text-5xl text-slate-300 dark:text-slate-600" />
            <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
              No technology added yet
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Our advanced equipment will be listed here soon.
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
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="tech-swiper"
            >
              {technologies.map((technology) => (
                <SwiperSlide key={technology._id}>
                  <article className="group h-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={technology.image}
                        alt={technology.name || "Technology"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/15 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-blue-600/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                        Technology
                      </span>
                      <h3 className="absolute inset-x-4 bottom-3 text-lg font-bold text-white drop-shadow">
                        {technology.name || "Our Equipment"}
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {technology.technologyDetails ||
                          "Advanced diagnostic technology for accurate and reliable results."}
                      </p>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default Technology;
