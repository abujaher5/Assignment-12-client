import { Link } from "react-router-dom";
import {
  FaMicroscope,
  FaXRay,
  FaHeartPulse,
  FaVial,
  FaArrowRight,
  FaClock,
} from "react-icons/fa6";

const categoryStyles = {
  pathology: {
    label: "Pathology",
    icon: <FaMicroscope />,
    badge: "text-blue-700 dark:text-blue-400",
    accent: "from-blue-500 to-indigo-500",
  },
  radiology: {
    label: "Radiology",
    icon: <FaXRay />,
    badge: "text-violet-700 dark:text-violet-400",
    accent: "from-violet-500 to-purple-500",
  },
  imaginary: {
    label: "Imaging",
    icon: <FaHeartPulse />,
    badge: "text-rose-700 dark:text-rose-400",
    accent: "from-rose-500 to-pink-500",
  },
};

const TestCard = ({ test }) => {
  const meta = categoryStyles[test.category] || {
    label: test.category || "General",
    icon: <FaVial />,
    badge: "text-slate-700 dark:text-slate-300",
    accent: "from-slate-500 to-slate-600",
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={test.image}
          alt={test.name || "Test"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />

        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold shadow-sm backdrop-blur ${meta.badge}`}
        >
          {meta.icon}
          {meta.label}
        </span>

        <span className="absolute bottom-3 right-4 rounded-full bg-blue-600 px-3 py-1 text-sm font-bold text-white shadow-md">
          ৳ {test.price}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          {test.name}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {test.testDetails || "Accurate and reliable diagnostic testing."}
        </p>

        <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-400">
          <FaClock /> Report within 24 hours
        </p>

        <Link
          to={`/testDetails/${test._id}`}
          className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg ${meta.accent}`}
        >
          View Details <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </article>
  );
};

export default TestCard;
