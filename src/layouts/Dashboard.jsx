import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaGauge,
  FaUsers,
  FaPlus,
  FaUserDoctor,
  FaImages,
  FaImage,
  FaMicroscope,
  FaVial,
  FaStethoscope,
  FaLayerGroup,
  FaHouse,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaPenToSquare,
  FaListCheck,
  FaCircleUser,
  FaArrowRightFromBracket,
  FaBars,
  FaXmark,
} from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import logo from "../assets/FamousDiagnosticLogo.png";

const SidebarLink = ({ to, icon, label, onNavigate }) => (
  <li>
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30"
            : "text-slate-400 hover:bg-white/5 hover:text-white",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`text-base transition-transform duration-200 group-hover:scale-110 ${
              isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"
            }`}
          >
            {icon}
          </span>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  </li>
);

const SectionLabel = ({ children }) => (
  <p className="px-3.5 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
    {children}
  </p>
);

const adminSections = [
  {
    label: "Overview",
    items: [
      { to: "/dashboard/adminHome", icon: <FaGauge />, label: "Admin Home" },
      { to: "/dashboard/allUsers", icon: <FaUsers />, label: "All Users" },
    ],
  },
  {
    label: "Create",
    items: [
      { to: "/dashboard/addATest", icon: <FaPlus />, label: "Add Test" },
      { to: "/dashboard/addADoctor", icon: <FaUserDoctor />, label: "Add Doctor" },
      { to: "/dashboard/addBanner", icon: <FaImages />, label: "Add Banner" },
      {
        to: "/dashboard/addTechnology",
        icon: <FaMicroscope />,
        label: "Add Technology",
      },
    ],
  },
  {
    label: "Manage",
    items: [
      { to: "/dashboard/manageTests", icon: <FaVial />, label: "Manage Tests" },
      {
        to: "/dashboard/manageDoctors",
        icon: <FaStethoscope />,
        label: "Manage Doctors",
      },
      { to: "/dashboard/manageBanners", icon: <FaImage />, label: "Manage Banners" },
      {
        to: "/dashboard/manageTechnologies",
        icon: <FaLayerGroup />,
        label: "Manage Technologies",
      },
    ],
  },
];

const userSections = [
  {
    label: "Overview",
    items: [
      { to: "/dashboard/userHome", icon: <FaHouse />, label: "User Home" },
    ],
  },
  {
    label: "My Services",
    items: [
      {
        to: "/dashboard/myAppointment",
        icon: <FaCalendarCheck />,
        label: "My Appointment",
      },
      { to: "/dashboard/myListings", icon: <FaListCheck />, label: "My Listing" },
      {
        to: "/dashboard/paymentHistory",
        icon: <FaFileInvoiceDollar />,
        label: "Payment History",
      },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/dashboard/userProfile", icon: <FaCircleUser />, label: "My Profile" },
      { to: "/dashboard/addReview", icon: <FaPenToSquare />, label: "Add Review" },
    ],
  },
];

const doctorSections = [
  {
    label: "Overview",
    items: [
      { to: "/dashboard/doctorHome", icon: <FaGauge />, label: "Doctor Home" },
    ],
  },
  {
    label: "Patients",
    items: [
      {
        to: "/dashboard/doctorAppointments",
        icon: <FaCalendarCheck />,
        label: "My Appointments",
      },
      {
        to: "/dashboard/doctorPatients",
        icon: <FaUsers />,
        label: "My Patients",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        to: "/dashboard/doctorProfile",
        icon: <FaUserDoctor />,
        label: "My Profile",
      },
    ],
  },
];

const Dashboard = () => {
  const [role] = useRole();
  const { user } = useAuth();
  const { pathname } = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const closeSidebar = () => setIsSidebarOpen(false);

  const isAdmin = role === "Admin";
  const isDoctor = role === "Doctor";

  const sections = isAdmin
    ? adminSections
    : isDoctor
      ? doctorSections
      : userSections;

  const roleLabel = isAdmin ? "Admin" : isDoctor ? "Doctor" : "Member";
  const avatar = user?.photoURL || logo;

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <img
          src={logo}
          alt="Famous Diagnostic Center"
          className="h-11 w-11 rounded-full border-2 border-blue-500 object-cover"
        />
        <div className="leading-tight">
          <p className="text-base font-extrabold tracking-tight text-white">
            Famous
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-blue-400">
            Diagnostic Center
          </p>
        </div>
        <button
          onClick={closeSidebar}
          className="ml-auto rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <FaXmark />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {sections.map((section) => (
          <div key={section.label}>
            <SectionLabel>{section.label}</SectionLabel>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <SidebarLink
                  key={item.to}
                  {...item}
                  onNavigate={closeSidebar}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
          <img
            src={avatar}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/60"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {user?.displayName || "User"}
            </p>
            <span className="inline-flex items-center rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-400">
              {roleLabel}
            </span>
          </div>
        </div>
        <NavLink
          to="/"
          onClick={closeSidebar}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <FaArrowRightFromBracket /> Back To Home
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col bg-slate-900 lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isSidebarOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={closeSidebar}
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-72 flex-col bg-slate-900 shadow-2xl transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>
      </div>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Open sidebar"
          >
            <FaBars className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <h1 className="text-sm font-bold text-slate-800 dark:text-white">
              Dashboard
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Welcome back, {user?.displayName || "User"}
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <img
              src={avatar}
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500/50"
            />
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {isAdmin ? "Administrator" : isDoctor ? "Doctor" : "Member"}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
