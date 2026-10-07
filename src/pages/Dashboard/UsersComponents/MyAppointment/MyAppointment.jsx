import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUserDoctor,
  FaCalendarDays,
  FaClock,
  FaTrash,
  FaArrowRight,
} from "react-icons/fa6";
import useAppointment from "../../../../hooks/useAppointment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const statusStyles = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  confirmed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

const MyAppointment = () => {
  const axiosSecure = useAxiosSecure();
  const [appointments, refetch, isLoading] = useAppointment();

  const handleDelete = (appointment) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(
          `/appointments/${appointment._id}`
        );
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Cancelled!",
            text: `Your appointment with ${appointment.doctorName} has been cancelled.`,
            icon: "success",
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <section className="bg-slate-50 py-8 dark:bg-[#1c2229]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <FaCalendarCheck /> My Appointments
          </span>
          <h2 className="mt-4 text-2xl font-extrabold uppercase text-slate-800 dark:text-white lg:text-3xl">
            Upcoming Appointments
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            You have {appointments.length} appointment
            {appointments.length !== 1 ? "s" : ""} booked.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10 space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl border border-slate-100 bg-slate-200/60 dark:border-slate-700 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-800/40">
            <FaUserDoctor className="text-5xl text-slate-300 dark:text-slate-600" />
            <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
              No appointments booked yet
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Book an appointment with one of our specialists.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-300 hover:shadow-lg dark:shadow-blue-900/30"
            >
              Find a Doctor <FaArrowRight className="text-xs" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
                    <th>Doctor</th>
                    <th>Specialist</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="text-sm text-slate-700 dark:text-slate-200"
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={appointment.image}
                                alt={appointment.doctorName}
                              />
                            </div>
                          </div>
                          <span className="font-semibold">
                            {appointment.doctorName}
                          </span>
                        </div>
                      </td>
                      <td>{appointment.specialize || "Consultant"}</td>
                      <td>
                        <span className="inline-flex items-center gap-2">
                          <FaCalendarDays className="text-blue-500" />
                          {appointment.appointmentDate}
                        </span>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-2">
                          <FaClock className="text-blue-500" />
                          {appointment.appointmentTime}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            statusStyles[appointment.status] ||
                            statusStyles.pending
                          }`}
                        >
                          {appointment.status || "pending"}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDelete(appointment)}
                          className="btn btn-ghost hover:bg-red-100"
                          title="Cancel appointment"
                        >
                          <FaTrash size={20} className="text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAppointment;
