import { Link } from "react-router-dom";
import {
  FaAward,
  FaBullseye,
  FaCalendarCheck,
  FaCheck,
  FaCircleInfo,
  FaClock,
  FaEye,
  FaFlaskVial,
  FaHandHoldingHeart,
  FaHeartPulse,
  FaMicroscope,
  FaPhoneVolume,
  FaShieldHalved,
  FaUserDoctor,
  FaUsers,
} from "react-icons/fa6";
import logo from "../../assets/FamousDiagnosticLogo.png";

const storyImage = "https://i.ibb.co.com/fdTXj4C7/doctors-office-flatlay.jpg";

const stats = [
  {
    value: "25+",
    label: "Years of Experience",
    icon: <FaAward />,
    accent: "from-amber-400 to-orange-500",
  },
  {
    value: "150k+",
    label: "Tests Completed",
    icon: <FaFlaskVial />,
    accent: "from-blue-400 to-indigo-500",
  },
  {
    value: "40+",
    label: "Expert Specialists",
    icon: <FaUserDoctor />,
    accent: "from-emerald-400 to-teal-500",
  },
  {
    value: "99.9%",
    label: "Report Accuracy",
    icon: <FaShieldHalved />,
    accent: "from-cyan-400 to-sky-500",
  },
];

const pillars = [
  {
    title: "Our Mission",
    icon: <FaBullseye />,
    accent: "from-blue-500 to-indigo-500",
    description:
      "To make accurate, affordable and timely diagnostic care accessible to every family through modern technology and skilled professionals.",
  },
  {
    title: "Our Vision",
    icon: <FaEye />,
    accent: "from-cyan-500 to-sky-500",
    description:
      "To become the most trusted diagnostic center in the region, known for clinical excellence, integrity and compassionate patient care.",
  },
  {
    title: "Our Values",
    icon: <FaHandHoldingHeart />,
    accent: "from-rose-500 to-pink-500",
    description:
      "Accuracy, transparency and empathy guide everything we do — from sample collection to the moment your report reaches your doctor.",
  },
];

const highlights = [
  "Certified pathologists and radiologists",
  "Modern, well-maintained laboratory equipment",
  "Same-day reporting for most routine tests",
  "Free home sample collection across the city",
];

const features = [
  {
    title: "Accurate Reporting",
    icon: <FaMicroscope />,
    accent: "from-blue-500 to-indigo-500",
    description:
      "Strict quality control at every step ensures results you and your doctor can rely on.",
  },
  {
    title: "24/7 Availability",
    icon: <FaClock />,
    accent: "from-amber-500 to-orange-500",
    description:
      "Emergency support, sample collection and urgent reports available around the clock.",
  },
  {
    title: "Expert Team",
    icon: <FaUsers />,
    accent: "from-emerald-500 to-teal-500",
    description:
      "Experienced specialists and technicians dedicated to your health and comfort.",
  },
  {
    title: "Patient First",
    icon: <FaHeartPulse />,
    accent: "from-rose-500 to-pink-500",
    description:
      "Clean facilities, clear communication and caring support at every visit.",
  },
];

const AboutUs = () => {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 py-16 text-white lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-cyan-100">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-white/25">
              <FaCircleInfo className="text-base" /> About Famous Diagnostic
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Trusted Diagnostics,{" "}
              <span className="text-cyan-200">Compassionate Care</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cyan-50 sm:text-base">
              For over two decades we have helped patients and doctors make
              confident health decisions with precise reports, advanced
              technology and a team that genuinely cares.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-[#1c2229] lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-3xl border-2 border-blue-200 dark:border-blue-500/30 sm:block" />
              <img
                src={storyImage}
                alt="Famous Diagnostic Center laboratory"
                className="relative h-72 w-full rounded-3xl object-cover shadow-xl shadow-slate-300/50 dark:shadow-black/40 sm:h-96"
              />

              <div className="relative -mt-10 ml-4 flex w-fit items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:absolute sm:-bottom-8 sm:-right-6 sm:ml-0 sm:mt-0">
                <img
                  src={logo}
                  alt="Famous Diagnostic Center"
                  className="h-12 w-12 rounded-full border-2 border-blue-500 object-cover"
                />
                <div>
                  <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
                    25+
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Years of Trust
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                <FaCircleInfo className="text-base" /> Who We Are
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-800 dark:text-white lg:text-4xl">
                Your Health, Our Priority
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
                Famous Diagnostic Center is a full-service diagnostic facility
                offering pathology, radiology, imaging and preventive health
                check-ups under one roof. Since our beginning, we have combined
                medical expertise with modern equipment to deliver reports that
                patients and physicians can trust.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
                From a simple blood test to advanced scans, every sample is
                handled with care and every report is reviewed by qualified
                professionals.
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <FaCheck />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/ourServices"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-blue-900/30"
                >
                  <FaMicroscope /> Explore Services
                </Link>
                <Link
                  to="/contactUs"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:border-blue-400 dark:hover:text-white"
                >
                  <FaPhoneVolume /> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-[#1c2229] lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              <FaHeartPulse className="text-base" /> What Drives Us
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-800 dark:text-white lg:text-4xl">
              Mission, Vision &amp; Values
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              The principles behind every test we run and every patient we serve.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${pillar.accent}`}
                >
                  {pillar.icon}
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-800 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 py-12 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xl shadow-md ${stat.accent}`}
              >
                {stat.icon}
              </span>
              <div>
                <p className="text-2xl font-extrabold leading-tight sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-cyan-100 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-[#1c2229] lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              <FaShieldHalved className="text-base" /> Why Choose Us
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-800 dark:text-white lg:text-4xl">
              Care You Can Count On
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              Reliable diagnostics backed by modern technology and a team that
              puts patients first.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${feature.accent}`}
                >
                  {feature.icon}
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-16 dark:bg-[#1c2229] lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 px-6 py-12 text-center text-white shadow-xl sm:px-10 lg:py-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Ready to book your test?
              </h2>
              <p className="mt-3 text-sm text-cyan-50 sm:text-base">
                Our team is available 24/7 to help you choose the right test and
                schedule a convenient appointment.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/allTests"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <FaCalendarCheck /> Book a Test
                </Link>
                <a
                  href="tel:10101"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <FaPhoneVolume /> Call Hotline 10101
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
