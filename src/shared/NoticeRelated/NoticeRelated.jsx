import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

const NoticeRelated = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] font-medium sm:px-6 sm:text-xs lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
            <FaPhone className="text-[10px] text-green-300" />
          </span>
          <span className="flex items-center gap-1">
            <span className="hidden text-cyan-100 sm:inline">Hotline:</span>
            <a
              href="tel:10101"
              className="font-bold tracking-wide transition hover:underline"
            >
              10101
            </a>
          </span>
          <span className="hidden items-center gap-1.5 text-cyan-100 md:flex">
            <span className="mx-1 h-3.5 w-px bg-white/25" />
            <FaLocationDot className="text-cyan-200" /> All Branches
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <FaClock className="text-cyan-100" />
            <span className="font-semibold">Open 24/7</span>
          </span>

          <span className="hidden h-3.5 w-px bg-white/25 md:block" />

          <a
            href="mailto:famousdiagnosticcenter@gmail.com"
            className="hidden items-center gap-1.5 transition hover:underline md:flex"
          >
            <FaEnvelope className="text-cyan-100" />
            <span className="hidden lg:inline">
              famousdiagnosticcenter@gmail.com
            </span>
            <span className="lg:hidden">Email Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoticeRelated;
