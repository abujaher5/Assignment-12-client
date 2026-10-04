import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import {
  FaLocationDot,
  FaCalendarDays,
  FaClock,
  FaStethoscope,
  FaArrowRight,
  FaUserDoctor,
  FaCircleCheck,
} from "react-icons/fa6";

import "@smastrom/react-rating/style.css";

const DoctorCard = ({ doctor }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-slate-700 dark:to-slate-800">
        {doctor.image ? (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-600">
            <FaUserDoctor className="text-6xl" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/75 to-transparent" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
          <FaCircleCheck className="text-emerald-500" /> Available
        </span>

        <div className="absolute inset-x-4 bottom-3">
          <Rating
            style={{ maxWidth: 110 }}
            value={doctor.rating || 5}
            readOnly
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          {doctor.name}
        </h3>
        <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
          <FaStethoscope className="text-xs" />
          {doctor.specialize || "Consultant Specialist"}
        </p>

        <div className="mt-4 space-y-2.5 border-t border-dashed border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <p className="flex items-start gap-2.5">
            <FaLocationDot className="mt-0.5 shrink-0 text-blue-500" />
            <span>{doctor.location || "Location not specified"}</span>
          </p>
          <p className="flex items-start gap-2.5">
            <FaCalendarDays className="mt-0.5 shrink-0 text-blue-500" />
            <span>{doctor.availableOn || "Schedule unavailable"}</span>
          </p>
          <p className="flex items-start gap-2.5">
            <FaClock className="mt-0.5 shrink-0 text-blue-500" />
            <span>{doctor.availableTime || "Time unavailable"}</span>
          </p>
        </div>

        <Link
          to="/contactUs"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-300 hover:shadow-lg dark:shadow-blue-900/30"
        >
          View Profile <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </article>
  );
};

export default DoctorCard;
