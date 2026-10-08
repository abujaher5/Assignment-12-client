import { FaUsers, FaPhone, FaEnvelope, FaCalendarCheck } from "react-icons/fa6";
import useDoctorAppointments from "../../../hooks/useDoctorAppointments";

const DoctorPatients = () => {
  const [appointments, , isLoading] = useDoctorAppointments();

  const patients = appointments.reduce((acc, appointment) => {
    const key = appointment.email;
    if (!acc[key]) {
      acc[key] = {
        name: appointment.patientName,
        email: appointment.email,
        phone: appointment.patientPhone,
        image: appointment.image,
        visits: 0,
        lastVisit: appointment.appointmentDate,
      };
    }
    acc[key].visits += 1;
    return acc;
  }, {});

  const patientList = Object.values(patients);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          My Patients
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Patients who have booked appointments with you ({patientList.length}).
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : patientList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <FaUsers className="text-5xl text-slate-300 dark:text-slate-600" />
          <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
            No patients yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {patientList.map((patient) => (
            <div
              key={patient.email}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30"
            >
              <div className="flex items-center gap-3">
                <div className="mask mask-squircle h-14 w-14 overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                    {patient.name}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    <FaCalendarCheck /> {patient.visits} visit
                    {patient.visits !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p className="inline-flex w-full items-center gap-2 truncate">
                  <FaEnvelope className="shrink-0 text-blue-500" />
                  {patient.email}
                </p>
                <p className="inline-flex w-full items-center gap-2">
                  <FaPhone className="shrink-0 text-blue-500" />
                  {patient.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorPatients;
