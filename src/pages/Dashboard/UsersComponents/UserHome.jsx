import { Link, Navigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCircleCheck,
  FaCircleUser,
  FaClock,
  FaEnvelope,
  FaFileInvoiceDollar,
  FaListCheck,
  FaMicroscope,
  FaStethoscope,
  FaUserDoctor,
  FaUserPlus,
} from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAppointment from "../../../hooks/useAppointment";
import useListing from "../../../hooks/useListing";

const statusStyles = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  confirmed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

const quickActions = [
  {
    to: "/doctors",
    label: "Find a Doctor",
    icon: <FaStethoscope />,
    tone: "from-blue-600 to-cyan-500",
  },
  {
    to: "/allTests",
    label: "Browse Tests",
    icon: <FaMicroscope />,
    tone: "from-violet-500 to-purple-500",
  },
  {
    to: "/dashboard/myAppointment",
    label: "My Appointments",
    icon: <FaCalendarCheck />,
    tone: "from-emerald-500 to-teal-500",
  },
  {
    to: "/dashboard/paymentHistory",
    label: "Payments",
    icon: <FaFileInvoiceDollar />,
    tone: "from-amber-500 to-orange-500",
  },
];

const UserHome = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [appointments, , isAppointmentsLoading] = useAppointment();
  const [listing] = useListing();

  if (isRoleLoading) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (role === "Admin") {
    return <Navigate to="/dashboard/adminHome" replace />;
  }

  if (role === "Doctor") {
    return <Navigate to="/dashboard/doctorHome" replace />;
  }

  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "pending",
  ).length;
  const paidCount = appointments.filter(
    (appointment) => appointment.paymentStatus === "Paid",
  ).length;

  const stats = [
    {
      label: "My Listings",
      value: listing.length,
      icon: <FaListCheck />,
      tone: "from-blue-600 to-cyan-500",
    },
    {
      label: "Appointments",
      value: appointments.length,
      icon: <FaCalendarCheck />,
      tone: "from-violet-500 to-purple-500",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: <FaClock />,
      tone: "from-amber-500 to-orange-500",
    },
    {
      label: "Paid",
      value: paidCount,
      icon: <FaCircleCheck />,
      tone: "from-emerald-500 to-teal-500",
    },
  ];

  const recentAppointments = appointments.slice(0, 4);

  const avatar =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.displayName || "User",
    )}&background=2563eb&color=fff&bold=true`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              Welcome, {user?.displayName || "User"}
            </h2>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              {role}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here is a summary of your activity and health services.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 dark:shadow-blue-900/30"
        >
          Book Appointment <FaArrowRight className="text-xs" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30"
          >
            <div className="flex items-center justify-between">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.tone} text-lg text-white`}
              >
                {stat.icon}
              </span>
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                {isAppointmentsLoading ? "-" : stat.value}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.6fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
          <div className="h-20 bg-gradient-to-r from-blue-600 to-cyan-500" />
          <div className="px-5 pb-5">
            <img
              src={avatar}
              alt={user?.displayName || "User"}
              className="-mt-10 h-20 w-20 rounded-full border-4 border-white object-cover dark:border-slate-800"
            />
            <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">
              {user?.displayName || "User"}
            </h3>
            <p className="mt-1 flex items-center gap-2 break-all text-sm text-slate-500 dark:text-slate-400">
              <FaEnvelope className="shrink-0 text-blue-500" />
              {user?.email || "No email available"}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <FaCircleCheck /> Active Member
            </span>

            <Link
              to="/dashboard/userProfile"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-600 dark:text-slate-300"
            >
              <FaCircleUser /> View Profile
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Recent Appointments
            </h3>
            <Link
              to="/dashboard/myAppointment"
              className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              View all
            </Link>
          </div>

          {isAppointmentsLoading ? (
            <div className="space-y-3 p-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-xl bg-slate-200/60 dark:bg-slate-700"
                />
              ))}
            </div>
          ) : recentAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <FaUserDoctor className="text-5xl text-slate-300 dark:text-slate-600" />
              <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                No appointments booked yet
              </p>
              <Link
                to="/doctors"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30"
              >
                Find a Doctor <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentAppointments.map((appointment) => (
                <li
                  key={appointment._id}
                  className="flex flex-wrap items-center gap-4 px-5 py-4"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="mask mask-squircle h-11 w-11 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-700">
                      <img
                        src={appointment.image}
                        alt={appointment.doctorName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                        {appointment.doctorName}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {appointment.appointmentDate} &middot;{" "}
                        {appointment.appointmentTime}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      statusStyles[appointment.status] || statusStyles.pending
                    }`}
                  >
                    {appointment.status || "pending"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-base font-bold text-slate-800 dark:text-white">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${action.tone} text-base text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
              >
                {action.icon}
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl">
            <FaUserPlus />
          </span>
          <div>
            <p className="text-lg font-bold">Are you a doctor?</p>
            <p className="text-sm text-blue-50/90">
              Request doctor access to manage appointments and patients.
            </p>
          </div>
        </div>
        <Link
          to="/dashboard/becomeDoctor"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-md transition-all duration-300 hover:-translate-y-0.5"
        >
          Become a Doctor <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
};

export default UserHome;
