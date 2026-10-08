import Swal from "sweetalert2";
import {
  FaFileInvoiceDollar,
  FaCalendarDays,
  FaCircleCheck,
  FaClock,
  FaCreditCard,
} from "react-icons/fa6";
import useAppointment from "../../../../hooks/useAppointment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const statusStyles = {
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Unpaid: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Refunded: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
};

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [appointments, refetch, isLoading] = useAppointment();

  const paidCount = appointments.filter(
    (item) => item.paymentStatus === "Paid",
  ).length;

  const handlePay = (appointment) => {
    Swal.fire({
      title: "Confirm payment",
      text: `Pay for the appointment with ${appointment.doctorName}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Pay Now",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(
          `/appointments/${appointment._id}`,
          { paymentStatus: "Paid" },
        );
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment successful!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            Payment History
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track and complete payments for your appointments.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl border border-slate-100 bg-white px-5 py-3 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              {appointments.length}
            </p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white px-5 py-3 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {paidCount}
            </p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Paid
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <FaFileInvoiceDollar className="text-5xl text-slate-300 dark:text-slate-600" />
          <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
            No payments yet
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => {
                  const paymentStatus = appointment.paymentStatus || "Unpaid";
                  return (
                    <tr
                      key={appointment._id}
                      className="text-sm text-slate-700 dark:text-slate-200"
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="mask mask-squircle h-10 w-10 overflow-hidden bg-slate-100 dark:bg-slate-700">
                            <img
                              src={appointment.image}
                              alt={appointment.doctorName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="font-semibold">
                            {appointment.doctorName}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-2">
                          <FaCalendarDays className="text-blue-500" />
                          {appointment.appointmentDate}
                        </span>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-1 capitalize">
                          <FaClock className="text-blue-500" />
                          {appointment.status || "pending"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[paymentStatus] || statusStyles.Unpaid
                          }`}
                        >
                          {paymentStatus}
                        </span>
                      </td>
                      <td>
                        {paymentStatus === "Paid" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <FaCircleCheck /> Completed
                          </span>
                        ) : (
                          <button
                            onClick={() => handlePay(appointment)}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 dark:shadow-blue-900/30"
                          >
                            <FaCreditCard /> Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentHistory;
