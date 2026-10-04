import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaLocationDot,
  FaPhoneVolume,
  FaEnvelope,
  FaClock,
  FaHeartPulse,
  FaChevronRight,
} from "react-icons/fa6";
import logo from "../../assets/FamousDiagnosticLogo.png";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/aboutUs" },
  { label: "Our Services", to: "/ourServices" },
  { label: "All Tests", to: "/allTests" },
  { label: "Contact Us", to: "/contactUs" },
];

const serviceLinks = [
  { label: "Pathology", to: "/allTests?category=pathology" },
  { label: "Radiology", to: "/allTests?category=radiology" },
  { label: "Imaging & Scans", to: "/allTests?category=imaginary" },
  { label: "Health Check-up", to: "/allTests" },
];

const socials = [
  { icon: <FaFacebookF />, href: "#", label: "Facebook" },
  { icon: <FaXTwitter />, href: "#", label: "X" },
  { icon: <FaYoutube />, href: "#", label: "YouTube" },
  { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
];

const contact = [
  {
    icon: <FaLocationDot />,
    text: "Agrabad, Chittagong, Bangladesh",
    href: null,
  },
  { icon: <FaPhoneVolume />, text: "+880 1234567890", href: "tel:+8801234567890" },
  {
    icon: <FaEnvelope />,
    text: "famousdiagnosticcenter@gmail.com",
    href: "mailto:famousdiagnosticcenter@gmail.com",
  },
  { icon: <FaClock />, text: "Open 24/7 — All Branches", href: null },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Famous Diagnostic Center"
                className="h-12 w-12 rounded-full border-2 border-blue-500 object-cover"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-extrabold text-white">
                  Famous{" "}
                  <span className="text-blue-400">Diagnostic</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Research &amp; Care
                </span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Providing reliable medical diagnostics, accurate reporting and
              compassionate care for you and your family — every day.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    <FaChevronRight className="text-[10px] text-blue-500 transition-transform duration-300 group-hover:translate-x-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Our Services
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    <FaChevronRight className="text-[10px] text-blue-500 transition-transform duration-300 group-hover:translate-x-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get In Touch
            </h3>
            <ul className="mt-5 space-y-4">
              {contact.map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-sm text-blue-400">
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="break-all text-slate-400 transition-colors hover:text-blue-400"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-slate-400">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Famous Diagnostic Center. All
            rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <FaHeartPulse className="text-red-500" /> for better health
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
