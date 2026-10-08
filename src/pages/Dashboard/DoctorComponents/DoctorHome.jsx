import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaClock,
  FaCircleCheck,
  FaUsers,
  FaArrowRight,
  FaUserDoctor,
} from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useDoctorAppointments from "../../../hooks/useDoctorAppointments";

const statusStyles = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  confirmed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  completed:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

const DoctorHome = () => {
  const { user } = useAuth();
  const [appointments, , isLoading] = useDoctorAppointments();

  const stats = [
    {
      label: "Total Appointments",
      value: appointments.length,
      icon: <FaCalendarCheck />,
      tone: "from-blue-600 to-cyan-500",
    },
    {
      label: "Pending",
      value: appointments.filter((a) => a.status === "pending").length,
      icon: <FaClock />,
      tone: "from-amber-500 to-orange-500",
    },
    {
      label: "Completed",
      value: appointments.filter((a) => a.status === "completed").length,
      icon: <FaCircleCheck />,
      tone: "from-emerald-500 to-teal-500",
    },
    {
      label: "Patients",
      value: new Set(appointments.map((a) => a.email)).size,
      icon: <FaUsers />,
      tone: "from-fuchsia-500 to-purple-500",
    },
  ];

  const recent = appointments.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            Welcome, Dr. {user?.displayName || "Doctor"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Here is an overview of your assigned appointments.
          </p>
        </div>
        <Link
          to="/dashboard/doctorAppointments"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 dark:shadow-blue-900/30"
        >
          Manage Appointments <FaArrowRight className="text-xs" />
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
                {isLoading ? "-" : stat.value}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            Recent Appointments
          </h3>
          <Link
            to="/dashboard/doctorAppointments"
            className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            View all
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-xl bg-slate-200/60 dark:bg-slate-700"
              />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <FaUserDoctor className="text-5xl text-slate-300 dark:text-slate-600" />
            <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
              No appointments assigned yet
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-700">
            {recent.map((appointment) => (
              <li
                key={appointment._id}
                className="flex flex-wrap items-center gap-4 px-5 py-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="mask mask-squircle h-11 w-11 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-700">
                    <img
                      src={appointment.image}
                      alt={appointment.patientName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {appointment.patientName}
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
  );
};

export default DoctorHome;
