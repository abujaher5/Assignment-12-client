import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHouse,
  FaUserDoctor,
  FaCircleInfo,
  FaPhoneVolume,
  FaBars,
  FaXmark,
  FaChevronDown,
  FaArrowRightFromBracket,
  FaCalendarCheck,
} from "react-icons/fa6";
import { BiSolidDashboard, BiUserCircle } from "react-icons/bi";
import { TbReportMedical } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import NavItem from "./NavItem";
import logo from "../../assets/FamousDiagnosticLogo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const closeMobile = () => setIsMobileOpen(false);

  const dashboardPath = isAdmin ? "/dashboard/allUsers" : "/dashboard/userHome";

  const navItems = [
    { to: "/", label: "Home", icon: <FaHouse /> },
    { to: "/ourServices", label: "Services", icon: <FaUserDoctor /> },
    { to: "/allTests", label: "All Tests", icon: <TbReportMedical /> },
    { to: "/aboutUs", label: "About Us", icon: <FaCircleInfo /> },
    { to: "/contactUs", label: "Contact Us", icon: <FaPhoneVolume /> },
  ];

  useEffect(() => {
    setIsMobileOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setIsUserMenuOpen(false);
        setIsMobileOpen(false);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/90">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:h-20 lg:px-6 xl:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="Famous Diagnostic Center"
            className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover lg:h-12 lg:w-12"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-slate-800 dark:text-white lg:text-lg">
              Famous{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Diagnostic
              </span>
            </span>
            <span className="hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 xl:block">
              Research &amp; Care
            </span>
          </span>
        </Link>

        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-2">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} onClick={closeMobile} />
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            to="/contactUs"
            onClick={closeMobile}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300 xl:inline-flex"
          >
            <FaCalendarCheck /> Book Appointment
          </Link>

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((open) => !open)}
                aria-expanded={isUserMenuOpen}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-2 transition hover:border-blue-400 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "user"}
                    className="h-8 w-8 rounded-full object-cover lg:h-9 lg:w-9"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 lg:h-9 lg:w-9">
                    <BiUserCircle className="text-2xl" />
                  </span>
                )}
                <FaChevronDown
                  className={`hidden text-xs text-slate-500 transition-transform duration-300 sm:block ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 origin-top-right overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-800">
                  <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/40">
                    <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                      {user.displayName || "User"}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex flex-col p-2">
                    <Link
                      to={dashboardPath}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      <BiSolidDashboard className="text-lg" /> Dashboard
                    </Link>
                    <Link
                      to="/dashboard/userProfile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      <BiUserCircle className="text-lg" /> My Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogOut}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <FaArrowRightFromBracket className="text-lg" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center sm:flex">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-blue-600 px-5 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                <BiUserCircle className="text-lg" /> Login
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-700 transition hover:border-blue-400 hover:text-blue-600 lg:hidden dark:border-slate-700 dark:text-slate-200"
          >
            {isMobileOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 ease-in-out lg:hidden dark:border-slate-700 dark:bg-slate-900 ${
          isMobileOpen
            ? "max-h-[34rem] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} mobile onClick={closeMobile} />
          ))}

          {!user && (
            <li className="mt-2">
              <Link
                to="/login"
                onClick={closeMobile}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                <BiUserCircle className="text-lg" /> Login
              </Link>
            </li>
          )}

          <li className="mt-1">
            <Link
              to="/contactUs"
              onClick={closeMobile}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200"
            >
              <FaCalendarCheck /> Book Appointment
            </Link>
          </li>

          {user && (
            <li className="mt-1">
              <button
                type="button"
                onClick={handleLogOut}
                className="flex w-full items-center gap-2 rounded-xl border-l-4 border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-wide text-red-500 transition hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <FaArrowRightFromBracket /> Log Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
