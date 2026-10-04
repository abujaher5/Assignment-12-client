import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaLocationDot,
  FaPhoneVolume,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCommentDots,
  FaHeadset,
} from "react-icons/fa6";

const contactInfo = [
  {
    icon: <FaLocationDot />,
    label: "Our Location",
    value: "Agrabad, Chittagong, Bangladesh",
    href: null,
    accent: "from-blue-500 to-indigo-500",
  },
  {
    icon: <FaPhoneVolume />,
    label: "Call Us",
    value: "+880 1234567890",
    href: "tel:+8801234567890",
    accent: "from-emerald-500 to-green-600",
  },
  {
    icon: <FaEnvelope />,
    label: "Email Us",
    value: "contact@business.com",
    href: "mailto:contact@business.com",
    accent: "from-cyan-500 to-sky-600",
  },
  {
    icon: <FaClock />,
    label: "Working Hours",
    value: "Open 24/7 — All Branches",
    href: null,
    accent: "from-amber-500 to-orange-500",
  },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:ring-blue-500/20";

const ContactUs = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your message was sent successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    reset();
    navigate("/ourServices");
  };

  return (
    <section className="bg-slate-50 py-16 dark:bg-[#1c2229] lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <FaHeadset className="text-base" /> Get In Touch
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-800 dark:text-white lg:text-4xl">
            Contact With Us
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            Have a question, need a test or want to book an appointment? Our team
            is here to help you around the clock.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {contactInfo.map((item) => {
              const content = (
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${item.accent}`}
                  >
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30 sm:p-8">
            <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
              <FaCommentDots className="text-blue-600 dark:text-blue-400" />
              Send Us a Message
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Fill out the form and we&apos;ll get back to you shortly.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-4"
              noValidate
            >
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: true })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", { required: true })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    {...register("phone", { required: true })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Your Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Type your message..."
                  {...register("message", { required: true })}
                  className={`${inputClass} resize-none`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-blue-900/30"
              >
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
