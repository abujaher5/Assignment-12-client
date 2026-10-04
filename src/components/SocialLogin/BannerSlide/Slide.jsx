import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaHeartPulse,
} from "react-icons/fa6";

const Slide = ({ img, badge, title, highlight, description, stats = [] }) => {
  return (
    <section className="relative flex h-[480px] w-full items-center overflow-hidden sm:h-[540px] lg:h-[600px]">
      <img
        src={img}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/70 sm:bg-slate-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
          {badge && (
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm sm:text-xs">
              <FaHeartPulse className="text-cyan-300" />
              {badge}
            </span>
          )}

          <h1 className="text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-5xl">
            {title} <span className="text-cyan-300">{highlight}</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-100 sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/contactUs"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <FaCalendarCheck /> Book Appointment
            </Link>
            <Link
              to="/allTests"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/15"
            >
              Explore Tests <FaArrowRight />
            </Link>
          </div>

          {stats.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-white lg:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-200 lg:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Slide;
