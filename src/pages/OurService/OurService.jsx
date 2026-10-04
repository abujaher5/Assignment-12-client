import { useNavigate } from "react-router-dom";
import { FaAmbulance } from "react-icons/fa";
import {
  FaMicroscope,
  FaXRay,
  FaHeartPulse,
  FaKitMedical,
  FaHouseMedical,
  FaTruckMedical,
  FaArrowRight,
  FaPhoneVolume,
  FaStethoscope,
  FaNotesMedical,
} from "react-icons/fa6";

const services = [
  {
    title: "Pathology",
    category: "pathology",
    icon: <FaMicroscope />,
    accent: "from-blue-500 to-indigo-500",
    description:
      "Blood, urine and tissue analysis by certified pathologists with same-day reporting.",
  },
  {
    title: "Radiology",
    category: "radiology",
    icon: <FaXRay />,
    accent: "from-violet-500 to-purple-500",
    description:
      "X-Ray, CT, MRI and ultrasound imaging using modern, low-radiation equipment.",
  },
  {
    title: "Imaging & Scans",
    category: "imaginary",
    icon: <FaHeartPulse />,
    accent: "from-rose-500 to-pink-500",
    description:
      "ECG, Echo and cardiac screening to support accurate diagnosis and monitoring.",
  },
  {
    title: "Health Check-up Packages",
    category: "All",
    icon: <FaKitMedical />,
    accent: "from-emerald-500 to-teal-500",
    description:
      "Full-body preventive packages tailored for individuals, couples and corporates.",
  },
];

const emergency = [
  {
    title: "Call For Ambulance",
    subtitle: "24/7 emergency response",
    icon: <FaAmbulance />,
    accent: "from-red-500 to-rose-600",
    ring: "group-hover:ring-red-200",
  },
  {
    title: "Sample Collection From Home",
    subtitle: "Free doorstep pickup",
    icon: <FaHouseMedical />,
    accent: "from-blue-500 to-cyan-600",
    ring: "group-hover:ring-blue-200",
  },
  {
    title: "Urgent Report Home Delivery",
    subtitle: "Same-day report at your door",
    icon: <FaTruckMedical />,
    accent: "from-emerald-500 to-green-600",
    ring: "group-hover:ring-emerald-200",
  },
];

const OurService = () => {
  const navigate = useNavigate();
  const handleCategory = (category) =>
    navigate(`/allTests?category=${category}`);

  return (
    <section className="bg-slate-50 py-16 dark:bg-[#1c2229] lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <FaStethoscope className="text-base" /> What We Offer
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-800 dark:text-white lg:text-4xl">
            Our Diagnostic Services
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            Accurate and affordable diagnostic tests with fast reporting and
            expert analysis. Advanced equipment and skilled professionals ensure
            reliable results and compassionate care.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <button
              key={service.title}
              type="button"
              onClick={() => handleCategory(service.category)}
              className="group flex h-full flex-col items-start rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${service.accent}`}
              >
                {service.icon}
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-800 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {service.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3 dark:text-blue-400">
                View Tests <FaArrowRight />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:p-10">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <FaNotesMedical className="text-base" /> Latest Announcement
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-slate-800 dark:text-white lg:text-3xl">
              Emergency &amp; Home Care Services
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              We provide a special discount during any pandemic situation. Our
              team is available round the clock for ambulance support, home
              sample collection and urgent report delivery.
            </p>
            <a
              href="tel:10101"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-blue-900/30"
            >
              <FaPhoneVolume /> Call Hotline 10101
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {emergency.map((item) => (
              <div
                key={item.title}
                className={`group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 ring-2 ring-transparent transition-all duration-300 hover:bg-white dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-900 ${item.ring}`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${item.accent}`}
                >
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white sm:text-base">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurService;

