import Swal from "sweetalert2";
import {
  FaCalendarDays,
  FaPhone,
  FaEnvelope,
  FaCircleCheck,
  FaCircleXmark,
  FaClipboardCheck,
  FaNoteSticky,
  FaUserDoctor,
} from "react-icons/fa6";
import useDoctorAppointments from "../../../hooks/useDoctorAppointments";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const statusStyles = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  confirmed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

const DoctorAppointments = () => {
  const axiosSecure = useAxiosSecure();
  const [appointments, refetch, isLoading] = useDoctorAppointments();

  const updateAppointment = async (id, payload, successText) => {
    const res = await axiosSecure.patch(`/appointments/${id}`, payload);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: successText,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleStatus = (appointment, status, label) => {
    Swal.fire({
      title: `Mark as ${label}?`,
      text: `Appointment for ${appointment.patientName}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: `Yes, ${label}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateAppointment(
          appointment._id,
          { status },
          `Appointment marked as ${label}.`,
        );
      }
    });
  };

  const handleRecommendation = async (appointment) => {
    const { value: recommendation } = await Swal.fire({
      title: "Medical Recommendation",
      input: "textarea",
      inputLabel: `For ${appointment.patientName}`,
      inputPlaceholder: "Write your recommendation or notes...",
      inputValue: appointment.recommendation || "",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Save Recommendation",
      inputValidator: (value) => (!value ? "Please write something" : undefined),
    });

    if (recommendation) {
      updateAppointment(
        appointment._id,
        { recommendation },
        "Recommendation saved.",
      );
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          My Appointments
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review patient details, update status and add recommendations (
          {appointments.length} total).
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <FaUserDoctor className="text-5xl text-slate-300 dark:text-slate-600" />
          <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
            No appointments assigned to you yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="mask mask-squircle h-12 w-12 overflow-hidden bg-slate-100 dark:bg-slate-700">
                    <img
                      src={appointment.image}
                      alt={appointment.patientName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {appointment.patientName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {appointment.specialize || "Consultant"}
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
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                <p className="inline-flex items-center gap-2">
                  <FaCalendarDays className="text-blue-500" />
                  {appointment.appointmentDate} {appointment.appointmentTime}
                </p>
                <p className="inline-flex items-center gap-2">
                  <FaPhone className="text-blue-500" />
                  {appointment.patientPhone}
                </p>
                <p className="inline-flex items-center gap-2 truncate sm:col-span-2">
                  <FaEnvelope className="text-blue-500" />
                  {appointment.email}
                </p>
              </div>

              {appointment.recommendation && (
                <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
                  <p className="mb-1 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                    <FaNoteSticky /> Recommendation
                  </p>
                  <p>{appointment.recommendation}</p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {appointment.status !== "confirmed" &&
                  appointment.status !== "completed" && (
                    <button
                      onClick={() =>
                        handleStatus(appointment, "confirmed", "Confirmed")
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400"
                    >
                      <FaCircleCheck /> Confirm
                    </button>
                  )}
                {appointment.status !== "completed" && (
                  <button
                    onClick={() =>
                      handleStatus(appointment, "completed", "Completed")
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-400"
                  >
                    <FaClipboardCheck /> Complete
                  </button>
                )}
                <button
                  onClick={() => handleRecommendation(appointment)}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200"
                >
                  <FaNoteSticky /> Recommendation
                </button>
                {appointment.status !== "cancelled" && (
                  <button
                    onClick={() =>
                      handleStatus(appointment, "cancelled", "Cancelled")
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-500/10 dark:text-rose-400"
                  >
                    <FaCircleXmark /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorAppointments;
